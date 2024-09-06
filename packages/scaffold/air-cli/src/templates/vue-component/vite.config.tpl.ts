import { TemplateFunction } from '../../types';

const templateFn: TemplateFunction = function ({ name: componentName, useTailwindCSS, componentLibrary }) {
    componentName = componentName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());

    let tailwindConfig = '';
    if (useTailwindCSS) {
        tailwindConfig = `
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';`;
    }

    return {
        filename: 'vite.config.ts',
        contents: `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';${tailwindConfig}

export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: './tsconfig.json',
            include: ['src/index.ts'],
            exclude: ['**/*.stories.ts'],
            outDir: 'dist/es',
            clearPureImport: false
        }),
    ],${
        useTailwindCSS
            ? `
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },`
            : ''
    }
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: '${componentName}',
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['vue'${componentLibrary !== 'none' ? `, '${componentLibrary}'` : ''}],
            output: {
                globals: {
                    vue: 'Vue'
                },
                exports: 'named',
            }
        }
    }
});
`
    };
};

export default templateFn;
