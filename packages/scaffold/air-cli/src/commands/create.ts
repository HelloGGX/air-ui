import { select, text, multiselect, confirm } from '@clack/prompts';
import { createBusinessComponent, createMonorepoProject } from '../utils/file-operations';

export async function createProject() {
    const projectType = await select({
        message: '请选择所要创建的项目类型:',
        options: [
            { value: 'business-component', label: '业务组件' },
            { value: 'monorepo', label: 'Monorepo 项目' }
        ]
    });

    const useTailwindCSS = await confirm({ message: '是否使用 Tailwind CSS?' });

    const componentLibrary = await select({
        message: '请选择要使用的组件库:',
        options: [
            { value: 'none', label: '不使用外部组件库' },
            { value: 'air-element', label: 'Air Element' },
            { value: 'element-plus', label: 'Element Plus' },
            { value: 'headless-ui', label: 'Headless UI' }
        ]
    });

    if (projectType === 'business-component') {
        const componentName = await text({ message: '请输入业务组件名称:' });
        await createBusinessComponent(componentName as string, useTailwindCSS as boolean, componentLibrary as string);
    } else if (projectType === 'monorepo') {
        const projectName = await text({ message: '请输入项目名称:' });
        await createMonorepoProject(projectName as string);
    }
}

export async function createComponent() {
    const packageName = await text({ message: '请输入 npm 包名称:' });
    const title = await text({ message: '请输入物料标题:' });
    const description = await text({ message: '描述您的物料:' });
    const version = await text({ message: '请输入 npm 包版本:' });
    const categories = await multiselect({
        message: '请选择物料所属分类（可多选）:',
        options: [
            { value: 'ui', label: 'UI 组件' },
            { value: 'utils', label: '工具函数' },
            { value: 'hooks', label: 'vue Hooks' }
        ]
    });

    // TODO: Implement component creation logic
    console.log('组件创建成功，详细信息如下:', {
        packageName,
        title,
        description,
        version,
        categories
    });
}
