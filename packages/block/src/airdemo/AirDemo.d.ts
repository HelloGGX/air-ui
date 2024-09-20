/**
 *
 * AirDemo
 *
 * @module AirDemo
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface AirDemoProps { title?: string; }
export interface AirDemoSlots { default(): VNode[]; }
export interface AirDemoEmitsOptions { click: (evt: MouseEvent) => void; }
export declare type AirDemoEmits = EmitFn<AirDemoEmitsOptions>;

declare const AirDemo: DefineComponent<AirDemoProps, AirDemoSlots, AirDemoEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirDemo: GlobalComponentConstructor<AirDemoProps, AirDemoSlots, AirDemoEmits>;
    }
}
    

export default AirDemo;
