import fs from 'fs-extra';
import path from 'path';
import {
    clearPackageJson,
    renameDTSFile,
    resolvePath,
    copyDependencies,
    updatePeerDependency
} from '../../../scripts/build-helper.mjs';

const { __dirname, __workspace, INPUT_DIR, OUTPUT_DIR } = resolvePath(import.meta.url);

fs.copySync(path.resolve(__dirname, '../package.json'), `${OUTPUT_DIR}/package.json`);
copyDependencies(INPUT_DIR, OUTPUT_DIR);
renameDTSFile(OUTPUT_DIR, 'index');

const outputpkg = path.resolve(__dirname, `../${OUTPUT_DIR}/package.json`);
// package.json
const pkgJson = JSON.parse(fs.readFileSync(outputpkg, { encoding: 'utf8', flag: 'r' }));

// 读取 theme 包的 package.json 获取版本号
const themePkgPath = path.resolve(__workspace, 'packages/theme/package.json');
updatePeerDependency(pkgJson, '@air-ui/theme', themePkgPath);

// 读取 air-element 包的 package.json 获取版本号
const airElementPkgPath = path.resolve(__workspace, 'packages/air-element/package.json');
updatePeerDependency(pkgJson, '@air-ui/air-element', airElementPkgPath);

fs.writeFileSync(outputpkg, JSON.stringify(pkgJson, null, 4));
clearPackageJson(outputpkg);
