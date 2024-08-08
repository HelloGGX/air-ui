import { makeInstaller } from 'element-plus/es/make-installer';
import './theme/index.css';

import * as AirButton from '@air-ui/component/button';
import type { Plugin } from 'vue';

const Components = [AirButton.default] as Plugin[];
export { AirButton };
export const installer = makeInstaller([...Components]);
export const install = installer.install;
export const version = installer.version;
export default installer;
