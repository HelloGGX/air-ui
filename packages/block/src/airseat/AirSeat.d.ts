/**
 *
 * AirSeat
 *
 * @module AirSeat
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface AirSeatProps { title?: string; }
export interface AirSeatSlots { default(): VNode[]; }
export interface AirSeatEmitsOptions { click: (evt: MouseEvent) => void; }
export declare type AirSeatEmits = EmitFn<AirSeatEmitsOptions>;

declare const AirSeat: DefineComponent<AirSeatProps, AirSeatSlots, AirSeatEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirSeat: GlobalComponentConstructor<AirSeatProps, AirSeatSlots, AirSeatEmits>;
    }
}
    

export default AirSeat;
