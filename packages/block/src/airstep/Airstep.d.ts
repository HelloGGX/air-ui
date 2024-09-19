/**
 *
 * Airstep
 *
 * [在线演示](https://www.xxxx/)
 *
 * @module Airstep
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

/**
 * 定义Airstep组件的当前内联状态
 */
export interface AirstepState {
    /**
     * 当前id状态
     */
    id: string;
}

/**
 * 定义Airstep组件的有效属性
 */
export interface AirstepProps {
    /**
     * 组件标题
     */
    title?: string | undefined;
}

/**
 * 定义Airstep组件的有效插槽
 */
export interface AirstepSlots {
    /**
     * 自定义内容
     */
    default(): VNode[];
}

/**
 * 定义Airstep组件的有效事件
 */
export interface AirstepEmitsOptions {
    /**
     * 触发某事件时
     */
    click: () => void;
}

export declare type AirstepEmits = EmitFn<AirstepEmitsOptions>;

declare const Airstep: DefineComponent<AirstepProps, AirstepSlots, AirstepEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        Airstep: GlobalComponentConstructor<AirstepProps, AirstepSlots, AirstepEmits>;
    }
}

export default Airstep;
