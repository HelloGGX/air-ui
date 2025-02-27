import { Command } from 'commander';
import { init } from '@/commands/init';
import { add } from '@/commands/add';
import { publish } from '@/commands/publish';
import chalk from 'chalk';

const program = new Command();

// 常量定义
const CLI_NAME = 'air';
const CLI_DESCRIPTION = 'Air UI CLI 工具';
const CLI_VERSION = process.env.npm_package_version || '0.0.0';

// 欢迎信息
const welcomeMessage = `
${chalk.blue('  _    _ _           _   _  _  _  ')}
${chalk.blue(' | |  | (_)         | | | || || | ')}
${chalk.blue(' | |  | |_ _ __ ___ | |_| || || | ')}
${chalk.blue(' | |  | | | \'_ ` _ \\|  _  || || | ')}
${chalk.blue(' | |__| | | | | | | | | | || || | ')}
${chalk.blue('  \\____/|_|_| |_| |_|_| |_||_||_| ')}
${chalk.green('       Welcome to the Air UI CLI! author:玄子')}
`;

// 注册命令
function registerCommands() {
    program.name(CLI_NAME).description(CLI_DESCRIPTION).version(CLI_VERSION);

    program
        .command('init [dir]')
        .description('初始化新项目')
        .action((dir = '.') => {
            init(dir).catch(handleError);
        });

    program
        .command('add')
        .description('添加新组件')
        .argument('[type]', '组件类型 (block)')
        .option('-t, --template <template>', '指定模板')
        .action(add)
        .on('--help', () => {
            console.log('  示例:');
            console.log('    $ air add component');
            console.log('    $ air add snippet --template my-template');
            console.log('    $ air add');
        });

    program.command('publish').description('发布组件').argument('[type]', '组件类型 (block)').action(publish);
}

// 错误处理函数
function handleError(error: unknown) {
    console.error('❌ 发生错误:', error instanceof Error ? error.message : '未知错误');
    process.exit(1);
}

// 解析命令行参数并注册命令
function main() {
    console.log(welcomeMessage); // 显示欢迎信息
    registerCommands();
    program.parse(process.argv);
}

// 启动 CLI
main();
