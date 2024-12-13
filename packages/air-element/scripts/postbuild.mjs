import fs from 'fs-extra';
import path from 'path';
import { clearPackageJson, resolvePath, updatePeerDependency } from '../../../scripts/build-helper.mjs';

const { __dirname, __workspace, OUTPUT_DIR } = resolvePath(import.meta.url);

fs.copySync(path.resolve(__dirname, '../package.json'), `${OUTPUT_DIR}/package.json`);
fs.copySync(path.resolve(__dirname, '../README.md'), `${OUTPUT_DIR}/README.md`);
// fs.copySync(path.resolve(__workspace, './LICENSE.md'), `${OUTPUT_DIR}/LICENSE.md`);

const outputpkg = path.resolve(__dirname, `../${OUTPUT_DIR}/package.json`);
// package.json
const pkgJson = JSON.parse(fs.readFileSync(outputpkg, { encoding: 'utf8', flag: 'r' }));

// 读取 theme 包的 package.json 获取版本号
updatePeerDependency(pkgJson, path.resolve(__workspace, 'packages/theme/package.json'));

pkgJson.main = 'lib/index.js';
pkgJson.module = 'es/index.mjs';
pkgJson.types = 'es/index.d.ts';
// Update exports field
pkgJson.exports = {
    '.': {
        types: './es/index.d.ts',
        import: './es/index.mjs'
    },
    './es/*.mjs': {
        types: './es/*.d.ts',
        import: './es/*.mjs'
    },
    './es/*': {
        types: ['./es/*.d.ts', './es/*/index.d.ts'],
        import: './es/*.mjs'
    },
    './es/components/*': {
        import: './es/components/*',
        types: './es/components/*'
    },
    './lib/*.js': {
        types: './lib/*.d.ts',
        require: './lib/*.js'
    },
    './lib/*': {
        types: ['./lib/*.d.ts', './lib/*/index.d.ts'],
        require: './lib/*.js'
    },
    './*': './*'
};
fs.writeFileSync(outputpkg, JSON.stringify(pkgJson, null, 4));
clearPackageJson(outputpkg);
