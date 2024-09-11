import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                format: 'es',
                preserveModules: true,
                entryFileNames: '[name].js',
                preserveModulesRoot: 'src'
            }
        }
    }
});
