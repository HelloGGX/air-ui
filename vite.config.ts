import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@air-ui/air-element': path.resolve(__dirname, 'packages/air-element/dist'),
            '@air-ui/block': path.resolve(__dirname, 'packages/block/dist')
        }
    },
    css: {
        postcss: {
            plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')]
        }
    }
});
