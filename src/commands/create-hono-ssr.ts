import path from "path";
import { say } from "../utils/say";
import { existsSync } from "fs";
import ora from "ora";
import { TemplateInitializer } from "../core/template-initializer";

export async function createHonoSSR(projectName: string) {

    const target_dir = path.resolve(process.cwd(), projectName);

    const is_target_dir_exist = existsSync(target_dir);

    // if target dir exist and not empty
    if (is_target_dir_exist) {
        say.error(`Directory ${target_dir} already exists!`)
        process.exit(1)
    }
    // else 
    say.info(`Creating project ${projectName} from cf-hono-react-ssr template`);

    const spinner = ora();
    try {
        const initializer = new TemplateInitializer(spinner);
        await initializer.setupRepo("https://github.com/nurbxfit/cf-hono-react-ssr", target_dir);
        spinner.succeed("Project initialized successfully!");
    } catch (err) {
        spinner.fail("Failed to initialize project");
        say.error(err instanceof Error ? err.message : String(err));
        process.exit(1);
    }
}