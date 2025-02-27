import { Command } from 'commander';
import { init } from '@/commands/init';
import { add } from '@/commands/add';
import { publish } from '@/commands/publish';

const program = new Command();

program
    .name('air')
    .description('Air UI CLI 工具')
    .version(process.env.npm_package_version || '0.0.0');

program
    .command('init [dir]')
    .description('初始化新项目')
    .action((dir = '.') => {
        init(dir);
    });

program
    .command('add')
    .description('添加新组件')
    .argument('<type>', '组件类型 (block)')
    .option('-t, --template <template>', '指定模板')
    .action(add)
    .on('--help', () => {
        console.log('  示例:');
        console.log('    $ air add component');
        console.log('    $ air add snippet --template my-template');
    });

program.command('publish').description('发布组件').argument('<type>', '组件类型 (block)').action(publish);

// 解析命令行参数
program.parse(process.argv);
