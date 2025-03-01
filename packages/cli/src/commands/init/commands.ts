import path from 'node:path';
import fs from 'node:fs/promises';
import type { CommandModule } from 'yargs';

const command: CommandModule = {
    command: 'init [targetDir]',
    describe: '初始化物料项目',
    builder(yargs) {
        yargs.example('$0 init [targetDir]', '# 初始化物料项目').options({
            exact: {
                describe: '在 package.json 中指定 air-cli 依赖版本，不带插入符号 (^) 的版本',
                type: 'boolean'
            },
            dryRun: {
                describe:
                    '如果用户使用 --dryRun 选项，命令将预览将要进行的更改，而不实际修改文件系统。这对于用户在执行操作之前检查将要发生的更改非常有用',
                type: 'boolean',
                default: false
            },
            skipInstall: {
                describe: '初始化后跳过依赖项的安装',
                type: 'boolean'
            }
        });
        return yargs;
    },
    async handler(argv) {
        const targetDir = argv.targetDir || '.';
        // 校验路径
        await validateDirectory(targetDir as string);
        return (await import('.')).factory({ targetDir: targetDir as string });
    }
};

// 校验目录的函数
async function validateDirectory(dir: string) {
    try {
        const resolvedPath = path.resolve(dir);
        const stats = await fs.stat(resolvedPath);

        if (!stats.isDirectory()) {
            throw new Error(`${resolvedPath} 不是一个有效的目录.`);
        }
    } catch (error) {
        throw new Error(`无法访问目录 ${dir}: ${error instanceof Error ? error.message : '未知错误'}`);
    }
}

export default command;
