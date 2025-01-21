import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [vue()],
    css: {
        postcss: {
            plugins: [
                postcssImport(), // 确保调用插件
                tailwindcss(),
                autoprefixer()
            ]
        }
    }
});
