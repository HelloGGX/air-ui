import { defineConfig, mergeConfig } from "vite";
import { globSync } from "glob";
import path from "path";
import fs from "fs";
import css from "rollup-plugin-css-only";
import baseConfig from "../../vite.config.js";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";

// globals
const GLOBALS = {
  vue: "Vue",
};
// externals
const GLOBAL_EXTERNALS = ["vue"];
const EXTERNALS = [...GLOBAL_EXTERNALS];
const PLUGINS = [vue()];
const ENTRY = {
  entries: [],
  onwarn(warning) {
    if (warning.code === "CIRCULAR_DEPENDENCY") {
      //console.error(`(!) ${warning.message}`);
      return;
    }
  },
  format: {
    cjs_es(options) {
      return ENTRY.format.cjs(options).es(options);
    },
    cjs({ input, output, minify }) {
      ENTRY.entries.push({
        onwarn: ENTRY.onwarn,
        input,
        plugins: [...PLUGINS],
        external: EXTERNALS,
        inlineDynamicImports: true,
        output: [
          {
            format: "cjs",
            file: `${output}${minify ? ".min" : ""}.cjs`,
            sourcemap: true,
            exports: "auto",
          },
        ],
      });

      ENTRY.update.packageJson({
        input,
        output,
        options: { main: `${output}.cjs` },
      });

      return ENTRY.format;
    },
    es({ input, output, minify }) {
      ENTRY.entries.push({
        onwarn: ENTRY.onwarn,
        input,
        plugins: [...PLUGINS],
        external: EXTERNALS,
        inlineDynamicImports: true,
        output: [
          {
            format: "es",
            file: `${output}${minify ? ".min" : ""}.mjs`,
            sourcemap: true,
            exports: "auto",
          },
        ],
      });

      ENTRY.update.packageJson({
        input,
        output,
        options: { main: `${output}.mjs`, module: `${output}.mjs` },
      });

      return ENTRY.format;
    },
    umd({ name, input, output, minify }) {
      ENTRY.entries.push({
        onwarn: ENTRY.onwarn,
        input,
        plugins: [
          alias(ALIAS_PLUGIN_OPTIONS),
          resolve(),
          ...PLUGINS,
          minify && terser(TERSER_PLUGIN_OPTIONS),
        ],
        external: GLOBAL_EXTERNALS,
        inlineDynamicImports: true,
        output: [
          {
            format: "umd",
            name: name ?? "PrimeVue",
            file: `${output}${minify ? ".min" : ""}.js`,
            globals: GLOBALS,
            exports: "auto",
          },
        ],
      });

      return ENTRY.format;
    },
  },
  update: {
    packageJson({ input, output, options }) {
      try {
        const inputDir = path.resolve(__dirname, path.dirname(input));
        const outputDir = path.resolve(__dirname, path.dirname(output));
        const packageJson = path.resolve(outputDir, "package.json");

        !fs.existsSync(packageJson) &&
          fs.copySync(path.resolve(inputDir, "./package.json"), packageJson);

        const pkg = JSON.parse(
          fs.readFileSync(packageJson, { encoding: "utf8", flag: "r" })
        );

        !pkg?.main?.includes(".cjs") &&
          (pkg.main = path.basename(options?.main)
            ? `./${path.basename(options.main)}`
            : pkg.main);
        pkg.module = path.basename(options?.module)
          ? `./${path.basename(options.module)}`
          : packageJson.module;
        pkg.types && (pkg.types = "./index.d.ts");

        fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 4));
      } catch {}
    },
  },
};

function addFile() {
  fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR), {
    withFileTypes: true,
  })
    .filter((dir) => dir.isDirectory())
    .forEach(({ name: folderName }) => {
      fs.readdirSync(
        path.resolve(__dirname, process.env.INPUT_DIR + folderName)
      ).forEach((file) => {
        let name = file.split(/(.vue)$|(.js)$/)[0].toLowerCase();

        if (name === folderName) {
          const input = process.env.INPUT_DIR + folderName + "/" + file;
          const output = process.env.OUTPUT_DIR + folderName + "/index";
          ENTRY.format.es({ input, output });
        }
      });
    });
}
addFile();
console.log(ENTRY.entries);

export default defineConfig(({ command, mode }) => {
  const config = mergeConfig(baseConfig, {
    build: {
      minify: false,
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: "AirButton"
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
            entryFileNames: "[name].mjs",
            preserveModules: true, // 保留模块结构
            exports: "named",
            sourcemap: true,
            format: "es",
          },
        ],
      },
    },
    // css: {
    //   postcss: {
    //     plugins: [
    //       require("tailwindcss")(path.resolve(__dirname, "tailwind.config.js")),
    //       require("autoprefixer"),
    //     ],
    //   },
    // },
  });
  return config;
});
