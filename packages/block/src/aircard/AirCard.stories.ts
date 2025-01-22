import type { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import AirCard from './AirCard.vue';
import { userEvent, within, expect } from '@storybook/test';

const meta: Meta<typeof AirCard> = {
    title: '物料库/AirCard',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'AirCard 组件用于展示旅客信息，包括旅客序号、姓名和座位号，并提供关闭功能。'
            }
        }
    },
    component: AirCard,
    argTypes: {
        num: {
            control: { type: 'number' },
            description: '旅客序号',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        },
        name: {
            control: { type: 'text' },
            description: '旅客姓名',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'placeholder' }
            }
        },
        seatNum: {
            control: { type: 'text' },
            description: '座位号',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '请选座' }
            }
        },
        showClose: {
            control: 'boolean',
            description: '是否显示关闭图标',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' }
            }
        }
    },
    args: {
        num: 1,
        name: 'placeholder',
        seatNum: '请选座',
        showClose: true
    }
};

const Template: StoryFn = (args) => ({
    components: { AirCard },
    setup() {
        return { args };
    },
    template: '<AirCard v-bind="args">{{ args.default }}</AirCard>'
});

export const Default = Template.bind({});

export default meta;

type Story = StoryObj<typeof AirCard>;

export const EmptyForm: Story = {
    render: () => ({
        components: { AirCard },
        template: `<AirCard />`
    })
};
export const FilledForm: Story = {
    render: () => ({
        components: { AirCard },
        template: `<AirCard  />`
    }),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const cardBox = canvas.getByTestId('card-box');
        await step('点击切换效果，校验切换效果', async () => {
            await userEvent.click(cardBox);
            await expect(cardBox).toHaveClass('bg-primary-500');
        });
        await step('点击关闭,，校验卡片是否隐藏', async () => {
            await userEvent.click(canvas.getByRole('button'));
            await expect(cardBox).not.toBeVisible();
        });
    }
};
