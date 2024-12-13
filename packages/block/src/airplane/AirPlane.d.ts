/**
 *
 * AirPlane
 *
 * @module AirPlane
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface AirPlaneProps { title?: string; }
export interface AirPlaneSlots { default(): VNode[]; }
export interface AirPlaneEmitsOptions { click: (evt: MouseEvent) => void; }
export declare type AirPlaneEmits = EmitFn<AirPlaneEmitsOptions>;

declare const AirPlane: DefineComponent<AirPlaneProps, AirPlaneSlots, AirPlaneEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirPlane: GlobalComponentConstructor<AirPlaneProps, AirPlaneSlots, AirPlaneEmits>;
    }
}
    

export default AirPlane;
