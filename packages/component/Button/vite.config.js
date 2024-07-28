import { defineConfig, mergeConfig } from "vite";
import path from "path";
import css from "rollup-plugin-css-only";
import baseConfig from "../../../vite.config.js";
import dts from "vite-plugin-dts";

export default defineConfig(({ command, mode }) => {
  const config = mergeConfig(baseConfig, {
    plugins: [
      css({ output: "button.css" }),
      // dts({
      //   include: ["src/**/*.ts"],
      //   outputDir: path.resolve(__dirname, "dist/src"),
      //   rollupTypes: true,
      //   cleanVueFileName: true,
      //   insertTypesEntry: true,
      // }),
    ],
    build: {
      minify: false,
      lib: {
        entry: path.resolve(__dirname, "index.ts"),
        name: "AirButton",
        formats: ["es"],
      },
      rollupOptions: {
        external: ["vue"],
       
        output: [
          {
            dir: path.resolve(__dirname, "dist"),
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: "Vue",
            },
            entryFileNames: '[name].mjs',
            preserveModules: true, // 保留模块结构
             exports: 'named',
            sourcemap: true,
            format: "es",
          },
        ],
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
  return config;
});
