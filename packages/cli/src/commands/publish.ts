import { execSync } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { config } from '@/config';
import autocomplete from 'inquirer-autocomplete-prompt';

inquirer.registerPrompt('autocomplete', autocomplete);
const COMPONENTS_DIR = config.paths.components();
const DIST_DIR = config.paths.blockDist();
const ERROR_MESSAGES = {
    COMPONENT_NOT_FOUND: '组件目录不存在',
    BUILD_FAILED: '组件构建失败，输出目录不存在',
    UNKNOWN_ERROR: '未知错误'
};

/**
 * - patch: 修复版本 (1.0.0 -> 1.0.1)
- minor: 特性版本 (1.0.0 -> 1.1.0)
- major: 主版本 (1.0.0 -> 2.0.0)
- prerelease: 预发布版本 (1.0.0 -> 1.0.1-beta.0)
- prepatch: 预修复版本 (1.0.0 -> 1.0.1-beta.0)
- preminor: 预特性版本 (1.0.0 -> 1.1.0-beta.0)
- premajor: 预主版本 (2.0.0-beta.0)
 * @param currentVersion 
 * @returns 
 */
async function getNextVersions(currentVersion: string) {
    const versions = {
        patch: semver.inc(currentVersion, 'patch'),
        minor: semver.inc(currentVersion, 'minor'),
        major: semver.inc(currentVersion, 'major'),
        prerelease: semver.inc(currentVersion, 'prerelease', 'beta'),
        prepatch: semver.inc(currentVersion, 'prepatch', 'beta'),
        preminor: semver.inc(currentVersion, 'preminor', 'beta'),
        premajor: semver.inc(currentVersion, 'premajor', 'beta')
    };

    return Object.entries(versions).map(([type, version]) => ({
        name: `${type} (${version})`,
        value: version
    }));
}

// 错误处理函数
function handleError(error: unknown) {
    const message = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
    console.error('❌ 发布失败:', message);
    process.exit(1);
}

// 确保组件目录存在
async function ensureComponentExists(componentSrcPath: string) {
    if (!fs.existsSync(componentSrcPath)) {
        throw new Error(ERROR_MESSAGES.COMPONENT_NOT_FOUND);
    }
}

// 构建组件
async function buildComponent(component: string) {
    console.log(`📦 正在构建组件 ${component}...`);
    execSync(`npm run build`, {
        cwd: path.dirname(config.paths.blockPackageJson()),
        stdio: 'inherit'
    });
}

// 发布组件
export async function publish() {
    const components = fs.readdirSync(COMPONENTS_DIR).filter((name) => {
        const componentDir = path.join(COMPONENTS_DIR, name);
        const stats = fs.statSync(componentDir);
        // 过滤掉非目录和没有 package.json 的组件
        return stats.isDirectory() && fs.existsSync(path.join(componentDir, 'package.json'));
    });

    const { component } = await inquirer.prompt([
        {
            type: 'autocomplete', // 修改类型为 autocomplete
            name: 'component',
            message: '选择要发布的组件:',
            source: (answers: unknown, input: string) => {
                // 根据输入过滤选项（不区分大小写）
                input = input || '';
                return new Promise((resolve) => {
                    const filtered = components.filter((component) =>
                        component.toLowerCase().includes(input.toLowerCase())
                    );
                    resolve(filtered);
                });
            }
        }
    ]);
    const componentSrcPath = path.join(COMPONENTS_DIR, component);
    const componentDistPath = path.join(DIST_DIR, component);
    const componentPackageJson = path.join(componentSrcPath, 'package.json');
    const currentVersion = JSON.parse(fs.readFileSync(componentPackageJson, 'utf-8')).version || '0.0.0';

    const { version } = await inquirer.prompt([
        {
            type: 'list',
            name: 'version',
            message: '选择版本更新类型:',
            choices: await getNextVersions(currentVersion),
            pageSize: 10
        }
    ]);

    try {
        await ensureComponentExists(componentSrcPath);
        await buildComponent(component);

        if (!fs.existsSync(componentDistPath)) {
            throw new Error(ERROR_MESSAGES.BUILD_FAILED);
        }

        console.log(`📤 正在发布组件 ${component} v${version}...`);
        execSync(`npm version ${version} --no-git-tag-version && npm publish`, {
            cwd: componentDistPath,
            stdio: 'inherit'
        });

        console.log(`✨ 组件 ${component} 发布成功！`);
    } catch (error) {
        handleError(error);
    }
}
