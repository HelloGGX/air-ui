/* eslint-disable @typescript-eslint/no-explicit-any */
import dedent from 'dedent';
import yargs from 'yargs';
import type { Argv, Options } from 'yargs';

/**
 * 一个工厂函数，返回一个配置了所有内容（除了命令）的 yargs() 实例。
 * 从此方法链式调用 .parse() 以执行。
 */
export function airCLI(argv?: string | readonly string[], cwd?: string) {
    const cli = yargs(argv, cwd).scriptName('air').parserConfiguration({
        'strip-dashed': true,
        'strip-aliased': true
    });

    return globalOptions(cli)
        .usage('用法: $0 <command> [options]')
        .recommendCommands()
        .strict()
        .epilogue(dedent`当命令失败时，所有日志将写入当前工作目录中的 air-debug.log。`);
}

function globalOptions(argv: Argv) {
    // 适用于每个命令的全局选项
    const opts: { [key: string]: Options } = {
        loglevel: {
            defaultDescription: '信息',
            describe: '要报告的日志级别。',
            type: 'string'
        },
        verbose: {
            describe: '显示详细输出信息',
            type: 'boolean',
            default: false
        },
        'no-progress': {
            describe: '禁用进度条',
            type: 'boolean'
        }
    };

    // 在"全局选项:"标题下分组选项
    const globalKeys = Object.keys(opts).concat(['help', 'version']);

    return argv.options(opts).group(globalKeys, '全局选项:');
}
