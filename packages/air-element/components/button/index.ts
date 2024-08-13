import { withInstall } from 'element-plus/es/utils/vue/install';
import Button from './Button.vue';
import '@air-ui/air-element/theme/base.css';
import '@air-ui/air-element/theme/button.css';

export const AirButton = withInstall(Button);
export default AirButton;

export * from './Button';
