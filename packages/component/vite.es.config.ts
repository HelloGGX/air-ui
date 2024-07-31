import { defineConfig } from "vite";
import VueMacros from 'unplugin-vue-macros';
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue()
      },
    }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'element-ui': fileURLToPath(new URL('../../node_modules/element-ui', import.meta.url))
    }
  },
});
