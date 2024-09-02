import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// 获取所有区块目录
const packagesDir = resolve(__dirname, 'src');
const blockDirs = readdirSync(packagesDir);

// 生成每个区块的配置
const configs = blockDirs.map((blockDir) => {
    const packageDir = resolve(packagesDir, blockDir);
    return defineConfig({
        plugins: [vue()],
        build: {
            lib: {
                entry: resolve(packageDir, 'index.ts'),
                name: blockDir.charAt(0).toUpperCase() + blockDir.slice(1),
                fileName: (format) => `${blockDir}.${format}.js`
            },
            rollupOptions: {
                external: ['vue', '@air-ui/air-element'],
                output: {
                    globals: {
                        vue: 'Vue',
                        '@air-ui/air-element': 'AirElement'
                    }
                }
            }
        }
    });
});

export default configs;
