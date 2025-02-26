import path from 'path';
import { config } from './config.ts';

export class TemplateManager {
    templatesCache: Map<string, unknown>;
    constructor() {
        this.templatesCache = new Map();
    }

    async loadTemplate(type: string, name: string) {
        const cacheKey = `${type}/${name}`;

        if (this.templatesCache.has(cacheKey)) {
            return this.templatesCache.get(cacheKey);
        }

        try {
            const templatePath = path.join(config.paths.templates, type, `${name}.ts`);
            const templateModule = await import(templatePath);
            const templateFn = templateModule.default;

            this.templatesCache.set(cacheKey, templateFn);
            return templateFn;
        } catch (error) {
            console.log(error);
            throw new Error(`模板加载失败: ${cacheKey}`);
        }
    }

    processTemplate(template, variables) {
        if (typeof template === 'function') {
            return template(variables);
        }
        // 保留原有的字符串模板处理方式作为后备
        return Object.entries(variables).reduce(
            (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), value),
            template
        );
    }
}
