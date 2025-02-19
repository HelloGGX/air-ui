import type { Meta, StoryFn } from '@storybook/vue3';
import { expect, within, userEvent } from '@storybook/test';
import AirBg from './AirBg.vue';

const meta: Meta<typeof AirBg> = {
    title: '物料库/AirBg',
    component: AirBg,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'AirBg 组件描述'
            }
        }
    },
    argTypes: {
        title: {
            control: { type: 'text' },
            description: '标题',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        onClick: {
            description: '点击事件',
            table: {
                type: { summary: 'function' }
            }
        }
    },
    args: {
        title: '示例标题'
    }
};

const Template: StoryFn<typeof AirBg> = (args) => ({
    components: { AirBg },
    setup() {
        return { args };
    },
    template: '<AirBg v-bind="args">{{ args.default }}</AirBg>'
});

export const Default = Template.bind({});

Default.play = async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByTestId('airbg-ref');

    await step('测试组件渲染', async () => {
        expect(component).toBeInTheDocument();
    });

    await step('测试点击事件', async () => {
        await userEvent.click(component);
    });
};

export default meta;