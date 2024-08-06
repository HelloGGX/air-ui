import { defineConfig } from "vite";
import VueMacros from 'unplugin-vue-macros';
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";


// externals
const GLOBAL_EXTERNALS = [
  "vue",
  /element-plus\/es\/.*/,
  "element-plus/es/utils/vue",
  "element-plus/es/hooks/use-size",
];
const EXTERNALS = [...GLOBAL_EXTERNALS];


export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue(),
      },
    })
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AirUI',
      fileName: 'air-ui',
      formats: ['umd']
    },
    rollupOptions: {
      external: EXTERNALS,
      output: {
        globals: {
          vue: "Vue",
          'element-plus': 'ElementPlus'
        },
        entryFileNames: "[name].js",
        exports: "named",
      },
    },
    minify: false, // 禁用代码压缩和混淆
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
});
