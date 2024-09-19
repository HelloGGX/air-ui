import type { Meta, StoryFn } from '@storybook/vue3';
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
    template: '<AirSeat v-bind="args">{{ args.default }}</AirSeat>'
});

export const Default = Template.bind({});
export default meta;
