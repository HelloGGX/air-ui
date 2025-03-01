#!/usr/bin/env node

'use strict';
import { fileURLToPath } from 'node:url';
import importLocal from 'import-local';
import main from './index';

const __filename = fileURLToPath(import.meta.url);
//优先使用本地版本：如果当前项目中安装了本地版本的依赖包，import-local 会返回 true，并加载本地版本。
if (importLocal(__filename)) {
    // Minimal standalone log function to avoid needing to import full Logger
    function minimalInfoLog(prefix: string, message: string) {
        const stream = process.stderr;
        const green = '\x1b[32m';
        const magenta = '\x1b[35m';
        const reset = '\x1b[0m';
        const useColor = stream.isTTY;

        let output = '';

        if (useColor) {
            output += green; // Info level color
        }
        output += 'info';
        if (useColor) {
            output += reset;
        }

        if (prefix) {
            output += ' ';
            if (useColor) {
                output += magenta; // Prefix color
            }
            output += prefix;
            if (useColor) {
                output += reset;
            }
        }

        output += ' ' + message;

        stream.write(output + '\n');
    }
    minimalInfoLog('cli', '正在使用本地版本的air-cli');
} else {
    main(process.argv.slice(2));
}
