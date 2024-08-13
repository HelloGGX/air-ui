import type { NormalizedOutputOptions } from 'rollup';
import path from 'path';
import fs from 'fs-extra';

export async function updatePackageJson({ inputPath, outputPath }: { inputPath: string; outputPath: string }) {
    return {
        name: 'update-packageJson',
        async writeBundle(options: NormalizedOutputOptions) {
            try {
                const outputDir = options.dir || '.';
                //  获取输入输出目录
                const packageJsonPath = path.resolve(outputPath, 'package.json');
                // // 如果 package.json 不存在，则从输入目录复制
                !fs.existsSync(packageJsonPath) && fs.copySync(path.resolve(inputPath, '../package.json'), packageJsonPath);

                // // 读取并解析 package.json
                const pkg = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8', flag: 'r' }));
                const relativePath = path.relative(outputPath, outputDir);

                pkg.main = `${relativePath}/index.mjs`;
                pkg.module = `${relativePath}/index.mjs`;
                pkg.types = `types/index.d.ts`;
                pkg.exports = {
                    '.': {
                        types: './types/index.d.ts',
                        import: `./${relativePath}/index.mjs`
                    },
                    './es': {
                        types: './types/index.d.ts',
                        import: `./${relativePath}/index.mjs`
                    },
                    './es/*/*.mjs': {
                        types: './types/*/*.d.ts',
                        import: `./${relativePath}/*/*.mjs`
                    },
                    './es/*': {
                        types: ['./types/*/*.d.ts', './types/*/index.d.ts'],
                        import: `./${relativePath}/*.mjs`
                    },
                    './*': './*'
                };

                // 写入修改后的 package.json
                fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 4));
            } catch (error) {
                console.error('Error in packageJsonPlugin:', error);
            }
        }
    };
}
