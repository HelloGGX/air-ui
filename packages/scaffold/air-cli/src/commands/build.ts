import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

export async function buildProject() {
    console.log('Building project...');

    if (existsSync('pnpm-workspace.yaml')) {
        console.log('Detected pnpm workspace, building all packages...');
        execSync('pnpm run build -r', { stdio: 'inherit' });
    } else {
        console.log('Building single package...');
        execSync('npm run build', { stdio: 'inherit' });
    }

    console.log('Build completed.');

    // Check for required directories
    const requiredDirs = ['es', 'lib', 'artifacts'];
    const missingDirs = requiredDirs.filter((dir) => !existsSync(join(process.cwd(), dir)));

    if (missingDirs.length > 0) {
        console.warn(`Warning: The following directories are missing: ${missingDirs.join(', ')}`);
    } else {
        console.log('All required directories are present.');
    }
}
