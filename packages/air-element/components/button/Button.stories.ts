import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import AirButton from './Button.vue';
import type { ButtonProps } from './Button';

const meta: Meta<typeof AirButton> = {
    title: 'Component/Button',
    component: AirButton,
    tags: ['autodocs'],

    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'default', 'large'],
            description: '按钮的大小 (small | default | large)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' }
            }
        },
        type: {
            control: { type: 'select' },
            options: ['default', 'primary', 'success', 'warning', 'info', 'danger'],
            description: '按钮的类型 (default | primary | success | warning | info | danger)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' }
            }
        },
        disabled: {
            control: 'boolean',
            description: '按钮禁用状态',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        round: {
            control: 'boolean',
            description: '按钮是否为圆角',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        loading: {
            control: 'boolean',
            description: '是否显示 loading 状态',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        loadingIcon: {
            control: 'text',
            description: '自定义 loading 图标',
            table: {
                type: { summary: 'string | Component' },
                defaultValue: { summary: 'Loading' }
            }
        },
        color: {
            control: 'color',
            description: '按钮的自定义颜色',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        onClick: {
            action: 'clicked', // 记录事件
            description: '按钮的点击事件',
            table: {
                type: { summary: 'function' }
            }
        }
    },
    args: {
        onClick: action('clicked'),
        size: 'default',
        type: 'default',
        disabled: false,
        round: true,
        loading: false,
        color: '',
        default: 'Button'
    }
};

export default meta;

const Template: StoryFn<ButtonProps & { default: string }> = (args) => ({
    components: { AirButton },
    setup() {
        return { args };
    },
    template: '<AirButton v-bind="args">{{ args.default }}</AirButton>'
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

export const Rounded = Template.bind({});
Rounded.args = {
    type: 'primary',
    size: 'default',
    round: true,
    default: 'Rounded Button'
};

export const Loading = Template.bind({});
Loading.args = {
    type: 'primary',
    size: 'default',
    loading: true,
    default: 'Loading Button'
};
