import { exec } from 'child_process';
import chalk from 'chalk';

export function publishToNpm(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec('npm publish', (error, stdout, stderr) => {
            if (error) {
                console.error(chalk.red('Error publishing to NPM:'), stderr);
                reject(error);
            } else {
                console.log(chalk.green('Successfully published to NPM'));
                resolve(stdout);
            }
        });
    });
}

export function installPackage(packageName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`npm install ${packageName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(chalk.red(`Error installing package ${packageName}:`), stderr);
                reject(error);
            } else {
                console.log(chalk.green(`Successfully installed ${packageName}`));
                resolve(stdout);
            }
        });
    });
}
