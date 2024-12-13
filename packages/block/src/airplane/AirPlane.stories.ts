import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
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
            status: 'available',
            seatOwnerIndex: 1,
        }, {
            seatNumber: 2,
            status: 'available',
            seatOwnerIndex: 4,
        }, {
            seatNumber: 3,
            status: 'unavailable',
            seatOwnerIndex: 3
        }],
    }
    
};

const Template: StoryFn = (args) => ({
    components: { AirPlane },
    setup() {
        const airPlaneRef = ref()
        return { args, airPlaneRef }; 
    },
    template: '<AirPlane ref="airPlaneRef" v-bind="args">{{ args.default }}</AirPlane>'
});

export const Default = Template.bind({});
export default meta;
