import * as fs from 'fs-extra';
import * as path from 'path';
import { Generator } from './generator';

export async function createBusinessComponent(
    componentName: string,
    useTailwindCSS: boolean,
    componentLibrary: string
) {
    const generator = new Generator(componentName, {
        useTailwindCSS,
        componentLibrary
    });
    await generator.generate();
}

export async function createMonorepoProject(projectName: string) {
    const templatePath = path.join(__dirname, '../templates/vue-monorepo');
    const targetPath = path.join(process.cwd(), projectName);

    await fs.copy(templatePath, targetPath);
    console.log(`Monorepo project "${projectName}" created successfully.`);
}
