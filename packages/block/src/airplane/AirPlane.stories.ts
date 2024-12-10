import type { Meta, StoryFn } from '@storybook/vue3';
import AirPlane from './AirPlane.vue';

const meta: Meta<typeof AirPlane> = {
    title: '物料库/AirPlane',
    component: AirPlane,
    tags: ['autodocs'],
    argTypes: {
        airSeats: {
            // control: { type: '' },
            description: '座位图列表',
            table: {
                type: { summary: '[{seatNumber: xx, status: xxxx(同airSeats状态)}]' },
                // defaultValue: [{
                //     id: 1,
                //     status: 'selected'
                // }]
            }
        }
    },
    args: {
        airSeats: [{
            seatNumber: 1,
            status: 'available'
        }, {
            seatNumber: 2,
            status: 'selected'
        }, {
            seatNumber: 3,
            status: 'unavailable'
        }],
    }
    
};

const Template: StoryFn = (args) => ({
    components: { AirPlane },
    setup() { return { args }; },
    template: '<AirPlane v-bind="args">{{ args.default }}</AirPlane>'
});

export const Default = Template.bind({});
export default meta;
