import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: ['node_modules']
            }
        },
        postcss: {
            plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')]
        }
    }
});
