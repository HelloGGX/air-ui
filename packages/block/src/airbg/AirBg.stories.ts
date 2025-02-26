import type { Meta, StoryFn } from '@storybook/vue3';
import AirBg from './AirBg.vue';
import { userEvent, within, expect } from '@storybook/test';

const description = 'sdsdadssdh 是的是多少都说的是的是';

const meta: Meta<typeof AirBg> = {
    title: '物料库/AirBg',
    component: AirBg,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `<div class="flex justify-between items-start"><div class="flex-1 space-y-4"><p class="story-descrip">${description}</p><div class="flex justify-between items-center space-y-4"><div class="flex flex-wrap gap-2"><span class="story-tag-blue">基础组件</span><span class="story-tag-blue">布局组件</span><span class="story-tag-purple">值机</span><span class="story-tag-purple">选座</span></div><code class="story-npm">npm i @air-ui/airbg</code></div></div></div>`
            }
        }
    },
    argTypes: {
        title: {
            control: { type: 'text' },
            description: '标题',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'placeholder' }
            }
        },
    },
    args: {
        title: '旅客姓名',
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