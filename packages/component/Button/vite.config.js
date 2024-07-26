import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import css from "rollup-plugin-css-only";

export default defineConfig({
  plugins: [vue(), css({ output: "button.css" })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "main.js"),
      name: "Button",
      fileName: (format) => `button.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
        assetFileNames: "button.css", // 指定 CSS 文件名
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        require("tailwindcss")(path.resolve(__dirname, "tailwind.config.js")),
        require("autoprefixer"),
      ],
    },
  },
});
