import { config } from '../../lib/config';
import fs from 'fs';

interface TemplateParams {
    componentName: string;
}

function getPackagePrefix(): Promise<string> {
    const packageJson = fs.readFileSync(config.paths.packageJson, 'utf8');
    const { name } = JSON.parse(packageJson);
    return name.split('/')[0];
}

export default function generatePackage({ componentName }: TemplateParams): string {
    const prefix = getPackagePrefix();
    const name = componentName.toLocaleLowerCase();
    return JSON.stringify(
        {
            name: `${prefix}/${name}`,
            version: '0.0.0',
            main: `./${componentName}.vue`,
            types: `./${componentName}.d.ts`,
            module: `./${componentName}.vue`,
            sideEffects: ['*.vue', '*.css'],
            peerDependencies: {
                vue: '^3.3.0',
                '@element-plus/icons-vue': '^2.3.1',
                'element-plus': '^2.9.3'
            }
        },
        null,
        4
    );
}
