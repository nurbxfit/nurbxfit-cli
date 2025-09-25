import { move, pathExists, readJson, remove, writeJson } from "fs-extra";
import path from "path";
import simpleGit, { SimpleGit } from "simple-git";

export interface TemplateInitOptions {
    branch?: string,
    commit_message?: string;
}

export interface Logger { // based on Ora spinner package
    start(msg: string): void;
    succeed(msg: string): void;
    fail(msg: string): void;
    info?(msg: string): void;
}

export class TemplateInitializer {
    private git: SimpleGit;
    private logger: Logger;

    constructor(logger: Logger) {
        this.git = simpleGit();
        this.logger = logger;
    }

    async setupRepo(source: string, target: string, options: TemplateInitOptions = {}) {
        const branch = options.branch ?? 'main';
        const commit_message = options.commit_message ?? 'Initial commit';

        const is_current_dir = target === process.cwd();
        const clone_target = is_current_dir ? path.join(target, ".temp-clone") : target;


        try {
            // 1. clone the repo
            this.logger.start("Cloning template repository...");
            await this.git.clone(source, clone_target, {
                "--branch": branch,
                "--single-branch": null,
                "--depth": "1",
            });
            this.logger.succeed("Template cloned successfully");
            // 1.2 if cloned into temmp -> move content back into main dir
            if (is_current_dir) {
                const contents = path.join(clone_target);
                this.logger.start("Moving files...");
                await move(contents, target, { overwrite: true });
                this.logger.succeed("Files moved");
                await remove(clone_target);
            }
            // 1.2 rename new project package.json into the given project name 
            this.renameProject(clone_target)

            // 2. clean the cloned repo (remove .git)
            await this.cleanGitDir(clone_target);

            // 3. init fresh repo
            await this.initGit(clone_target, commit_message);

        } catch (error) {
            throw new Error(`Repo setup failed: ${(error as Error).message}`);
        }
    }

    private async renameProject(target_dir: string) {
        const project_name = path.basename(target_dir);
        const package_json_path = path.join(target_dir, "package.json");
        if (await pathExists(package_json_path)) {
            this.logger.start("Updating package.json...")
            const package_json = await readJson(package_json_path);
            package_json.name = project_name;
            await writeJson(package_json_path, package_json, { spaces: 2 });
            this.logger.succeed("package.json updated!");
        }
    }

    private async cleanGitDir(target_dir: string) {
        this.logger.start('Cleaning repository history...')
        const gitDir = path.join(target_dir, ".git");
        if (await pathExists(gitDir)) {
            await remove(gitDir);
        }
        this.logger.succeed('Git history cleaned!')
    }

    private async initGit(target_dir: string, commit_message: string) {
        this.logger.start("Initializing new repository...")
        const git = simpleGit(target_dir);
        await git.init();
        await git.add(".");
        await git.commit(commit_message);
        this.logger.succeed("New git repo initialized!")
    }
}