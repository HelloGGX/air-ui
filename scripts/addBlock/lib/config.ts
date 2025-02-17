import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = fileURLToPath(new URL('../../../', import.meta.url));

export const config = {
    paths: {
        components: path.resolve(ROOT_DIR, 'packages/block/src'),
        airblocks: path.resolve(ROOT_DIR, 'packages/block/src/airblocks.js'),
        templates: path.resolve(ROOT_DIR, 'scripts/addBlock/templates')
    },
    validation: {
        namePattern: /^[A-Z][a-zA-Z0-9]*$/,
        nameMessage: '名称必须以大写字母开头的驼峰格式 (例如: MyButton)'
    },
    types: {
        component: {
            name: '组件 (Component)',
            value: 'component',
            files: ['vue', 'stories', 'dts', 'package']
        },
        snippet: {
            name: 'HTML 代码片段 (Snippet)',
            value: 'snippet',
            files: ['stories']
        }
    },
    fileExtensions: {
        vue: 'vue',
        stories: 'stories.ts',
        dts: 'd.ts',
        package: 'json'
    }
};
