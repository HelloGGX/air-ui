import { execSync } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { config } from '@/config';

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

const COMPONENTS_DIR = config.paths.components;
const DIST_DIR = config.paths.dist;

// 错误处理函数
function handleError(error: unknown) {
    if (error instanceof Error) {
        console.error('❌ 发布失败:', error.message);
    } else {
        console.error('❌ 发布失败: 未知错误');
    }
    process.exit(1);
}

export async function publish() {
    // 使用 src 目录而不是 dist 目录，因为我们需要先构建再发布
    const componentsDir = COMPONENTS_DIR;
    const components = fs.readdirSync(componentsDir).filter((name) => {
        const stats = fs.statSync(path.join(componentsDir, name));
        // 排除非目录和特殊文件/目录
        return stats.isDirectory() && !['theme', '.DS_Store'].includes(name);
    });

    const { component } = await inquirer.prompt([
        {
            type: 'list',
            name: 'component',
            message: '选择要发布的组件:',
            choices: components,
            filter: (input) => {
                // 过滤组件列表
                return components.filter((name) => name.toLowerCase().includes(input.toLowerCase()));
            },
            pageSize: 10,
            loop: false,
            when: () => components.length > 0,
        }
    ]);

    const componentSrcPath = path.join(componentsDir, component);
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
        // 确保组件目录存在
        if (!fs.existsSync(componentSrcPath)) {
            throw new Error(`组件 ${component} 目录不存在`);
        }

        // 构建特定组件
        console.log(`📦 正在构建组件 ${component}...`);
        execSync(`pnpm build`, {
            cwd: path.resolve(__dirname, '..'),
            stdio: 'inherit',
            env: {
                ...process.env,
                COMPONENT: component
            }
        });

        // 确保构建输出目录存在
        if (!fs.existsSync(componentDistPath)) {
            throw new Error(`组件 ${component} 构建失败，输出目录不存在`);
        }

        // 更新版本并发布
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
