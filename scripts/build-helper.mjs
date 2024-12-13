import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * 解析路径并返回相关目录和环境变量。
 *
 * @param {string} metaUrl - 当前模块的元 URL，用于解析目录。
 * @returns {Object} 包含当前目录、工作区、输入和输出路径的对象。
 */
export function resolvePath(metaUrl) {
    const __dirname = path.dirname(fileURLToPath(metaUrl || import.meta.url));
    const __workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../');
    const { INPUT_DIR, OUTPUT_DIR } = process.env;
    const INPUT_PATH = path.resolve(__dirname, process.env.INPUT_DIR);
    const OUTPUT_PATH = path.resolve(__dirname, process.env.OUTPUT_DIR);

    return {
        __dirname,
        __workspace,
        INPUT_DIR,
        OUTPUT_DIR,
        INPUT_PATH,
        OUTPUT_PATH
    };
}

/**
 * 删除构建输出目录。
 *
 * @param {string} metaUrl - 当前模块的元 URL，用于解析输出目录。
 */
export function removeBuild(metaUrl) {
    const { OUTPUT_DIR } = resolvePath(metaUrl);
    fs.remove(OUTPUT_DIR);
}

/**
 * 更新本地 package.json 文件的内容。
 *
 * @param {string} localPackageJson - 本地 package.json 文件的路径。
 */
export function updatePackageJson(localPackageJson) {
    const { __workspace } = resolvePath();
    const packageJson = JSON.parse(
        fs.readFileSync(path.resolve(__workspace, './package.json'), { encoding: 'utf8', flag: 'r' })
    );
    const pkg = JSON.parse(fs.readFileSync(localPackageJson, { encoding: 'utf8', flag: 'r' }));

    pkg.version = packageJson.version;
    pkg.author = packageJson.author;
    pkg.homepage = packageJson.homepage;
    pkg.license = packageJson.license;
    pkg.repository = { ...pkg.repository, ...packageJson.repository };
    pkg.bugs = { ...pkg.bugs, ...packageJson.bugs };
    pkg.engines = { ...pkg.engines, ...packageJson.engines };

    fs.writeFileSync(localPackageJson, JSON.stringify(pkg, null, 4));
}

/**
 * 清除本地 package.json 文件中的不必要字段。
 *
 * @param {string} localPackageJson - 本地 package.json 文件的路径。
 */
export function clearPackageJson(localPackageJson) {
    const pkg = JSON.parse(fs.readFileSync(localPackageJson, { encoding: 'utf8', flag: 'r' }));

    delete pkg?.scripts;
    delete pkg?.devDependencies;
    delete pkg?.publishConfig?.directory;
    delete pkg?.publishConfig?.linkDirectory;

    fs.writeFileSync(localPackageJson, JSON.stringify(pkg, null, 4));
}

/**
 * 复制指定文件夹中的依赖项到目标文件夹。
 *
 * @param {string} inFolder - 源文件夹路径，包含要复制的文件。
 * @param {string} outFolder - 目标文件夹路径，文件将被复制到此处。
 * @param {string} [subFolder] - 可选的子文件夹路径，仅在源路径包含该子文件夹时复制。
 *
 * 该函数会递归遍历源文件夹中的所有文件和子文件夹，
 * 仅复制以 .d.ts、.vue 或 .scss 结尾的文件。
 * 如果指定了子文件夹，则只复制该子文件夹中的文件。
 */
export function copyDependencies(inFolder, outFolder, subFolder) {
    fs.readdirSync(inFolder, { withFileTypes: true }).forEach((entry) => {
        const fileName = entry.name;
        const sourcePath = path.join(inFolder, fileName);
        const destPath = path.join(outFolder, fileName);

        if (entry.isDirectory()) {
            copyDependencies(sourcePath, destPath, subFolder);
        } else {
            if (fileName.endsWith('d.ts') || fileName.endsWith('.vue') || fileName.endsWith('.scss')) {
                if (subFolder && sourcePath.includes(subFolder)) {
                    const subDestPath = path.join(outFolder, fileName.replace(subFolder, ''));

                    fs.ensureDirSync(path.dirname(subDestPath));
                    fs.copyFileSync(sourcePath, subDestPath);
                } else {
                    fs.ensureDirSync(path.dirname(destPath));
                    fs.copyFileSync(sourcePath, destPath);
                }
            }
        }
    });
}

/**
 * 重命名指定目录中的所有 .d.ts 文件。
 *
 * @param {string} dir - 目标目录。
 * @param {string} newName - 新的文件名（不带扩展名）。
 */
export async function renameDTSFile(dir, newName) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await renameDTSFile(fullPath, newName);
        } else if (entry.name.endsWith('.d.ts')) {
            const newFullPath = path.join(dir, `${newName}.d.ts`);

            await fs.rename(fullPath, newFullPath);
        }
    }
}

/**
 * 更新指定包的 peerDependencies 版本。
 *
 * @param {Object} pkgJson - 要更新的 package.json 对象。
 * @param {string} packageName - 要更新的包名。
 * @param {string} packagePath - 包的路径，用于读取版本信息。
 */
export async function updatePeerDependency(pkgJson, packageName, packagePath) {
    const packageData = JSON.parse(fs.readFileSync(packagePath, { encoding: 'utf8', flag: 'r' }));
    const version = packageData.version;

    if (pkgJson.peerDependencies && pkgJson.peerDependencies[packageName]) {
        pkgJson.peerDependencies[packageName] = `^${version}`;
    }
}
