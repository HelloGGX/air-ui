import fs from 'fs-extra';
import path from 'path';
import {
    clearPackageJson,
    renameDTSFile,
    resolvePath,
    copyDependencies,
    updatePeerDependency
} from '../../../scripts/build-helper';

const { __dirname, __workspace, INPUT_DIR, OUTPUT_DIR } = resolvePath(import.meta.url);
const COMPONENT_NAME = process.env.COMPONENT_NAME;

if (INPUT_DIR && OUTPUT_DIR) {
    if (COMPONENT_NAME) {
        // 如果指定了组件名，只复制该组件的依赖
        const componentInputDir = path.join(INPUT_DIR, COMPONENT_NAME);
        const componentOutputDir = path.join(OUTPUT_DIR, COMPONENT_NAME);

        if (fs.existsSync(path.resolve(__dirname, '..', componentInputDir))) {
            // 确保输出目录存在
            fs.ensureDirSync(path.resolve(__dirname, '..', componentOutputDir));
            // 复制组件依赖
            copyDependencies(componentInputDir, componentOutputDir);
            // 重命名 DTS 文件
            renameDTSFile(path.join(OUTPUT_DIR, COMPONENT_NAME), 'index');
        }
    } else {
        fs.copySync(path.resolve(__dirname, '../package.json'), `${OUTPUT_DIR}/package.json`);
        // 处理所有组件
        copyDependencies(INPUT_DIR, OUTPUT_DIR);
        renameDTSFile(OUTPUT_DIR, 'index');

        const outputpkg = path.resolve(__dirname, `../${OUTPUT_DIR}/package.json`);
        // package.json
        const pkgJson = JSON.parse(fs.readFileSync(outputpkg, { encoding: 'utf8', flag: 'r' }));
        // 读取 theme 包的 package.json 获取版本号
        updatePeerDependency(pkgJson, path.resolve(__workspace, 'packages/theme/package.json'));

        fs.writeFileSync(outputpkg, JSON.stringify(pkgJson, null, 4));
        clearPackageJson(outputpkg);
    }
}
