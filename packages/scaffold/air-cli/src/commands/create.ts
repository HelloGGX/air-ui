import { select, text, confirm, note, spinner, outro, multiselect } from '@clack/prompts';
import { createBusinessComponent, createMonorepo } from '../utils/file-operations';
import * as color from 'picocolors';

const projectOptions = {
    type: [
        { value: 'business-component', label: '业务组件' },
        { value: 'monorepo', label: 'Monorepo 项目' }
    ],
    componentLibrary: [
        { value: 'none', label: '不使用外部组件库' },
        { value: 'air-element', label: 'Air Element' },
        { value: 'element-plus', label: 'Element Plus' }
    ]
};

const promptText = (message: string, placeholder?: string) => text({ message, placeholder });

export async function createBlock() {
    const projectName = await promptText('请输入业务组件名称:', 'button');
    const useTailwindCSS = await confirm({ message: '是否使用 Tailwind CSS?' });
    const componentLibrary = await select({
        message: '请选择要使用的组件库:',
        options: projectOptions.componentLibrary
    });

    const s = spinner();
    s.start('正在创建业务组件...');
    await createBusinessComponent(projectName as string, useTailwindCSS as boolean, componentLibrary as string);
    s.stop('业务组件创建成功');

    return projectName;
}
export async function createProject() {
    const projectName = await promptText('请输入项目名称:');
    const s = spinner();
    s.start('正在创建 Monorepo 项目...');
    await createMonorepo(projectName as string);
    s.stop('Monorepo 项目创建成功');

    displayProjectCreationSuccess(projectName as string);
}

function displayProjectCreationSuccess(projectName: string) {
    note(color.green('✨ Monorepo 项目创建成功！'));

    const nextSteps = `
接下来的步骤：
1. ${color.cyan(`cd ${projectName}`)}
2. ${color.cyan('pnpm install')}
3. ${color.cyan('pnpm dev')}

运行以下命令来启动你的项目：
${color.cyan(`cd ${projectName}`)}
${color.cyan('pnpm dev')}

如果你想要构建项目，运行：
${color.cyan('pnpm build')}

我们建议您接下来：
1. ${color.yellow('添加 .gitignore 文件')}
2. ${color.yellow('初始化 Git 仓库')}
3. ${color.yellow('提交初始代码')}

如果你遇到任何问题，请查看文档或提交 issue。`;

    note(nextSteps);

    outro(color.green('祝你编码愉快！'));
}
