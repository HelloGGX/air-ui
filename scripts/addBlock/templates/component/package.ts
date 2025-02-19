interface TemplateParams {
    componentName: string;
    name: string;
}

export default function generatePackage({ componentName, name }: TemplateParams): string {
    return JSON.stringify(
        {
            name: `@air-ui/${name}`,
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
