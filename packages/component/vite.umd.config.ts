import { defineConfig } from "vite";
import VueMacros from 'unplugin-vue-macros';
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url';
import { resolve, relative, extname } from "path";
import { globSync } from "glob";

export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue()
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AirUI',
      fileName: 'air-ui',
      formats: ['umd']
    },
    rollupOptions: {
      external: ['vue', 'element-plus/es/utils/vue', 'element-plus/es/hooks/use-size'],
      input: Object.fromEntries(
        globSync(["src/**/*.vue"]).map((file) => [
          relative("src", file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        globals: {
          vue: "Vue",
          'element-plus': 'ElementPlus'
        },
        entryFileNames: "[name].js",
        exports: "auto"
      },
    }
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
