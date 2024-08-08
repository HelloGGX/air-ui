import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import AirButton from './Button.vue';
import type { ButtonProps } from './Button';

export default {
    title: 'component/Button',
    component: AirButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'default', 'large'],
            description: '按钮的大小 (small | default | large)',
            defaultValue: {
                summary: 'default'
            }
        },
        type: {
            control: { type: 'select' },
            options: ['default', 'primary', 'success', 'warning', 'info', 'danger'],
            description: '按钮的主题 (default | primary | success | warning | info | danger)',
            defaultValue: {
                summary: 'default'
            }
        },
        disabled: {
            control: 'boolean',
            description: '按钮禁止的状态',
            defaultValue: {
                summary: 'false'
            }
        },
        loading: {
            control: 'boolean',
            description: '是否展示loading',
            defaultValue: {
                summary: 'false'
            }
        },
        loadingIcon: {
            control: 'text',
            description: '自定义loading图标',
            defaultValue: {
                detail: '默认为element-plus的Loading图标',
                summary: 'Loading'
            }
        }
    },
    args: {
        onClick: action('click'),
        size: 'default',
        type: 'default',
        disabled: false,
        loading: false,
        default: 'Button'
    }
} as Meta;

const Template: StoryFn<ButtonProps & { default: string }> = (args) => ({
    components: { AirButton },
    setup() {
        return { args };
    },
    template: '<AirButton v-bind="args">{{args.default}}</AirButton>'
});

export const Default = Template.bind({});
Default.args = {
    type: 'default',
    size: 'default',
    default: 'Button'
};

export const Primary = Template.bind({});
Primary.args = {
    type: 'primary',
    size: 'default',
    default: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
    type: 'default',
    size: 'default',
    default: 'Button'
};

export const Large = Template.bind({});
Large.args = {
    type: 'default',
    size: 'large',
    default: 'Button'
};

export const Small = Template.bind({});
Small.args = {
    type: 'default',
    size: 'small',
    default: 'Button'
};
