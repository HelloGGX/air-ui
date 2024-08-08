import type { ExtractPropTypes } from 'vue';
import { buildProps, iconPropType } from 'element-plus/es/utils/vue';
import { useSizeProp } from 'element-plus/es/hooks/use-size';
import { Loading } from '@element-plus/icons-vue';

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger'] as const;

export const buttonProps = buildProps({
    /**
     * @description Button size
     * @type {string}
     * @values 'small', 'default', 'large'
     */
    size: useSizeProp,
    /**
     * @description disable the button
     */
    disabled: Boolean,
    /**
     * @description button type
     */
    type: {
        type: String,
        values: buttonTypes,
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

export const buttonEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;

export type ButtonType = ButtonProps['type'];

export interface ButtonConfigContext {
    autoInsertSpace?: boolean;
}
