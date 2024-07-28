import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";


export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: path.resolve(__dirname, "postcss.config.js"),
  },
});
