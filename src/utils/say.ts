import chalk from 'chalk';

export const say = {
    info: (msg: string) => console.log(chalk.cyan(`${msg}`)),
    success: (msg: string) => console.log(chalk.green(`${msg}`)),
    warn: (msg: string) => console.log(chalk.yellow(`⚠️  ${msg}`)),
    error: (msg: string) => console.log(chalk.red(`❌ ${msg}`)),
    blant: (msg: string) => console.log(msg),
}