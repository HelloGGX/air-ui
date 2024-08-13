import type { ExtractPropTypes } from 'vue';
import { buildProps } from 'element-plus/es/utils/vue/props/runtime';
import { iconPropType } from 'element-plus/es/utils/vue/icon';
import { useSizeProp } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';

export const cardTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger'] as const;

export const cardProps = buildProps({
    /**
     * @description Card size
     * @type {string}
     * @values 'small', 'default', 'large'
     */
    size: useSizeProp,
    /**
     * @description disable the card
     */
    disabled: Boolean,
    /**
     * @description card type
     */
    type: {
        type: String,
        values: cardTypes,
        default: 'primary'
    },
    /**
     * @description determine whether it's loading
     */
    loading: Boolean,
    /**
     * @description customize loading icon component
     */
    loadingIcon: {
        type: iconPropType,
        default: () => Loading
    }
} as const);

export const cardEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent
};

export type CardProps = ExtractPropTypes<typeof cardProps>;
export type CardEmits = typeof cardEmits;

export type CardType = CardProps['type'];

export interface CardConfigContext {
    autoInsertSpace?: boolean;
}
