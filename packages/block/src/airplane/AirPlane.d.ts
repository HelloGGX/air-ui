/**
 *
 * AirPlane
 *
 * @module AirPlane
 *
 */
import type { ISeat } from '../airseat/AirSeat';
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

export interface AirPlaneProps {
    seatData: {
        openSymbol: string;
        defaultShowLevel: string;
        lower: ISeat[][] | null;
        upper: ISeat[][] | null;
    };
}
export interface AirPlaneSlots {
    default(): VNode[];
}
export interface AirPlaneEmitsOptions {
    click: (evt: MouseEvent) => void;
}
export declare type AirPlaneEmits = EmitFn<AirPlaneEmitsOptions>;

declare const AirPlane: DefineComponent<AirPlaneProps, AirPlaneSlots, AirPlaneEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        AirPlane: GlobalComponentConstructor<AirPlaneProps, AirPlaneSlots, AirPlaneEmits>;
    }
}

export default AirPlane;
