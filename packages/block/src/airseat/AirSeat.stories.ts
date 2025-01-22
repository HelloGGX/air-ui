import type { Meta, StoryFn } from '@storybook/vue3';
import AirSeat from './AirSeat.vue';
import type { AirSeatProps } from './AirSeat';

const meta: Meta<typeof AirSeat> = {
    title: '物料库/AirSeat',
    component: AirSeat,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'AirSeat 用于机舱座位选择中座位的展示'
            }
        }
    },
    argTypes: {
        status: {
            control: { type: 'select' },
            options: ['available', 'selected', 'unavailable', 'emergency-left', 'emergency-right'],
            description: '座位状态 (available | selected | unavailable | emergency-left | emergency-right)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'available' }
            }
        },
        seatNumber: {
            control: {
                type: 'number'
            }
        }
    },
    args: {
        status: 'available',
        seatNumber: 1,
        seatOwnerIndex: 1
    }
};

const Template: StoryFn<AirSeatProps> = (args) => ({
    components: { AirSeat },
    setup() {
        return { args };
    },
    template: '<AirSeat v-bind="args">{{ args.seatOwnerIndex }}</AirSeat>'
});

export const Default = Template.bind({});
export default meta;
