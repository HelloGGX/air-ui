import { defineConfig } from 'vite';
import type { RollupOptions } from 'rollup';
import VueMacros from 'unplugin-vue-macros';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'node:url';
import { resolve, relative, extname, join } from 'node:path';
import { globSync } from 'glob';
import ElementPlus from 'unplugin-element-plus/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const { resolvePath } = require('../../scripts/build-helper.mjs');

const { __dirname, INPUT_DIR, OUTPUT_DIR, INPUT_PATH, OUTPUT_PATH } = resolvePath(import.meta.url);

console.log('*************', __dirname, INPUT_DIR, OUTPUT_DIR, INPUT_PATH, OUTPUT_PATH);

// externals
const GLOBAL_EXTERNALS = ['vue', /element-plus\/es\/.*/, '@element-plus/icons-vue', 'element-plus'];
export const EXTERNALS = [...GLOBAL_EXTERNALS];
// plugins
export const VUEMACROS_PLUGIN_OPTION = {
    plugins: {
        vue: vue()
    }
};
const DTS_PLUGIN_OPTION = {
    tsconfigPath: './tsconfig.json',
    include: [`${INPUT_DIR}**/*.ts`, `${INPUT_DIR}**/*.vue`, `index.ts`],
    exclude: ['**/*.stories.ts'],
    outDir: `${OUTPUT_DIR}types`
};
export const PLUGINS = [
    VueMacros.vite(VUEMACROS_PLUGIN_OPTION),
    dts(DTS_PLUGIN_OPTION),
    ElementPlus({ format: 'esm' })
];

// rollupOptions
const ROLLUP_INPUT_OPTION = {
    index: fileURLToPath(new URL('index.ts', import.meta.url)), // 添加新的入口文件
    ...Object.fromEntries(
        globSync([`${INPUT_DIR}**/*.ts`])
            .filter((file) => !file.endsWith('stories.ts')) // 过滤掉以 stories.ts 结尾的文件
            .map((file) => [
                file.slice(0, file.length - extname(file).length),
                fileURLToPath(new URL(file, import.meta.url))
            ])
    )
};
const ROLLUP_OUTPUT_OPTION = {
    globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus'
    },
    entryFileNames: '[name].mjs',
    exports: 'auto' as 'auto'
};
const ROLLUP_OPTIONS: RollupOptions  = {
    external: EXTERNALS,
    input: ROLLUP_INPUT_OPTION,
    output: ROLLUP_OUTPUT_OPTION
};

export default defineConfig({
    plugins: PLUGINS,
    build: {
        outDir: `${OUTPUT_DIR}es`,
        lib: {
            entry: resolve(__dirname, `${INPUT_DIR}index.ts`),
            name: 'AirUI',
            fileName: 'air-ui',
            formats: ['es']
        },
        rollupOptions: ROLLUP_OPTIONS,
        minify: false // 禁用代码压缩和混淆
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer]
        }
    }
});
