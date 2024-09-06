#!/usr/bin/env node
import { intro, outro } from '@clack/prompts';
import { createComponent, createProject } from './commands/create';
import { buildProject } from './commands/build';
import { publishProject } from './commands/publish';
import * as color from 'picocolors';

async function main() {
    intro(color.cyan('欢迎使用cuss团队air-cli'));

    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'init':
            await createProject();
            break;
        case 'add':
            await createComponent();
            break;
        case 'build':
            await buildProject();
            break;
        case 'publish':
            await publishProject();
            break;
        default:
            console.log('Invalid command. Available commands: init, build, publish');
    }

    outro(color.green('感谢使用air-cli!'));
}

main().catch(console.error);
