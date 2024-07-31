import { defineConfig } from "vite";
import { join, resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { globSync } from "glob";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      cleanVueFileName: true,
    }),
  ],
  build: {
    target: "esnext",
    sourcemap: true,
    minify: false,
    lib: {
      name: "air-ui",
      entry: resolve(__dirname, join("src", "index.ts")),
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["vue"],
      input: Object.fromEntries(
        globSync(["src/**/*.vue"]).map((file) => [
          relative("src", file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        dir: resolve(__dirname, "dist"),
        globals: {
          vue: "Vue"
        },
        entryFileNames: "[name].mjs",
        exports: "auto",
        format: "es",
      },
    },
  },
  resolve: {
    alias: {
      // 让 Vite 能够解析到根目录的 node_modules
      'element-plus': resolve(__dirname, '../../node_modules/element-plus')
    }
  },
  css: {
    postcss: {
      plugins: [
        require("tailwindcss")(resolve(__dirname, "tailwind.config.js")),
        require("autoprefixer"),
      ],
    },
  },
});
