import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/block/src');
const AIRBLOCKS_PATH = path.resolve(__dirname, '../packages/block/src/airblocks.js');

// Start of Selection
const componentName = process.argv[2].charAt(0).toUpperCase() + process.argv[2].slice(1);

if (!componentName) {
    console.error('请提供组件名称。例如: npm run add-component MyComponent');
    process.exit(1);
}

const componentDir = path.join(COMPONENTS_DIR, componentName.toLowerCase());
const vueFile = path.join(componentDir, `${componentName}.vue`);
const dtsFile = path.join(componentDir, `${componentName}.d.ts`);
const storiesFile = path.join(componentDir, `${componentName}.stories.ts`);
const packageFile = path.join(componentDir, `package.json`);

// 检查组件是否已存在
if (fs.existsSync(componentDir)) {
    console.error(`组件 ${componentName} 已存在。`);
    process.exit(1);
}

// 创建组件目录
fs.mkdirSync(componentDir, { recursive: true });

// 创建 .vue 文件模板
const vueTemplate = `<template>
  <div id="${componentName.toLowerCase()}">
    <!-- ${componentName} 组件内容 -->
    ${componentName}组件
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '../theme/index.scss';

// 添加逻辑
</script>
`;

fs.writeFileSync(vueFile, vueTemplate, 'utf8');
console.log(`已创建 Vue 文件: ${vueFile}`);

// 创建 .d.ts 文件模板
const dtsTemplate = `/**
 *
 * ${componentName}
 *
 * [在线演示](https://www.xxxx/)
 *
 * @module ${componentName}
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

/**
 * 定义${componentName}组件的当前内联状态
 */
export interface ${componentName}State {
    /**
     * 当前id状态
     */
    id: string;
}

/**
 * 定义${componentName}组件的有效属性
 */
export interface ${componentName}Props {
    /**
     * 组件标题
     */
    title?: string | undefined;
}

/**
 * 定义${componentName}组件的有效插槽
 */
export interface ${componentName}Slots {
    /**
     * 自定义内容
     */
    default(): VNode[];
}

/**
 * 定义${componentName}组件的有效事件
 */
export interface ${componentName}EmitsOptions {
    /**
     * 触发某事件时
     */
    click: () => void;
}

export declare type ${componentName}Emits = EmitFn<${componentName}EmitsOptions>;

declare const ${componentName}: DefineComponent<${componentName}Props, ${componentName}Slots, ${componentName}Emits>;

declare module 'vue' {
    export interface GlobalComponents {
        ${componentName}: GlobalComponentConstructor<${componentName}Props, ${componentName}Slots, ${componentName}Emits>;
    }
}

export default ${componentName};
`;

fs.writeFileSync(dtsFile, dtsTemplate, 'utf8');
console.log(`已创建类型定义文件: ${dtsFile}`);

// 创建 .stories.ts 文件模板
const storiesTemplate = `import type { Meta, StoryFn } from '@storybook/vue3';
import ${componentName} from './${componentName}.vue';

const meta: Meta<typeof ${componentName}> = {
    title: '物料库/${componentName}',
    tags: ['autodocs'],
    component: ${componentName},
    argTypes: {},
    args: {}
};

const Template: StoryFn = (args) => ({
    components: { ${componentName} },
    setup() {
        return { args };
    },
    template: '<${componentName} v-bind="args">{{ args.default }}</${componentName}>'
});

export const Default = Template.bind({});

export default meta;
`;

fs.writeFileSync(storiesFile, storiesTemplate, 'utf8');
console.log(`已创建 Story 文件: ${storiesFile}`);

// 创建 package.json 文件模板
const packageTemplate = `{
    "main": "./${componentName}.vue",
    "types": "./${componentName}.d.ts",
    "module": "./${componentName}.vue",
    "sideEffects": [
        "*.vue"
    ]
}
`;

fs.writeFileSync(packageFile, packageTemplate, 'utf8');
console.log(`已创建 package.json 文件: ${packageFile}`);

// 更新 airblocks.js
// 注入的内容中添加注释分割线
const exportLines = `
//${componentName.toLowerCase()} ------------------------------
export * from './${componentName.toLowerCase()}/${componentName}.vue';
export { default as ${componentName} } from './${componentName.toLowerCase()}/${componentName}.vue';\n`;

fs.appendFileSync(AIRBLOCKS_PATH, exportLines, 'utf8');
console.log(`已更新 airblocks.js 添加导出: ${componentName}`);
