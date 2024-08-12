import { defineConfig } from 'vite';
import type { PluginOption, LibraryOptions } from 'vite';
import type { RollupOptions, OutputOptions } from 'rollup';
import VueMacros from 'unplugin-vue-macros';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'url';
import { extname } from 'path';
import { globSync } from 'glob';
import ElementPlus from 'unplugin-element-plus/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const { resolvePath } = require('../../scripts/build-helper.mjs');

const { INPUT_DIR, OUTPUT_DIR } = resolvePath(import.meta.url);

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
export const PLUGINS: PluginOption = [
    VueMacros.vite(VUEMACROS_PLUGIN_OPTION),
    dts(DTS_PLUGIN_OPTION),
    ElementPlus({ format: 'esm' })
];

// build.lib
const LIB_OPTIONS: LibraryOptions = {
    entry: {
        index: fileURLToPath(new URL('index.ts', import.meta.url)), // 添加新的入口文件
        ...Object.fromEntries(
            globSync([`${INPUT_DIR}**/*.ts`])
                .filter((file) => !file.endsWith('stories.ts')) // 过滤掉以 stories.ts 结尾的文件
                .map((file) => [
                    file.slice(0, file.length - extname(file).length),
                    fileURLToPath(new URL(file, import.meta.url))
                ])
        )
    },
    name: 'AirElement',
    formats: ['es']
};

// rollupOptions
const ROLLUP_OUTPUT_OPTION: OutputOptions = {
    globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus'
    },
    entryFileNames: '[name].mjs',
    exports: 'auto' as 'auto'
};
const ROLLUP_OPTIONS: RollupOptions = {
    external: EXTERNALS,
    output: ROLLUP_OUTPUT_OPTION
};

export default defineConfig({
    plugins: PLUGINS,
    build: {
        outDir: `${OUTPUT_DIR}es`,
        lib: LIB_OPTIONS,
        rollupOptions: ROLLUP_OPTIONS,
        minify: false,
        cssCodeSplit: true
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer]
        }
    }
});
