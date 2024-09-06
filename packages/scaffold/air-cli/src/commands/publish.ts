import { execSync } from 'child_process';
import { confirm } from '@clack/prompts';

export async function publishProject() {
    console.log('Preparing to publish...');

    const shouldBuild = await confirm({ message: 'Do you want to run build before publishing?' });
    if (shouldBuild) {
        console.log('Running build...');
        execSync('npm run build', { stdio: 'inherit' });
    }

    const shouldScreenshot = await confirm({ message: 'Do you want to run screenshot before publishing?' });
    if (shouldScreenshot) {
        console.log('Running screenshot...');
        execSync('npm run screenshot', { stdio: 'inherit' });
    }

    console.log('Publishing to npm...');
    execSync('npm publish', { stdio: 'inherit' });

    console.log('Project published successfully!');
}
