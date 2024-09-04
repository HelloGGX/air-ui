import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { installPackage } from '../utils/npm';

export default async function use(materialId: string): Promise<void> {
    const [packageName, componentName] = materialId.split('/');

    try {
        // Install the package
        await installPackage(packageName);

        const questions = [
            {
                type: 'confirm',
                name: 'fork',
                message: 'Do you want to fork this Vue material for customization?',
                default: false
            }
        ];

        const answers: { fork: boolean } = await inquirer.prompt(questions);

        if (answers.fork) {
            // Fork the material
            const sourcePath = path.join('node_modules', packageName, 'src', `${componentName}.vue`);
            const targetPath = path.join('src', 'components', `${componentName}.vue`);
            await fs.copy(sourcePath, targetPath);
            console.log(chalk.green(`Forked ${componentName} to ${targetPath}`));
        } else {
            // Add import statement to a main file (e.g., main.ts)
            const mainFilePath = path.join('src', 'main.ts');
            const importStatement = `import ${componentName} from '${packageName}';\n`;
            const useStatement = `app.component('${componentName}', ${componentName});\n`;
            await fs.appendFile(mainFilePath, importStatement + useStatement);
            console.log(chalk.green(`Added import and use statements for ${componentName} in main.ts`));
        }

        console.log(chalk.green(`Successfully added Vue material: ${materialId}`));
    } catch (err) {
        console.error(chalk.red('Error using material:'), err);
    }
}
