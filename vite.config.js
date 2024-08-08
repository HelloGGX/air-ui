import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(new URL('.', import.meta.url).pathname, 'src'),
      'element-plus': path.resolve(new URL('.', import.meta.url).pathname, 'node_modules/element-plus')
    }
  }
});
