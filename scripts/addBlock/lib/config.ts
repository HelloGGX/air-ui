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
