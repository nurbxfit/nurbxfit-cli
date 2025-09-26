import prompts from 'prompts';
import { templates } from '../constants/templates';
import { say } from '../utils/say';
import { validateName } from '../utils/validator';
import path from 'path';
import { existsSync } from 'fs-extra';
import ora from 'ora';
import { TemplateInitializer } from '../core/template-initializer';

export interface CreateFromTemplateOptions {
    template: string
}

export async function createFromTemplate(projectName: string, options: CreateFromTemplateOptions) {

    // check if template name provided, 
    // if not, print on the screen list of available template,
    // then ask user to select one using their keyboard.

    const is_valid_name = validateName(projectName);
    if (!is_valid_name.valid) {
        say.error(`Invalid project name: ${is_valid_name.errors.join(', ')}`);
        process.exit(1);
    }

    const target_dir = path.resolve(process.cwd(), projectName);
    const is_target_dir_exist = existsSync(target_dir);

    // if target dir exist and not empty
    if (is_target_dir_exist) {
        say.error(`Directory ${target_dir} already exists!`)
        process.exit(1)
    }

    let template = options.template;
    if (!template) {
        const response = await prompts({
            type: 'select',
            name: 'template',
            message: "Choose a template",
            choices: templates.map(t => ({
                title: t.name,
                value: t.name,
                description: t.source
            }))
        }, {
            onCancel: () => {
                console.log("❌ Cancelled by user.");
                process.exit(1);
            }
        })

        template = response.template;
        if (!template) {
            say.warn("❌ No template selected. Exiting.")
            process.exit(1);
        }
    }

    // verify template exist.
    const template_obj = templates.find(t => t.name == template);
    if (!template_obj) {
        say.warn("❌ Template name not found. Exiting.")
        process.exit(1);
    }

    say.info(`📦 Creating project "${projectName}" using template "${template}"...`);

    const spinner = ora();
    try {
        const initializer = new TemplateInitializer(spinner);
        await initializer.setupRepo(template_obj.source, target_dir);
        spinner.succeed("Project initialized successfully!");
    } catch (err) {
        spinner.fail("Failed to initialize project");
        say.error(err instanceof Error ? err.message : String(err));
        process.exit(1);
    }
}