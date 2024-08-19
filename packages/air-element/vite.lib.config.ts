import { defineConfig } from 'vite';
import type { PluginOption, LibraryOptions } from 'vite';
import type { RollupOptions, OutputOptions, InputOption } from 'rollup';
import VueMacros from 'unplugin-vue-macros';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { extname, resolve } from 'path';
import { globSync } from 'glob';
import ElementPlus from 'unplugin-element-plus/vite';


const { resolvePath } = require('../../scripts/build-helper.mjs');
const { INPUT_DIR, OUTPUT_DIR } = resolvePath(import.meta.url);
const outDir = `${OUTPUT_DIR}lib`;
// externals
const GLOBAL_EXTERNALS = ['vue', /element-plus\/.*/, '@element-plus/icons-vue', 'element-plus'];
const SCSS_EXTERNALS = [/\.css$/, /\.scss$/];
const EXTERNALS = [...GLOBAL_EXTERNALS, ...SCSS_EXTERNALS];

// plugins
const VUEMACROS_PLUGIN_OPTION = {
    plugins: {
        vue: vue()
    }
};

const PLUGINS: PluginOption = [
    VueMacros.vite(VUEMACROS_PLUGIN_OPTION),
    ElementPlus({ format: 'cjs' })
];

// build.lib
const INPUT_OPTION: InputOption = {
    ...Object.fromEntries(
        globSync([`${INPUT_DIR}**/*.ts`, 'index.ts', 'default.ts', 'component.ts'])
            .filter((file) => !file.endsWith('stories.ts')) // 过滤掉以 stories.ts 结尾的文件
            .map((file) => [
                file.slice(0, file.length - extname(file).length),
                fileURLToPath(new URL(file, import.meta.url))
            ])
    )
};
const LIB_OPTIONS: LibraryOptions = {
    entry: INPUT_OPTION,
    name: 'AirElement',
    formats: ['cjs']
};

// rollupOptions
const ROLLUP_OUTPUT_OPTION: OutputOptions = {
    globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus'
    },
    entryFileNames: '[name].js',
    exports: 'named'
};
const ROLLUP_OPTIONS: RollupOptions = {
    external: EXTERNALS,
    output: ROLLUP_OUTPUT_OPTION
};

export default defineConfig({
    plugins: PLUGINS,
    resolve: {
        alias: {
            '@air-ui/air-element': resolve(__dirname, './')
        }
    },
    build: {
        outDir,
        lib: LIB_OPTIONS,
        rollupOptions: ROLLUP_OPTIONS,
        minify: false,
        cssCodeSplit: true,
        sourcemap: true
    }
});
