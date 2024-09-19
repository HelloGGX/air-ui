import type { Meta, StoryFn } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import AirSeat from './AirSeat.vue';

const meta: Meta<typeof AirSeat> = {
    title: '物料库/AirSeat',
    component: AirSeat,
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' },
            description: '标题',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        click: {
            // 添加 click 事件的描述和控制
            action: 'clicked', // 事件名称
            description: '点击事件',
            table: {
                type: { summary: 'function' }
            }
        }
    },
    args: {
        title: '标题'
    }
};

const Template: StoryFn = (args) => ({
    components: { AirSeat },
    setup() {
        return { args };
    },
    template: '<AirSeat v-bind="args" @click="args.click">{{ args.default }}</AirSeat>' // 绑定 click 事件
});

export const Default = Template.bind({});
export default meta;
