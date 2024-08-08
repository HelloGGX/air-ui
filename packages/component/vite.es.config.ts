import { defineConfig } from 'vite';
import VueMacros from 'unplugin-vue-macros';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'node:url';
import { resolve, relative, extname } from 'node:path';
import { globSync } from 'glob';
import { updatePackageJsonPlugin } from './utils/updatePackageJsonPlugin';
import ElementPlus from 'unplugin-element-plus/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// externals
const GLOBAL_EXTERNALS = [
  'vue',
  /element-plus\/es\/.*/,
  '@element-plus/icons-vue',
  'element-plus',
];
const INLINE_EXTERNALS = [/@air-ui\/component\/.*/, /@air-ui\/component/];
export const EXTERNALS = [...GLOBAL_EXTERNALS, ...INLINE_EXTERNALS];
// plugins
const UPDATE_PACKAGEJSON_PLUGIN_OPTION = {
  input: './',
  output: './dist',
};
export const VUEMACROS_PLUGIN_OPTION = {
  plugins: {
    vue: vue(),
  },
};
const DTS_PLUGIN_OPTION = {
  tsconfigPath: './tsconfig.json',
  include: ['src/**/*.ts', 'src/**/*.vue'],
  exclude: ['**/*.stories.ts'],
  outDir: 'dist/types',
};
export const PLUGINS = [
  updatePackageJsonPlugin(UPDATE_PACKAGEJSON_PLUGIN_OPTION),
  VueMacros.vite(VUEMACROS_PLUGIN_OPTION),
  dts(DTS_PLUGIN_OPTION),
  ElementPlus({ format: 'esm' }),
];

export default defineConfig({
  plugins: PLUGINS,
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AirUI',
      fileName: 'air-ui',
      formats: ['es'],
    },
    rollupOptions: {
      external: EXTERNALS,
      input: {
        index: resolve(__dirname, 'index.ts'),
        ...Object.fromEntries(
          globSync(['src/**/*.vue']).map((file) => [
            relative('src', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
        ),
      },
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
        entryFileNames: '[name].mjs',
        exports: 'auto',
        // paths: (id) => {
        //   if (id.startsWith("@air-ui/component")) {
        //     return id.replace("@air-ui/component", ".");
        //   }
        //   return id;
        // },
      },
    },
    minify: false, // 禁用代码压缩和混淆
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
