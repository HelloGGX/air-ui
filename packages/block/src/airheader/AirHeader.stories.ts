import type { Meta, StoryFn } from '@storybook/vue3';
import AirHeader from './AirHeader.vue';

const meta: Meta<typeof AirHeader> = {
    title: '物料库/Header',
    tags: ['autodocs'],
    component: AirHeader,

    argTypes: {
        title: {
            control: { type: 'text' },
            description: '标题222',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Logo' }
            }
        }
    },
    args: {
        title: 'Logo'
    }
};
const Template: StoryFn = (args) => ({
    components: { AirHeader },
    setup() {
        return { args };
    },
    template: '<AirHeader v-bind="args">{{ args.default }}</AirHeader>'
});

export const Default = Template.bind({});

export default meta;
