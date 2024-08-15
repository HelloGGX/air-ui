import { defineConfig } from 'vite';
import type { PluginOption, LibraryOptions } from 'vite';
import type { RollupOptions, OutputOptions, InputOption } from 'rollup';
import VueMacros from 'unplugin-vue-macros';
import vue from '@vitejs/plugin-vue';
import dts, { type PluginOptions } from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'url';
import { extname, resolve } from 'path';
import { globSync } from 'glob';
import ElementPlus from 'unplugin-element-plus/vite';


const { resolvePath } = require('../../scripts/build-helper.mjs');
const { INPUT_DIR, OUTPUT_DIR } = resolvePath(import.meta.url);

// externals
const GLOBAL_EXTERNALS = ['vue', /element-plus\/es\/.*/, '@element-plus/icons-vue', 'element-plus'];
const SCSS_EXTERNALS = [/\.css$/, /\.scss$/];
const EXTERNALS = [...GLOBAL_EXTERNALS, ...SCSS_EXTERNALS];

// plugins
const VUEMACROS_PLUGIN_OPTION = {
    plugins: {
        vue: vue()
    }
};
const DTS_PLUGIN_OPTION: PluginOptions = {
    tsconfigPath: './tsconfig.json',
    include: [`${INPUT_DIR}**/*.ts`, `${INPUT_DIR}**/*.vue`, `index.ts`, 'component.ts', 'default.ts'],
    exclude: ['**/*.stories.ts'],
    outDir: `${OUTPUT_DIR}types`,
    clearPureImport: false
};
const PLUGINS: PluginOption = [
    VueMacros.vite(VUEMACROS_PLUGIN_OPTION),
    dts(DTS_PLUGIN_OPTION),
    ElementPlus({ format: 'esm' })
];

// build.lib
const INPUT_OPTION: InputOption = {
    ...Object.fromEntries(
        globSync([`${INPUT_DIR}**/*.ts`, 'index.ts'])
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
    formats: ['es']
};

// rollupOptions
const ROLLUP_OUTPUT_OPTION: OutputOptions = {
    globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus'
    },
    entryFileNames: '[name].mjs',
    exports: 'named',
    assetFileNames: 'theme/[name][extname]'
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
        outDir: `${OUTPUT_DIR}es`,
        lib: LIB_OPTIONS,
        rollupOptions: ROLLUP_OPTIONS,
        minify: false,
        cssCodeSplit: true,
        sourcemap: true
    }
});
