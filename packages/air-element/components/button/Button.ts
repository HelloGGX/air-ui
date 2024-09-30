import type { ExtractPropTypes } from 'vue';
import { buildProps } from 'element-plus/es/utils/vue/props/runtime';
import { iconPropType } from 'element-plus/es/utils/vue/icon';
import { useSizeProp } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger'] as const;

export const buttonProps = buildProps({
    /**
     * @description 按钮大小
     * @type {string}
     * @values 'small', 'default', 'large'
     */
    size: useSizeProp,
    /**
     * @description disable the button
     */
    disabled: Boolean,
    /**
     * @description 按钮类型
     * @type {string}
     * @values "default", "primary", "success", "warning", "info", "danger"
     */
    type: {
        type: String,
        values: buttonTypes,
        default: 'default'
    },
    /**
     * @description 是否为圆角
     */
    round: {
        type: Boolean,
        default: false
    },
    /**
     * @description 是否展示loading
     */
    loading: Boolean,
    /**
     * @description 自定义loading图标
     */
    loadingIcon: {
        type: iconPropType,
        default: () => Loading
    },
    /**
     * @description 按钮左边的图标
     */
    leftIcon: {
        type: iconPropType,
        default: () => ''
    },
    /**
     * @description 按钮右边的图标
     */
    rightIcon: {
        type: iconPropType,
        default: () => ''
    },
    /**
     * @description 自定义按钮颜色
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * @description 是否为朴素按钮
     */
    plain: {
        type: Boolean,
        default: false
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
