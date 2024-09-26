import type { Meta, StoryFn } from '@storybook/vue3';
import Airstep from './Airstep.vue';

const meta: Meta<typeof Airstep> = {
    title: '物料库/Airstep',
    component: Airstep,
    tags: ['autodocs'],
    argTypes: {
        active: {
            control: { type: 'number' },
            description: '设置当前激活步骤',
            table: {
                type: { summary: 'number' },
                defaultValue: {}
            }
        },
        isCenter: {
            control: { type: 'boolean' },
            description: '是否居中对齐',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        steps: {
            control: "object",
            description: '步骤',
            table: {
                type: { summary: "array" }
            }
        }

    },
    args: {
        active: 3,
        isCenter: false,
        steps: [
            { label: '旅客提取',  },
            { label: '行程选择',  },
            { label: '座位选择',  },
            { label: '信息完成', }
        ]
    }

};

const Template: StoryFn = (args) => ({
    components: { Airstep },
    setup() { return { args }; },
    template: '<Airstep v-bind="args">{{ args.default }}</Airstep>'
});

export const Default = Template.bind({});
export default meta;