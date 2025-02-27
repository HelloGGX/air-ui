import fs from 'fs/promises';
import path from 'path';
import inquirer, { Answers } from 'inquirer';
import { config } from '@/utils/config';
import { TemplateManager } from '@/utils/template-manager';
import { FileManager } from '@/utils/file-manager';
import { logger } from '@/utils/logger';

const templateManager = new TemplateManager();
const fileManager = new FileManager();

async function checkComponentExists(name: string): Promise<boolean> {
    const componentDir = path.join(config.paths.components, name.toLowerCase());
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

export async function add() {
    try {
        const answers = await promptUser();
        const componentName = answers.name;

        logger.info('正在加载模板...');
        const templates: Record<string, (variables: unknown) => string> = {};
        const typeConfig = config.types[answers.type as keyof typeof config.types];

        for (const file of typeConfig.files) {
            templates[file] = await templateManager.loadTemplate(answers.type, file);
        }

        logger.info('正在处理模板...');

        const processedTemplates = Object.entries(templates).reduce(
            (acc, [key, template]) => ({
                ...acc,
                [key]: templateManager.processTemplate(template, {
                    componentName,
                    componentTypes: answers.componentTypes,
                    businessScenes: answers.businessScenes,
                    description: answers.description
                })
            }),
            {}
        );

        console.log('****', processedTemplates);

        logger.info('正在创建文件...');
        await fileManager.createComponent(componentName, answers.type, processedTemplates);

        logger.success('\n✨ 创建成功！');
        if (answers.type === 'snippet') {
            logger.info('💡 提示: 请在 stories.ts 文件中编写你的 HTML 代码片段');
        }
    } catch (error) {
        logger.error(error instanceof Error ? error.message : '发生了一个未知错误');
        process.exit(1);
    }
}
