import type { Meta, StoryFn } from '@storybook/vue3';
import Airstep from './Airstep.vue';

const meta: Meta<typeof Airstep> = {
    title: '物料库/Airstep',
    tags: ['autodocs'],
    component: Airstep,
    argTypes: {},
    args: {}
};

const Template: StoryFn = (args) => ({
    components: { Airstep },
    setup() {
        return { args };
    },
    template: '<Airstep v-bind="args">{{ args.default }}</Airstep>'
});

export const Default = Template.bind({});

export default meta;
