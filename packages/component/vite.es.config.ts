import { defineConfig } from "vite";
import VueMacros from "unplugin-vue-macros";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "node:url";
import { resolve, relative, extname } from "node:path";
import { globSync } from "glob";
import copy from "rollup-plugin-copy";

// externals
const GLOBAL_EXTERNALS = [
  "vue",
  /element-plus\/es\/.*/,
  "element-plus/es/utils/vue",
  "element-plus/es/hooks/use-size",
];
const INLINE_EXTERNALS = [/@air-ui\/component\/.*/];
const EXTERNALS = [...GLOBAL_EXTERNALS, ...INLINE_EXTERNALS];

// alias
const ALIAS_ENTRIES = [
  { find: '@air-ui/component', replacement: './' }
];

export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue(),
      },
    }),
    dts({
      tsconfigPath: "./tsconfig.json",
      include: ["src/**/*.ts", "src/**/*.vue"],
      outDir: "dist/types",
    }),
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' }
      ]
    }),
  ],
  resolve: {
    alias: ALIAS_ENTRIES
  },
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "AirUI",
      fileName: "air-ui",
      formats: ["es"],
    },
    rollupOptions: {
      external: EXTERNALS,
      input: {
        index: resolve(__dirname, "index.ts"),
        ...Object.fromEntries(
          globSync(["src/**/*.vue"]).map((file) => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
        ),
      },
      output: {
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
        },
        entryFileNames: ({ facadeModuleId }) => {
          // 默认情况下使用模块的原始名称
          return "[name].mjs";
        },
        exports: "auto",
      },
    },
    minify: false, // 禁用代码压缩和混淆
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
});
