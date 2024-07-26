const { join } = require('path');
const defaultConfig = require('../../../tailwind.config.js');

module.exports = {
  ...defaultConfig, // 继承全局配置
  purge: [
    join(__dirname, 'Button.vue'), // 指定需要扫描的文件路径
    join(__dirname, 'Button.stories.js'),
  ],
};
