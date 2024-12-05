import type { Meta, StoryFn } from '@storybook/vue3';
import AirPlane from './AirPlane.vue';

const meta: Meta<typeof AirPlane> = {
    title: '物料库/AirPlane',
    component: AirPlane,
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
    components: { AirPlane },
    setup() { return { args }; },
    template: '<AirPlane v-bind="args">{{ args.default }}</AirPlane>'
});

export const Default = Template.bind({});
export default meta;
