import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import validateNpmName from 'validate-npm-package-name';
import { downloadTemplate } from '../utils/download';
import ora from 'ora';
import chalk from 'chalk';
import { config } from '../utils/config';

export async function init(targetDir: string) {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名称:',
            validate: (input: string) => {
                const result = validateNpmName(input);
                if (!result.validForNewPackages) {
                    return '无效的项目名称';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: '请输入项目描述:',
            default: '基于 Air UI 的物料库项目'
        },
        {
            type: 'input',
            name: 'author',
            message: '请输入作者名称:'
        },
        {
            type: 'input',
            name: 'registry',
            message: '请输入 npm registry 地址:',
            default: config.defaultRegistry
        }
    ]);

    const spinner = ora('正在下载项目模板...').start();

    try {
        // 下载模板
        await downloadTemplate(config.templateRepo, targetDir);
        spinner.succeed('模板下载完成');

        // 更新 package.json
        const pkgPath = path.join(targetDir, 'package.json');
        const pkg = await fs.readJson(pkgPath);

        const newPkg = {
            ...pkg,
            name: answers.name,
            description: answers.description,
            author: answers.author,
            version: '0.0.0'
        };

        // 更新 block 包的 package.json
        const blockPkgPath = path.join(targetDir, 'packages/block/package.json');
        const blockPkg = await fs.readJson(blockPkgPath);

        const newBlockPkg = {
            ...blockPkg,
            name: `${answers.name}`,
            publishConfig: {
                access: 'public',
                registry: answers.registry
            }
        };

        await fs.writeJson(pkgPath, newPkg, { spaces: 4 });
        await fs.writeJson(blockPkgPath, newBlockPkg, { spaces: 4 });

        console.log(chalk.green('\n✨ 项目创建成功！\n'));
        console.log('下一步：');
        console.log(chalk.cyan(`  cd ${targetDir}`));
        console.log(chalk.cyan('  pnpm install'));
        console.log(chalk.cyan('  pnpm run story\n'));
    } catch (error) {
        spinner.fail('项目创建失败');
        console.error(chalk.red(error.message));
        process.exit(1);
    }
}
