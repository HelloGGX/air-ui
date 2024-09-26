/**
 *
 * Airstep
 *
 * @module Airstep
 *
 */
import type { DefineComponent, EmitFn, GlobalComponentConstructor } from '../index';
import { VNode } from 'vue';

interface stepObj {
    label?: string | undefined
}
export interface AirstepProps { active?: number | undefined; isCenter?: boolean | undefined; steps: Array<stepObj> | undefined }
export interface AirstepSlots { default(): VNode[]; }
export interface AirstepEmitsOptions { click: (evt: MouseEvent) => void; }
export declare type AirstepEmits = EmitFn<AirstepEmitsOptions>;

declare const Airstep: DefineComponent<AirstepProps, AirstepSlots, AirstepEmits>;

declare module 'vue' {
    export interface GlobalComponents {
        Airstep: GlobalComponentConstructor<AirstepProps, AirstepSlots, AirstepEmits>;
    }
}


export default Airstep;
