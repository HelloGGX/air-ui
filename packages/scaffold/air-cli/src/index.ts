#!/usr/bin/env node

import { program } from 'commander';
import init from './commands/init';
import publish from './commands/publish';
import use from './commands/use';

program.version('1.0.0').description('AirDesign Material CLI');

program.command('init <projectName>').description('Initialize a new AirDesign material project').action(init);

program.command('publish').description('Publish a material').action(publish);

program.command('use <materialId>').description('Use a material in your project').action(use);

program.parse(process.argv);
