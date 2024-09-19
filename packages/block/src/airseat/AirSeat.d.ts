/**
 *
 * AirSeat
 *
 * [在线演示](https://www.xxxx/)
 *
 * @module AirSeat
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

/**
 * 定义AirSeat组件的当前内联状态
 */
export interface AirSeatState {
    /**
     * 当前id状态
     */
    id: string;
}

/**
 * 定义AirSeat组件的有效属性
 */
export interface AirSeatProps {
    /**
     * 组件标题
     */
    title?: string | undefined;
}

/**
 * 定义AirSeat组件的有效插槽
 */
export interface AirSeatSlots {
    /**
     * 自定义内容
     */
    default(): VNode[];
}

/**
 * 定义AirSeat组件的有效事件
 */
export interface AirSeatEmitsOptions {
    /**
     * 触发某事件时
     */
    click: () => void;
}

export declare type AirSeatEmits = EmitFn<AirSeatEmitsOptions>;

declare const AirSeat: DefineComponent<AirSeatProps, AirSeatSlots, AirSeatEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirSeat: GlobalComponentConstructor<AirSeatProps, AirSeatSlots, AirSeatEmits>;
    }
}

export default AirSeat;
