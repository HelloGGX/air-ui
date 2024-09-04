import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { publishToNpm } from '../utils/npm';
import { PackageJson } from '../utils/types';

export default async function publish(): Promise<void> {
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    try {
        const packageJson: PackageJson = await fs.readJson(packageJsonPath);
        const { name, version, airMaterial } = packageJson;

        if (!airMaterial) {
            throw new Error('This is not a valid AirDesign material project');
        }

        // Publish to NPM
        await publishToNpm();

        // Register material in a hypothetical material registry
        const materialId = `${name}/${airMaterial.type}`;
        // TODO: Implement material registration logic

        console.log(chalk.green(`Successfully published material: ${materialId}@${version}`));
    } catch (err) {
        console.error(chalk.red('Error publishing material:'), err);
    }
}
