import { defineConfig } from 'vite';
import { resolve } from 'path';
import { EXTERNALS, VUEMACROS_PLUGIN_OPTION } from './vite.es.config';
import VueMacros from 'unplugin-vue-macros';
import ElementPlus from 'unplugin-element-plus/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const PLUGINS = [
    VueMacros.vite(VUEMACROS_PLUGIN_OPTION),
    ElementPlus({
        format: 'cjs'
    })
];

export default defineConfig({
    plugins: PLUGINS,
    build: {
        outDir: 'dist/umd',
        lib: {
            entry: resolve(__dirname, 'components/index.ts'),
            name: 'AirUI',
            fileName: 'air-ui',
            formats: ['umd']
        },
        rollupOptions: {
            external: EXTERNALS,
            output: {
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus'
                },
                entryFileNames: '[name].js',
                exports: 'named'
            }
        },
        minify: false // 禁用代码压缩和混淆
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer]
        }
    }
});
