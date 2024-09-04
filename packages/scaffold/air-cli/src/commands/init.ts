import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { MaterialType, VueComponentTemplate } from '../utils/types';

export default async function init(projectName: string): Promise<void> {
    const questions = [
        {
            type: 'list',
            name: 'materialType',
            message: 'What type of Vue material do you want to create?',
            choices: Object.values(MaterialType)
        }
    ];

    const answers: { materialType: MaterialType } = await inquirer.prompt(questions);

    const templatePath = path.join(__dirname, '../templates/vue-project-template');
    const targetPath = path.join(process.cwd(), projectName);

    try {
        await fs.copy(templatePath, targetPath);

        const packageJsonPath = path.join(targetPath, 'package.json');
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = projectName;
        packageJson.airMaterial = {
            type: answers.materialType
        };
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

        // Create Vue component file
        const componentTemplate: VueComponentTemplate = {
            template: '<div>{{ message }}</div>',
            script: `
import { defineComponent } from 'vue'

export default defineComponent({
  name: '${projectName}',
  data() {
    return {
      message: 'Hello from ${projectName}'
    }
  }
})`,
            style: 'div { font-weight: bold; }'
        };

        const componentContent = `
<template>
${componentTemplate.template}
</template>

<script lang="ts">
${componentTemplate.script}
</script>

<style scoped>
${componentTemplate.style}
</style>
`;

        const componentPath = path.join(targetPath, 'src', `${projectName}.vue`);
        await fs.writeFile(componentPath, componentContent);

        console.log(chalk.green(`Successfully created Vue project ${projectName}`));
    } catch (err) {
        console.error(chalk.red('Error creating project:'), err);
    }
}
