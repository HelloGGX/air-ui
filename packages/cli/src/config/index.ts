import path from 'path';
import { fileURLToPath } from 'url';

let WORKSPACE_ROOT: string;

// 获取当前文件和目录
const CURRENT_FILE = fileURLToPath(import.meta.url);
const CURRENT_DIR = path.dirname(CURRENT_FILE);

// 构建路径的辅助函数
const buildPath = (relativePath: string) => path.resolve(WORKSPACE_ROOT, relativePath);

// 设置工作空间根目录
export const setWorkspaceRoot = (root: string) => {
    WORKSPACE_ROOT = root;
};

// 获取工作空间的 package.json 路径
export const getWorkspacePackageJsonPath = () => path.resolve(WORKSPACE_ROOT, 'package.json');

// 常量定义
const COMPONENTS_DIR = buildPath('block/src');
const DIST_DIR = buildPath('block/dist');
const THEME_DIR = buildPath('theme');
const BLOCK_PACKAGE_JSON = buildPath('block/package.json');
const THEME_PACKAGE_JSON = buildPath('theme/package.json');

// 配置对象
export const config = {
    setWorkspaceRoot, // 导出设置工作空间根目录的方法
    paths: {
        theme: THEME_DIR,
        components: COMPONENTS_DIR,
        dist: DIST_DIR,
        airblocks: buildPath('block/src/airblocks.js'),
        templates: path.resolve(CURRENT_DIR, '../templates/block'),
        blockPackageJson: BLOCK_PACKAGE_JSON,
        themePackageJson: THEME_PACKAGE_JSON,
        packageJson: getWorkspacePackageJsonPath() // 这里可以使用函数调用
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
    templateRepo: 'https://github.com/HelloGGX/air-block.git',
    defaultRegistry: 'http://172.24.136.12:8081/repository/air-ui',
    fileExtensions: {
        vue: 'vue',
        stories: 'stories.ts',
        dts: 'd.ts',
        package: 'json'
    },
    componentTypes: [
        '基础组件', '布局组件', '表单组件', '数据展示', '导航组件',
        '反馈组件', '信息组件', '图表组件', '工具组件', '业务组件',
        '动画组件', '交互组件', '卡片组件', '模态框组件', '标签组件',
        '轮播组件', '树形组件', '日历组件', '图像组件', '视频组件',
        '图标组件'
    ],
    businessScenes: [
        '值机', '选座', '支付', '行李', '登机',
        '航班信息', '乘客信息', '舱位选择', '餐食服务', '特殊服务',
        '改签服务', '退票服务', '会员服务', '通用', '客户支持',
        '投诉处理', '信息查询', '活动管理', '数据分析', '报告生成'
    ]
};
