import { makeInstaller } from 'element-plus/es/make-installer';
import './theme/index.css';

import { AirButton } from '@air-ui/component/button';
import type { Plugin } from 'vue';

const Components = [AirButton] as Plugin[];

export const installer = makeInstaller([...Components]);
export const install = installer.install;
export const version = installer.version;
export default installer;
