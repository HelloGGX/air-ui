import { generateDts, generatePackage, generateStories, generateVue } from '@/templates/block/component';
import { generateSnippetStories } from '@/templates/block/snippet/stories';

export interface TemplateParams {
    componentName: string;
    componentTypes: string[];
    businessScenes: string[];
    description: string;
}

export class TemplateManager {
    templatesCache: Map<string, (variables: TemplateParams) => string>;

    constructor() {
        this.templatesCache = new Map();

        // 手动缓存所有模板函数
        this.templatesCache.set('component/dts', generateDts);
        this.templatesCache.set('component/package', generatePackage);
        this.templatesCache.set('component/stories', generateStories);
        this.templatesCache.set('component/vue', generateVue);
        this.templatesCache.set('snippet/stories', generateSnippetStories);
    }

    async loadTemplate(type: string, name: string) {
        const cacheKey = `${type}/${name}`;
        if (this.templatesCache.has(cacheKey)) {
            return this.templatesCache.get(cacheKey);
        }

        throw new Error(`模板加载失败: ${cacheKey}`);
    }

    processTemplate(template: ((variables: TemplateParams) => string) | undefined, variables: TemplateParams) {
        if (typeof template === 'function') {
            return template(variables);
        }
    }
}
