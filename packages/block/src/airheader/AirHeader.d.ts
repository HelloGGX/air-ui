/**
 *
 * AirHeader
 *
 * [在线演示](https://www.xxxx/)
 *
 * @module AirHeader
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '@air-ui/block/core';
import { VNode } from 'vue';

/**
 * 定义AirHeader组件的当前内联状态
 */
export interface AirHeaderState {
    /**
     * 当前id状态
     */
    id: string;
}

/**
 * 定义AirHeader组件的有效属性
 */
export interface AirHeaderProps {
    /**
     * 头部标题
     */
    title?: string | undefined;
    /**
     * 头部副标题
     */
    subtitle?: string | undefined;
    /**
     * 是否固定在顶部
     * @defaultValue false
     */
    fixed?: boolean | undefined;
    /**
     * 头部高度
     * @defaultValue '60px'
     */
    height?: string | undefined;
    /**
     * 头部背景色
     */
    backgroundColor?: string | undefined;
    /**
     * 头部文字颜色
     */
    textColor?: string | undefined;
    /**
     * 是否显示返回按钮
     * @defaultValue false
     */
    showBack?: boolean | undefined;
}

/**
 * 定义AirHeader组件的有效插槽
 */
export interface AirHeaderSlots {
    /**
     * 自定义左侧内容
     */
    left(): VNode[];
    /**
     * 自定义中间内容
     */
    default(): VNode[];
    /**
     * 自定义右侧内容
     */
    right(): VNode[];
}

/**
 * 定义AirHeader组件的有效事件
 */
export interface AirHeaderEmitsOptions {
    /**
     * 点击返回按钮时触发
     */
    back: () => void;
}

export declare type AirHeaderEmits = EmitFn<AirHeaderEmitsOptions>;

declare const AirHeader: DefineComponent<AirHeaderProps, AirHeaderSlots, AirHeaderEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirHeader: GlobalComponentConstructor<AirHeaderProps, AirHeaderSlots, AirHeaderEmits>;
    }
}

export default AirHeader;
