import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import VueMacros from 'unplugin-vue-macros';
import ElementPlus from 'unplugin-element-plus/vite';
import fs from 'fs-extra';
import path from 'path';
import { resolvePath } from '../../scripts/build-helper.mjs';

const { __dirname } = resolvePath(import.meta.url);
// globals
const GLOBALS = {
    vue: 'Vue'
};
// externals
const GLOBAL_EXTERNALS = ['vue', /element-plus\/es\/.*/, '@element-plus/icons-vue', 'element-plus'];
const INLINE_EXTERNALS = [/@air-ui\/component\/.*/, /@air-ui\/component/];
export const EXTERNALS = [...GLOBAL_EXTERNALS, ...INLINE_EXTERNALS];
// plugins
export const VUEMACROS_PLUGIN_OPTION = {
    plugins: {
        vue: vue()
    }
};
const POSTCSS_PLUGIN_OPTIONS = {
  sourceMap: false
};
const TERSER_PLUGIN_OPTIONS = {
    compress: {
        keep_infinity: true,
        pure_getters: true,
        reduce_funcs: true
    },
    mangle: {
        reserved: ['theme', 'css']
    }
};
export const PLUGINS = [
    VueMacros.vite(VUEMACROS_PLUGIN_OPTION),
    ElementPlus({ format: 'esm' }),
    postcss(POSTCSS_PLUGIN_OPTIONS)
];

const ENTRY = {
    entries: [],
    onwarn(warning) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
            //console.error(`(!) ${warning.message}`);
            return;
        }
    },
    format: {
        es({ input, output, minify }) {
            ENTRY.entries.push({
                onwarn: ENTRY.onwarn,
                input,
                plugins: [...PLUGINS, minify && terser(TERSER_PLUGIN_OPTIONS)],
                external: EXTERNALS,
                inlineDynamicImports: true,
                output: [
                    {
                        format: 'es',
                        file: `${output}${minify ? '.min' : ''}.mjs`,
                        sourcemap: true,
                        exports: 'auto'
                    }
                ]
            });

            ENTRY.update.packageJson({ input, output, options: { main: `${output}.mjs`, module: `${output}.mjs` } });

            return ENTRY.format;
        }
    },
    update: {
        packageJson({ input, output, options }) {
            try {
                const inputDir = path.resolve(__dirname, path.dirname(input));
                const outputDir = path.resolve(__dirname, path.dirname(output));
                const packageJson = path.resolve(outputDir, 'package.json');

                !fs.existsSync(packageJson) && fs.copySync(path.resolve(inputDir, './package.json'), packageJson);

                const pkg = JSON.parse(fs.readFileSync(packageJson, { encoding: 'utf8', flag: 'r' }));

                !pkg?.main?.includes('.cjs') &&
                    (pkg.main = path.basename(options?.main) ? `./${path.basename(options.main)}` : pkg.main);
                pkg.module = path.basename(options?.module) ? `./${path.basename(options.module)}` : packageJson.module;
                pkg.types && (pkg.types = './index.d.ts');

                fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 4));
            } catch {}
        }
    }
};

function addFile() {
    fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .forEach(({ name: folderName }) => {
            fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR + folderName)).forEach((file) => {
                let name = file.split(/(.vue)$|(.js)$/)[0].toLowerCase();

                if (name === folderName) {
                    const input = process.env.INPUT_DIR + folderName + '/' + file;
                    const output = process.env.OUTPUT_DIR + folderName + '/index';
                    console.log(input);
                    console.log(output);
                    ENTRY.format.es({ input, output });
                }
            });
        });
}
addFile();

export default ENTRY.entries;
