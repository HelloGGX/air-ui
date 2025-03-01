import inquirer, { Answers } from 'inquirer';
import { TemplateManager, TemplateParams } from '@/commands/add/lib/template-manager';
import { FileManager } from '@/commands/add/lib/file-manager';
import { config } from '@/core/index';
import log from '@/core/npmlog';
import path from 'path';
import fs from 'fs/promises';

const templateManager = new TemplateManager();
const fileManager = new FileManager();

async function checkComponentExists(name: string): Promise<boolean> {
    const componentDir = path.join(config.paths.components(), name.toLowerCase());
    try {
        await fs.access(componentDir);
        return true;
    } catch {
        return false;
    }
}

async function promptUser(): Promise<Answers> {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: '请选择要创建的类型:',
            choices: Object.values(config.types).map(({ name, value }) => ({ name, value }))
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入名称 (例如: MyBlock):',
            validate: async (input) => {
                if (!input) return '名称不能为空';
                if (!config.validation.namePattern.test(input)) {
                    return config.validation.nameMessage;
                }
                return (await checkComponentExists(input)) ? `组件 ${input} 已存在` : true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: '请输入组件描述:',
            validate: (input) => (input ? true : '描述不能为空')
        },
        {
            type: 'checkbox',
            name: 'componentTypes',
            message: '请选择组件类型 (可多选):',
            choices: config.componentTypes.map((type) => ({ name: type, value: type })),
            validate: (input) => (input.length > 0 ? true : '至少选择一个组件类型')
        },
        {
            type: 'checkbox',
            name: 'businessScenes',
            message: '请选择业务场景 (可多选):',
            choices: config.businessScenes.map((scene) => ({ name: scene, value: scene })),
            validate: (input) => (input.length > 0 ? true : '至少选择一个业务场景')
        }
    ]);
}

async function createComponent(answers: Answers) {
    log.info('正在加载模板...');
    const templates: Record<string, ((variables: TemplateParams) => string) | undefined> = {};
    const typeConfig = config.types[answers.type as keyof typeof config.types];

    for (const file of typeConfig.files) {
        templates[file] = await templateManager.loadTemplate(answers.type, file);
    }

    log.info('正在处理模板...');

    const processedTemplates = Object.entries(templates).reduce(
        (acc, [key, template]) => ({
            ...acc,
            [key]: templateManager.processTemplate(template, {
                componentName: answers.name,
                componentTypes: answers.componentTypes,
                businessScenes: answers.businessScenes,
                description: answers.description
            })
        }),
        {}
    );

    log.info('正在创建文件...');
    await fileManager.createComponent(answers.name, answers.type, processedTemplates);
    log.success('\n✨ 创建成功！');
    log.info(`组件名称: ${answers.name}`);
    log.info(`组件类型: ${answers.type}`);
    log.info(`描述: ${answers.description}`);

    if (answers.type === 'snippet') {
        log.info('💡 提示: 请在 stories.ts 文件中编写你的 HTML 代码片段');
        //触发 .storybook/preview.js 的保存操作
        //todo 目前还不知道如何解决当添加代码片段时，storybook 网页无法自动更新tailwindcss样式
        const previewJsPath = path.join(config.paths.workspaceRoot(), '.storybook', 'preview.js');
        const now = new Date();
        await fs.utimes(previewJsPath, now, now);
    }
}

export async function factory() {
    const answers = await promptUser();
    createComponent(answers);
};
