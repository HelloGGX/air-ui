import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'element-plus': fileURLToPath(new URL('node_modules/element-plus', import.meta.url))
    }
  }
});
