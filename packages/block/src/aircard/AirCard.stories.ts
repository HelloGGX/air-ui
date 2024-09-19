import type { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import AirCard from './AirCard.vue';
import { action } from '@storybook/addon-actions';
import { userEvent, within, expect, waitFor, fn } from '@storybook/test';

const meta: Meta<typeof AirCard> = {
  title: "物料库/Card",
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
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
      description: "旅客姓名",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: 'placeholder' }
      }
    },
    seatNum: {
      control: { type: "text" },
      description: "座位号",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "请选座" }
      }
    },
    showClose: {
      control: "boolean",
      description: "是否显示关闭图标",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" }
      }
    }
  },
  args: {
    num: 1,
    name: "placeholder",
    seatNum: "请选座",
    showClose: true,
    // onClose: action("clicked"),
    onClose: fn(),
    onSelect: action("clicked")
  }
};

const Template: StoryFn = (args) => ({
  components: { AirCard },
  setup() {
    return { args };
  },
  template: '<AirCard v-bind="args">{{ args.default }}</AirCard>'
})

export const Default = Template.bind({});

export default meta;

type Story = StoryObj<typeof AirCard>;
 
export const EmptyForm: Story = {
  render: () => ({
    components: { AirCard },
    template: `<AirCard />`,
  }),
};
export const FilledForm: Story = {
  render: () => ({
    components: { AirCard },
    template: `<AirCard />`,
  }),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
 
    // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await step('点击切换效果', async () => {
      await userEvent.click(canvas.getByTestId('card-box'));
    });
    await step('点击关闭', async()=>{
      await userEvent.click(canvas.getByRole('button'));

    })
    await waitFor(() => expect(args.onClose).toHaveBeenCalled());

  },
};