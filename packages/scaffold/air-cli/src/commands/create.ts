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
        { value: 'element-plus', label: 'Element Plus' },
        { value: 'headless-ui', label: 'Headless UI' }
    ]
};

const promptText = (message: string, placeholder?: string) => text({ message, placeholder });

async function createBusinessComponentProject() {
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

async function createMonorepoProject() {
    const projectName = await promptText('请输入项目名称:');
    const s = spinner();
    s.start('正在创建 Monorepo 项目...');
    await createMonorepo(projectName as string);
    s.stop('Monorepo 项目创建成功');

    return projectName;
}

export async function createProject() {
    const projectType = await select({
        message: '请选择所要创建的项目类型:',
        options: projectOptions.type
    });

    const projectName =
        projectType === 'business-component' ? await createBusinessComponentProject() : await createMonorepoProject();

    displayProjectCreationSuccess(projectName as string, projectType as string);
}

function displayProjectCreationSuccess(projectName: string, projectType: string) {
    note(color.green('✨ 项目创建成功！'));

    const commonSteps = `
1. ${color.cyan(`cd ${projectName}`)}
2. ${color.cyan('pnpm install')}
3. ${color.cyan('pnpm dev')}

运行以下命令来启动你的项目：
${color.cyan(`cd ${projectName}`)}
${color.cyan('pnpm dev')}

如果你想要构建项目，运行：
${color.cyan('pnpm build')}
`;

    const storybookStep =
        projectType === 'business-component' ? `\n要运行 Storybook，使用：\n${color.cyan('pnpm storybook')}` : '';

    const additionalSteps = `
我们建议您接下来：
1. ${color.yellow('添加 .gitignore 文件')}
2. ${color.yellow('初始化 Git 仓库')}
3. ${color.yellow('提交初始代码')}

如果你遇到任何问题，请查看文档或提交 issue。`;

    note(`接下来的步骤：${commonSteps}${storybookStep}${additionalSteps}`);

    outro(color.green('祝你编码愉快！'));
}
export async function createComponent() {
    const componentDetails = {
        packageName: await promptText('请输入 npm 包名称:'),
        title: await promptText('请输入物料标题:'),
        description: await promptText('描述您的物料:'),
        version: await promptText('请输入 npm 包版本:'),
        categories: await multiselect({
            message: '请选择物料所属分类（可多选）:',
            options: [
                { value: 'ui', label: 'UI 组件' },
                { value: 'utils', label: '工具函数' },
                { value: 'hooks', label: 'vue Hooks' }
            ]
        })
    };

    // TODO: Implement component creation logic
    note('组件创建成功，详细信息如下:');
    Object.entries(componentDetails).forEach(([key, value]) => {
        note(`${color.cyan(key)}: ${color.yellow(JSON.stringify(value))}`);
    });
}
