import type { Meta, StoryFn } from '@storybook/vue3';
import Airflightinfo from './Airflightinfo.vue';

const meta: Meta<typeof Airflightinfo> = {
    title: '物料库/Airflightinfo',
    component: Airflightinfo,
    tags: ['autodocs'],
    argTypes: {
        flightNum: {
            control: { type: 'text' },
            description: '航班',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        carriageFlightNum: {
            control: { type: "text"},
            description: '承运航班',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        date: {
            control: { type: "text"},
            description: '日期',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        tag: {
            control: { type: "text"},
            description: '航班标签',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        depart: {
            control: { type: "text"},
            description: '离港航站',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        arrive: {
            control: { type: "text"},
            description: '进港航站',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
    },
    args: {
        flightNum: 'MU12345',
        carriageFlightNum: 'CA23456',
        date: '2024-01-01',
        tag: '备份航班',
        depart: '北京首都',
        arrive: '上海虹桥',
    }
    
};

const Template: StoryFn = (args) => ({
    components: { Airflightinfo },
    setup() { return { args }; },
    template: '<Airflightinfo v-bind="args">{{ args.default }}</Airflightinfo>'
});

export const Default = Template.bind({});
export default meta;
