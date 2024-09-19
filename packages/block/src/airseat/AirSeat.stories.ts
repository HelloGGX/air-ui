import type { Meta, StoryFn } from '@storybook/vue3';
import AirSeat from './AirSeat.vue';

const meta: Meta<typeof AirSeat> = {
    title: '物料库/AirSeat',
    tags: ['autodocs'],
    component: AirSeat,
    argTypes: {},
    args: {}
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
