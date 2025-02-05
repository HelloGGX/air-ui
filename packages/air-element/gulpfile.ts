import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import path from 'path';
import autoprefixer from 'gulp-autoprefixer';
import { type TaskFunction, dest, parallel, series, src } from 'gulp';
import postcss from 'postcss';
import { Transform } from 'stream';
import cssnano from 'cssnano';
import type Vinly from 'vinyl';
import consola from 'consola';
import chalk from 'chalk';
import gulpPostCss from 'gulp-postcss';
import tailwindcss from 'tailwindcss';
import { resolvePath } from '../../scripts/build-helper';

const { OUTPUT_PATH } = resolvePath(import.meta.url);
const distFolder = path.resolve(__dirname, 'theme/dist');
const distBundle = path.resolve(OUTPUT_PATH, 'theme');
/**
 * using `postcss` and `cssnano` to compress CSS
 * @returns
 */
function compressWithCssnano() {
    const processor = postcss([
        cssnano({
            preset: [
                'default',
                {
                    // avoid color transform
                    colormin: false,
                    // avoid font transform
                    minifyFontValues: false
                }
            ]
        })
    ]);
    return new Transform({
        objectMode: true,
        transform(chunk, _encoding, callback) {
            const file = chunk as Vinly;
            if (file.isNull()) {
                callback(null, file);
                return;
            }
            if (file.isStream()) {
                callback(new Error('Streaming not supported'));
                return;
            }
            const cssString = file.contents!.toString();
            processor.process(cssString, { from: file.path }).then((result) => {
                const name = path.basename(file.path);
                file.contents = Buffer.from(result.css);
                consola.success(
                    `${chalk.cyan(name)}: ${chalk.yellow(
                        cssString.length / 1000
                    )} KB -> ${chalk.green(result.css.length / 1000)} KB`
                );
                callback(null, file);
            });
        }
    });
}

function buildThemeChalk() {
    const sass = gulpSass(dartSass);
    return src(path.resolve(__dirname, 'theme/src/*.scss'))
        .pipe(sass.sync({ includePaths: [path.resolve(__dirname, 'node_modules')] })) // 添加 includePaths
        .pipe(gulpPostCss([tailwindcss('./tailwind.config.js')]))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(compressWithCssnano())
        .pipe(dest(distFolder));
}

/**
 * copy from air-element/theme/dist to air-element/theme
 */
export function copyThemeChalkBundle() {
    return src(`${distFolder}/**`).pipe(dest(distBundle));
}

/**
 * copy source file to packages
 */

export function copyThemeChalkSource() {
    return src(path.resolve(__dirname, 'theme/src/**')).pipe(dest(path.resolve(distBundle, 'src')));
}

export const build: TaskFunction = parallel(copyThemeChalkSource, series(buildThemeChalk, copyThemeChalkBundle));

export default build;
