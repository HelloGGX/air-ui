/**
 * @module AirCard
 */

import type { VNode } from 'vue';
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';

/**
 * 定义 AirCard 组件的当前上下文
 */
export interface AirCardContext {
    /**
     * 组件的当前状态
     */
    state: AirCardState;
}

/**
 * 定义 AirCard 组件的当前内联状态
 */
export interface AirCardState {
    /**
     * 当前id状态
     */
    id: string;
}

/**
 * 定义 AirCard 组件的有效属性
 */
export interface AirCardProps {
    /**
     * 卡片序号
     */
    num?: number | undefined;
    /**
     * 显示的姓名
     */
    name?: string | undefined;
    /**
     * 显示的座位号
     */
    seatNum?: string | undefined;
    /**
     * 卡片高度
     */
    height?: string | undefined;
    /**
     * 是否显示关闭按钮
     * @defaultValue false
     */
    showClose?: boolean | undefined;
}

export interface AirCardSlots {}

/**
 * 定义 AirCard 组件的有效事件
 */
export interface AirCardEmitsOptions {
    /**
     * 点击关闭按钮时触发
     */
    close: () => void;
    /**
     * 点击卡片时触发
     */
    select: () => void;
}

export declare type AirCardEmits = EmitFn<AirCardEmitsOptions>;

declare const AirCard: DefineComponent<AirCardProps, AirCardSlots, AirCardEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirCard: GlobalComponentConstructor<AirCardProps, AirCardSlots, AirCardEmits>;
    }
}

export default AirCard;
