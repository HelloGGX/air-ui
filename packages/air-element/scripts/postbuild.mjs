import fs from 'fs-extra';
import path from 'path';
import { clearPackageJson, resolvePath } from '../../../scripts/build-helper.mjs';

const { __dirname, __workspace, OUTPUT_DIR } = resolvePath(import.meta.url);

fs.copySync(path.resolve(__dirname, '../package.json'), `${OUTPUT_DIR}/package.json`);
fs.copySync(path.resolve(__dirname, '../README.md'), `${OUTPUT_DIR}/README.md`);
// fs.copySync(path.resolve(__workspace, './LICENSE.md'), `${OUTPUT_DIR}/LICENSE.md`);

const outputpkg = path.resolve(__dirname, `../${OUTPUT_DIR}/package.json`);

// package.json
const pkgJson = JSON.parse(fs.readFileSync(outputpkg, { encoding: 'utf8', flag: 'r' }));

pkgJson.main = 'es/index.mjs';
pkgJson.module = 'es/index.mjs';
pkgJson.types = 'types/index.d.ts';
// Update exports field
pkgJson.exports = {
    '.': {
        types: './types/index.d.ts',
        import: './es/index.mjs',
        require: './umd/index.js'
    },
    './es': {
        types: './types/index.d.ts',
        import: './es/index.mjs'
    },
    './es/*/*.mjs': {
        types: './types/*/*.d.ts',
        import: './es/*/*.mjs'
    },
    './es/*': {
        types: ['./types/*/*.d.ts', './types/*/index.d.ts'],
        import: './es/*.mjs'
    },
    './*': './*'
};
fs.writeFileSync(outputpkg, JSON.stringify(pkgJson, null, 4));
clearPackageJson(outputpkg);