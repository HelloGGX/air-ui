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
            sideEffects: ['*.vue'],
            peerDependencies: {
                vue: '^3.3.0'
            }
        },
        null,
        4
    );
}
