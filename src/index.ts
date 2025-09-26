#!/usr/bin/env node

import { Command } from "commander";
import { createHonoSSR } from "./commands/create-hono-ssr";
import { createFromTemplate } from "./commands/create-from-template";

const program = new Command();

program.name("nurbxfit-cli")
    .description("CLI tools by nurbxfit, for nubrxfit github")
    .version("1.0.0")

// simple starter project setup
program
    .command("create-cf-hono-react-ssr <project-name>")
    .description("Create a new Hono + React SSR project")
    .action((projectName: string) => {
        createHonoSSR(projectName);
    });

program.command("create <project-name>")
    .description("Create a new project from a template")
    .option("-t, --template <template>",
        "Template name"
    )
    .action(createFromTemplate);


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}