import inquirer, { Answers } from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import validateNpmName from 'validate-npm-package-name';
import { downloadTemplate } from '@/utils/download';
import ora from 'ora';
import chalk from 'chalk';
import { config } from '@/config';

async function createProjectDirectory(targetDir: string, projectName: string) {
    const projectDir = path.join(targetDir, projectName);
    if (fs.existsSync(projectDir)) {
        console.error(chalk.red('该项目名称已存在，请选择其他名称。'));
        process.exit(1);
    }
    await fs.mkdir(projectDir, { recursive: true });
    return projectDir;
}

async function updatePackageJson(pkgPath: string, updates: Partial<Record<string, unknown>>) {
    const pkg = await fs.readJson(pkgPath);
    const newPkg = { ...pkg, ...updates };
    await fs.writeJson(pkgPath, newPkg, { spaces: 4 });
}

async function updateThemePackage(answers: Answers) {
    const { name, registry } = answers;
    const themePackageName = `@${name}/theme`;
    await updatePackageJson(config.paths.themePackageJson(), {
        name: themePackageName,
        publishConfig: { access: 'public', registry }
    });
    return themePackageName;
}

async function updateBlockPackageJson(answers: Answers) {
    const { name, registry } = answers;
    const blockPackageName = `@${name}/block`;
    await updatePackageJson(config.paths.blockPackageJson(), {
        name: blockPackageName,
        publishConfig: { access: 'public', registry }
    });
    return blockPackageName;
}

async function updatePublishSummary(pkgPath: string, publishedPackages: string[]) {
    const summary = await fs.readJson(pkgPath);
    const packagesWithVersion = publishedPackages.map((pkgName) => ({
        name: pkgName,
        version: '0.0.0'
    }));
    await fs.writeJson(pkgPath, { ...summary, publishedPackages: packagesWithVersion }, { spaces: 4 });
}

async function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名称:',
            validate: (input: string) => {
                const result = validateNpmName(input);
                return result.validForNewPackages ? true : '无效的项目名称';
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
            message: '请输入用于发布物料的 npm 地址:',
            default: config.defaultRegistry
        }
    ]);
}

export async function init(targetDir: string) {
    const answers = await promptUser();
    const projectDir = await createProjectDirectory(targetDir, answers.name);
    console.log(projectDir);
    const spinner = ora('正在下载项目模板...').start();

    try {
        await downloadTemplate(config.templateRepo, projectDir);
        spinner.succeed('模板下载完成');

        config.setWorkspaceRoot(projectDir);

        await updatePackageJson(config.paths.workspacePackageJson(), {
            name: answers.name,
            description: answers.description,
            author: answers.author,
            version: '0.0.0'
        });
        const blockPackageName = await updateBlockPackageJson(answers); // 获取 block 名称
        const themePackageName = await updateThemePackage(answers); // 获取 theme 名称

        await updatePublishSummary(config.paths.publishSummary(), [blockPackageName, themePackageName]);

        console.log(chalk.green('\n✨ 项目创建成功！\n'));
        console.log('下一步：');
        console.log(chalk.cyan(`cd ${projectDir}`));
        console.log(chalk.cyan('pnpm install'));
        console.log(chalk.cyan('pnpm run story\n'));
        console.log(chalk.yellow('请确保在进入项目目录后，使用 "air add" 命令来创建物料库。'));
    } catch (error: unknown) {
        spinner.fail('项目创建失败');
        console.error(chalk.red(error instanceof Error ? error.message : '发生了一个未知错误'));
        process.exit(1);
    }
}
