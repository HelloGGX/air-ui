/* eslint-disable @typescript-eslint/no-require-imports */
import { airCLI } from '@/core/index';
import addComponentCmd from '@/commands/add/commands';
import initCmd from '@/commands/init/commands';
import publishCmd from '@/commands/publish/commands';

// Evaluated at runtime to grab the current lerna version
const pkg = require('../package.json');

// 解析命令行参数并注册命令
export default function main(argv: NodeJS.Process["argv"]) {
    const context = {
        airVersion: pkg.version
    };
    
    const cli = airCLI()
        .command(initCmd)
        .command(addComponentCmd)
        .command(publishCmd);

    return cli.parse(argv, context);
};
