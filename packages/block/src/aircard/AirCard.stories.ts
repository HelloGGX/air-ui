import type { Meta, StoryFn } from '@storybook/vue3';
import AirCard from './AirCard';

const meta: Meta<typeof AirCard> = {
  title: "BLOCK/Card",
  tags: ['autodocs'],
  component: AirCard,
  argTypes: {
    num: {
      control: { type: 'text' },
      description: '标题222',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' }
      }
    }
  },
  args: {
    num: 1
  }
};

const Template: StoryFn = (args) => ({
  components: {AirCard},
  setup() {
    return { args };
  },
  template: '<AirCard v-bind="args">{{ args.default }}</AirCard>'
})

export const Default = Template.bind({});

export default meta;