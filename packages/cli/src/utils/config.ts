import path from 'path';
import { fileURLToPath } from 'url';
import { findUpSync } from 'find-up';

const CURRENT_FILE = fileURLToPath(import.meta.url);
const CURRENT_DIR = path.dirname(CURRENT_FILE);
const WORKSPACE_ROOT = path.dirname(findUpSync('pnpm-workspace.yaml', { cwd: CURRENT_DIR }) || CURRENT_DIR);
const ROOT_DIR = path.resolve(WORKSPACE_ROOT, 'packages/block');

export const config = {
    paths: {
        components: path.resolve(ROOT_DIR, 'src'),
        dist: path.resolve(ROOT_DIR, 'dist'),
        airblocks: path.resolve(ROOT_DIR, 'src/airblocks.js'),
        templates: path.resolve(CURRENT_DIR, '../templates/block'),
        packageJson: path.resolve(ROOT_DIR, 'package.json')
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
    } as const,
    templateRepo: 'https://github.com/HelloGGX/air-block.git',
    defaultRegistry: 'http://172.24.136.12:8081/repository/air-ui',
    fileExtensions: {
        vue: 'vue',
        stories: 'stories.ts',
        dts: 'd.ts',
        package: 'json'
    },
    componentTypes: [
        '基础组件',
        '布局组件',
        '表单组件',
        '数据展示',
        '导航组件',
        '反馈组件',
        '信息组件',
        '图表组件',
        '工具组件',
        '业务组件',
        '动画组件',
        '交互组件'
    ],
    businessScenes: [
        '值机',
        '选座',
        '支付',
        '行李',
        '登机',
        '航班信息',
        '乘客信息',
        '舱位选择',
        '餐食服务',
        '特殊服务',
        '改签服务',
        '退票服务',
        '会员服务',
        '通用'
    ]
};
