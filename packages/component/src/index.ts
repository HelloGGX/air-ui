import { makeInstaller } from "element-plus/es/make-installer";
import { AirButton } from "./button";
import type { App, Plugin } from "vue";

const Components = [AirButton] as Plugin[];

export * from './button';
export default makeInstaller([...Components]);
