interface TemplateParams {
    componentName: string;
    name: string;
}

export default function generateDts({ componentName }: TemplateParams): string {
    return `/**
 * ${componentName} 组件
 * @module ${componentName}
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface ${componentName}Props {
    /** 标题 */
    title?: string;
}

export interface ${componentName}Slots {
    default(): VNode[];
}

export interface ${componentName}EmitsOptions {
    /** 点击事件 */
    click: (evt: MouseEvent) => void;
}

export declare type ${componentName}Emits = EmitFn<${componentName}EmitsOptions>;

declare const ${componentName}: DefineComponent<${componentName}Props, ${componentName}Slots, ${componentName}Emits>;

declare module 'vue' {
    export interface GlobalComponents {
        ${componentName}: GlobalComponentConstructor<${componentName}Props, ${componentName}Slots, ${componentName}Emits>;
    }
}

export default ${componentName};`;
}