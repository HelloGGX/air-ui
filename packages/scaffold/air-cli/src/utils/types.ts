export enum MaterialType {
    Component = 'Component',
    Block = 'Block',
    Page = 'Page'
}

export interface PackageJson {
    name: string;
    version: string;
    airMaterial?: {
        type: MaterialType;
    };
}

export interface VueComponentTemplate {
    template: string;
    script: string;
    style: string;
}

export type GeneratorContext = {
    path: string;
    name: string;
    packageName: string;
    templateArgs: Record<string, any>;
    version: string;
    description: string;
};

export type TemplateFunction = (context: GeneratorContext) => false | { filename: string; contents: string };
