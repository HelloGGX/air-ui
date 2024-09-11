import * as fs from 'fs-extra';
import * as path from 'path';
import { GenerateOptions } from '../types';

// 默认模板名称
const DEFAULT_TEMPLATE_NAME = 'vue-component';

export class Generator {
    private templatePath: string;
    private targetPath: string;

    constructor(
        private name: string,
        private options: GenerateOptions = {}
    ) {
        // 设置默认选项
        this.options.path ||= process.cwd();
        this.options.packageName ||= this.name;
        this.options.template ||= DEFAULT_TEMPLATE_NAME;
        this.options.version ||= '0.1.0';
        this.options.description ||= `${this.name} component`;
        this.options.useTailwindCSS ??= false;
        this.options.componentLibrary ||= 'none';

        // 初始化模板路径和目标路径
        this.templatePath = path.join(__dirname, '..', 'templates', this.options.template);
        this.targetPath = path.join(this.options.path, this.name);
    }

    // 生成组件的主方法
    async generate() {
        try {
            await this.ensureTargetDirectoryDoesNotExist();
            await this.createDirectoryStructure();
            await this.processTemplates();
            await this.generatePackageJson();
            await this.copyConfigFiles();
            await this.updatePublishSummary(); // 新添加的方法调用
            console.log(`Business component "${this.name}" created successfully.`);
        } catch (error: unknown) {
            console.error(`Error creating component: ${error instanceof Error ? error.message : 'Unknown error'}`);
            await this.cleanup();
            throw error;
        }
    }
    private async updatePublishSummary() {
        const packagesDir = path.dirname(this.options.path || '');
        const summaryPath = path.join(packagesDir, 'pnpm-publish-summary.json');
        let summary: { publishedPackages: Array<{ name: string; version: string }> } = { publishedPackages: [] };

        if (await fs.pathExists(summaryPath)) {
            summary = await fs.readJson(summaryPath);
        }

        summary.publishedPackages.push({
            name: this.options.packageName || this.name,
            version: this.options.version || '0.0.0'
        });

        await fs.writeJson(summaryPath, summary, { spaces: 2 });
    }
    // 确保目标目录不存在
    private async ensureTargetDirectoryDoesNotExist() {
        if (await fs.pathExists(this.targetPath)) {
            throw new Error(`Directory ${this.targetPath} already exists.`);
        }
    }

    // 创建目录结构
    private async createDirectoryStructure() {
        await fs.ensureDir(this.targetPath);
        await fs.ensureDir(path.join(this.targetPath, 'src'));
        await fs.ensureDir(path.join(this.targetPath, 'src', '__tests__'));
        await fs.ensureDir(path.join(this.targetPath, 'src', '__docs__'));
    }

    // 处理模板文件
    private async processTemplates() {
        const templateFiles = await fs.readdir(this.templatePath, { withFileTypes: true });

        for (const dirent of templateFiles) {
            if (dirent.isFile() && dirent.name.endsWith('.tpl.ts')) {
                await this.processTemplateFile(dirent);
            } else if (dirent.isDirectory() && !['__docs__', '__tests__'].includes(dirent.name)) {
                await this.processTemplateDirectory(dirent);
            }
        }
    }

    // 处理单个模板文件
    private async processTemplateFile(dirent: fs.Dirent) {
        const templateFilePath = path.join(this.templatePath, dirent.name);
        const templateModule = await import(templateFilePath);
        const templateFn = templateModule.default;
        const result = templateFn({
            path: this.options.path,
            name: this.name,
            packageName: this.options.packageName,
            version: this.options.version,
            description: this.options.description,
            useTailwindCSS: this.options.useTailwindCSS,
            componentLibrary: this.options.componentLibrary
        });

        if (result) {
            await this.writeTemplateResult(dirent, result);
        }
    }
    private async writeTemplateResult(dirent: fs.Dirent, result: { filename: string; contents: string }) {
        const { filename, contents } = result;
        const targetFilePath = this.getTargetFilePath(dirent, filename);
        await fs.writeFile(targetFilePath, contents);
    }

    private getTargetFilePath(dirent: fs.Dirent, filename: string): string {
        if (dirent.name.includes('__docs__')) {
            return path.join(this.targetPath, 'src', '__docs__', filename);
        } else if (dirent.name.includes('__tests__')) {
            return path.join(this.targetPath, 'src', '__tests__', filename);
        } else if (dirent.name === 'vite.config.tpl.ts') {
            return path.join(this.targetPath, filename);
        } else {
            return path.join(this.targetPath, 'src', filename);
        }
    }

    // 处理模板目录（递归调用 processTemplates）
    private async processTemplateDirectory(dirent: fs.Dirent) {
        const subDirPath = path.join(this.templatePath, dirent.name);
        const subDirFiles = await fs.readdir(subDirPath, { withFileTypes: true });

        for (const subDirent of subDirFiles) {
            if (subDirent.isFile() && subDirent.name.endsWith('.tpl.ts')) {
                await this.processTemplateFile(subDirent);
            }
        }
    }
    // 生成 package.json 文件
    private async generatePackageJson() {
        const packageJsonTemplate = {
            name: this.options.packageName,
            version: this.options.version,
            description: this.options.description,
            main: 'cjs/index.js',
            module: 'es/index.mjs',
            types: 'es/index.d.ts',
            scripts: {
                dev: 'vite',
                build: 'vue-tsc && vite build',
                test: 'vitest',
                storybook: 'storybook dev -p 6006',
                'build-storybook': 'storybook build'
            },
            dependencies: {
                vue: 'latest',
                ...(this.options.componentLibrary === 'air-element' && { '@air-ui/air-element': 'latest' }),
                ...(this.options.componentLibrary === 'element-plus' && { 'element-plus': 'latest' })
            },
            devDependencies: {
                '@chromatic-com/storybook': 'latest',
                '@storybook/addon-essentials': 'latest',
                '@storybook/addon-interactions': 'latest',
                '@storybook/addon-links': 'latest',
                '@storybook/addon-onboarding': 'latest',
                '@storybook/blocks': 'latest',
                '@storybook/test': 'latest',
                '@storybook/vue3': 'latest',
                '@storybook/vue3-vite': 'latest',
                storybook: 'latest',
                '@vitejs/plugin-vue': 'latest',
                '@vue/test-utils': 'latest',
                '@testing-library/vue': 'latest',
                '@testing-library/jest-dom': 'latest',
                sass: 'latest',
                typescript: 'latest',
                vite: 'latest',
                vitest: 'latest',
                'vue-tsc': 'latest',
                ...(this.options.useTailwindCSS && {
                    tailwindcss: 'latest',
                    autoprefixer: 'latest',
                    postcss: 'latest'
                })
            }
        };

        const packageJsonPath = path.join(this.targetPath, 'package.json');
        await fs.writeJson(packageJsonPath, packageJsonTemplate, { spaces: 2 });
    }
    // 复制配置文件
    private async copyConfigFiles() {
        const configFiles = ['tsconfig.json', '.storybook/main.ts', '.storybook/preview.ts'];
        await Promise.all(configFiles.map((file) => this.copyConfigFile(file)));
        await this.handleTailwindConfig();
    }

    private async copyConfigFile(file: string) {
        const src = path.join(this.templatePath, file);
        const dest = path.join(this.targetPath, file);
        if (await fs.pathExists(src)) {
            await fs.copy(src, dest);
        }
    }
    private async handleTailwindConfig() {
        if (this.options.useTailwindCSS) {
            const tailwindConfigSrc = path.join(this.templatePath, 'tailwind.config.js');
            const tailwindConfigDest = path.join(this.targetPath, 'tailwind.config.js');

            if (await fs.pathExists(tailwindConfigSrc)) {
                await fs.copy(tailwindConfigSrc, tailwindConfigDest);
            } else {
                const templateFile = path.join(this.templatePath, 'tailwind.config.tpl.ts');
                if (await fs.pathExists(templateFile)) {
                    await this.processTemplateFile({ name: 'tailwind.config.tpl.ts', isFile: () => true } as fs.Dirent);
                }
            }
        }
    }
    // 清理生成的文件（如果发生错误）
    private async cleanup() {
        if (await fs.pathExists(this.targetPath)) {
            await fs.remove(this.targetPath);
        }
    }
}
