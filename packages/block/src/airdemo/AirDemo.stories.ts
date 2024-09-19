import type { Meta, StoryFn } from '@storybook/vue3';
import AirDemo from './AirDemo.vue';

const meta: Meta<typeof AirDemo> = {
    title: '物料库/AirDemo',
    component: AirDemo,
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
    components: { AirDemo },
    setup() { return { args }; },
    template: '<AirDemo v-bind="args">{{ args.default }}</AirDemo>'
});

export const Default = Template.bind({});
export default meta;
