import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig({
    plugins: [vue(), ElementPlus()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './'),
            '@air-element': resolve(__dirname, './packages/air-element'),
            '@block': resolve(__dirname, './packages/block'),
            '@page': resolve(__dirname, './packages/page'),
            '@scaffold': resolve(__dirname, './packages/scaffold')
        }
    },
    css: {
        postcss: {
            plugins: [
                require('postcss-import'),
                require('tailwindcss'),
                require('autoprefixer')
            ]
        }
    }
});
