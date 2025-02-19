/**
 * AirBg 组件
 * @module AirBg
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface AirBgProps {
    /** 标题 */
    title?: string;
}

export interface AirBgSlots {
    default(): VNode[];
}

export interface AirBgEmitsOptions {
    /** 点击事件 */
    click: (evt: MouseEvent) => void;
}

export declare type AirBgEmits = EmitFn<AirBgEmitsOptions>;

declare const AirBg: DefineComponent<AirBgProps, AirBgSlots, AirBgEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirBg: GlobalComponentConstructor<AirBgProps, AirBgSlots, AirBgEmits>;
    }
}

export default AirBg;