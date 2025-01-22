import type { Meta, StoryFn } from '@storybook/vue3';
import AirHeader from './AirHeader.vue';

const meta: Meta<typeof AirHeader> = {
    title: '物料库/AirHeader',
    component: AirHeader,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'AirHeader 组件用于展示顶部head的通用组件'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        countdownNumber: {
            control: 'number',
            description: '倒计时数字',
            table: {
                type: { summary: 'number' }
            }
        }
    },
    args: {
        countdownNumber: 10 // 默认倒计时数字
    }
};

export default meta;

const Template: StoryFn = (args) => ({
    components: { AirHeader },
    setup() {
        return { args };
    },
    template: '<AirHeader v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
    countdownNumber: 10
};

export const WithCountdown = Template.bind({});
WithCountdown.args = {
    countdownNumber: 5
};
