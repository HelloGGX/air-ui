import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import { config } from './lib/config';
import { TemplateManager } from './lib/template-manager';
import { FileManager } from './lib/file-manager';
import { logger } from './lib/logger';

const templateManager = new TemplateManager();
const fileManager = new FileManager();

async function checkComponentExists(name: string): Promise<boolean> {
    try {
        const componentDir = path.join(config.paths.components, name.toLowerCase());
        await fs.access(componentDir);
        return true;
    } catch {
        return false;
    }
}

async function promptUser() {
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

                const exists = await checkComponentExists(input);
                if (exists) {
                    return `组件 ${input} 已存在`;
                }

                return true;
            }
        }
    ]);
}

async function main() {
    try {
        const answers = await promptUser();
        // 移除这行，因为现在要求输入就必须是驼峰格式
        const componentName = answers.name;

        logger.info('正在加载模板...');
        const templates = {};
        const typeConfig = config.types[answers.type];

        for (const file of typeConfig.files) {
            templates[file] = await templateManager.loadTemplate(answers.type, file);
        }

        logger.info('正在处理模板...');
        const processedTemplates = Object.entries(templates).reduce(
            (acc, [key, template]) => ({
                ...acc,
                [key]: templateManager.processTemplate(template, {
                    componentName,
                    name: componentName.toLowerCase()
                })
            }),
            {}
        );

        logger.info('正在创建文件...');
        await fileManager.createComponent(componentName, answers.type, processedTemplates);

        logger.success('\n✨ 创建成功！');
        if (answers.type === 'snippet') {
            logger.info('💡 提示: 请在 stories.ts 文件中编写你的 HTML 代码片段');
        }
    } catch (error) {
        logger.error(error.message);
        process.exit(1);
    }
}

main();
