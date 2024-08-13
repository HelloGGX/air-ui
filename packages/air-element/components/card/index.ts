import { withInstall } from 'element-plus/es/utils/vue/install';
import Card from './Card.vue';
import '@air-ui/air-element/theme/base.css';
import '@air-ui/air-element/theme/card.css';

export const AirCard = withInstall(Card);
export default AirCard;

export * from './Card';
