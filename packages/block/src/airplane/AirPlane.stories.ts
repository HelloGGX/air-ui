import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
import AirPlane from './AirPlane.vue';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof AirPlane> = {
    title: '物料库/AirPlane',
    component: AirPlane,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'AirPlane 用于航班选择座位'
            }
        }
    },
    argTypes: {
        seatData: Object
    },
    args: {
        seatData: {
            openSymbol: '*',
            defaultShowLevel: 'Down',
            lower: [
                [
                    {
                        seatCol: 'A',
                        seatRow: '11',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '12',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '13',
                        symbol: '.',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '14',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '15',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '16',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '17',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '18',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '19',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'A',
                        seatRow: '20',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'A',
                        seatRow: '21',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'A',
                        seatRow: '22',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'A',
                        seatRow: '23',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'A',
                        seatRow: '24',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'A',
                        seatRow: '25',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'A',
                        seatRow: '26',
                        symbol: 'P',
                        wing: '1'
                    },
                    {
                        seatCol: 'A',
                        seatRow: '27',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '28',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '29',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '30',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '31',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '32',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '33',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '34',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '35',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '36',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'A',
                        seatRow: '37',
                        symbol: ' ',
                        wing: null
                    }
                ],
                [
                    {
                        seatCol: 'B',
                        seatRow: '11',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '12',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '13',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '14',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '15',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '16',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '17',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '18',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '19',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'B',
                        seatRow: '20',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'B',
                        seatRow: '21',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'B',
                        seatRow: '22',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'B',
                        seatRow: '23',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'B',
                        seatRow: '24',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'B',
                        seatRow: '25',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'B',
                        seatRow: '26',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'B',
                        seatRow: '27',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '28',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '29',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '30',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '31',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '32',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '33',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '34',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '35',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '36',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'B',
                        seatRow: '37',
                        symbol: ' ',
                        wing: null
                    }
                ],
                [
                    {
                        seatCol: 'C',
                        seatRow: '11',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '12',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '13',
                        symbol: '.',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '14',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '15',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '16',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '17',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '18',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '19',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'C',
                        seatRow: '20',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'C',
                        seatRow: '21',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'C',
                        seatRow: '22',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'C',
                        seatRow: '23',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'C',
                        seatRow: '24',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'C',
                        seatRow: '25',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'C',
                        seatRow: '26',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'C',
                        seatRow: '27',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '28',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '29',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '30',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '31',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '32',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '33',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '34',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '35',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '36',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'C',
                        seatRow: '37',
                        symbol: ' ',
                        wing: null
                    }
                ],
                [
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: 'I',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: 'E',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: 'E',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    }
                ],
                [
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: 'I',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: 'E',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: 'E',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: '1'
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    },
                    {
                        seatCol: null,
                        seatRow: null,
                        symbol: '=',
                        wing: null
                    }
                ],
                [
                    {
                        seatCol: 'J',
                        seatRow: '11',
                        symbol: 'X',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '12',
                        symbol: 'X',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '13',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '14',
                        symbol: '.',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '15',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '16',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '17',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '18',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '19',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'J',
                        seatRow: '20',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'J',
                        seatRow: '21',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'J',
                        seatRow: '22',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'J',
                        seatRow: '23',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'J',
                        seatRow: '24',
                        symbol: 'C',
                        wing: '1'
                    },
                    {
                        seatCol: 'J',
                        seatRow: '25',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'J',
                        seatRow: '26',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'J',
                        seatRow: '27',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '28',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '29',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '30',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '31',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '32',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '33',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '34',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '35',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '36',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'J',
                        seatRow: '37',
                        symbol: '*',
                        wing: null
                    }
                ],
                [
                    {
                        seatCol: 'K',
                        seatRow: '11',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '12',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '13',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '14',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '15',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '16',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '17',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '18',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '19',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'K',
                        seatRow: '20',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'K',
                        seatRow: '21',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'K',
                        seatRow: '22',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'K',
                        seatRow: '23',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'K',
                        seatRow: '24',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'K',
                        seatRow: '25',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'K',
                        seatRow: '26',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'K',
                        seatRow: '27',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '28',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '29',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '30',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '31',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '32',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '33',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '34',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '35',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '36',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'K',
                        seatRow: '37',
                        symbol: '*',
                        wing: null
                    }
                ],
                [
                    {
                        seatCol: 'L',
                        seatRow: '11',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '12',
                        symbol: 'C',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '13',
                        symbol: '.',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '14',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '15',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '16',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '17',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '18',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '19',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'L',
                        seatRow: '20',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'L',
                        seatRow: '21',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'L',
                        seatRow: '22',
                        symbol: '.',
                        wing: '1'
                    },
                    {
                        seatCol: 'L',
                        seatRow: '23',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'L',
                        seatRow: '24',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'L',
                        seatRow: '25',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'L',
                        seatRow: '26',
                        symbol: '*',
                        wing: '1'
                    },
                    {
                        seatCol: 'L',
                        seatRow: '27',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '28',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '29',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '30',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '31',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '32',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '33',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '34',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '35',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '36',
                        symbol: '*',
                        wing: null
                    },
                    {
                        seatCol: 'L',
                        seatRow: '37',
                        symbol: '.',
                        wing: null
                    }
                ]
            ],
            upper: null
        }
    }
};

const Template: StoryFn = (args) => ({
    components: { AirPlane },
    setup() {
        const airPlaneRef = ref();
        return { args, airPlaneRef };
    },
    template: '<AirPlane ref="airPlaneRef" v-bind="args">{{ args.default }}</AirPlane>'
});

export const Default = Template.bind({});

Default.play = async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const airplaneLeft = canvas.getByTestId('airplane-left');

    // 模拟滑动操作
    const upButton = canvas.getByTestId('up');
    const downButton = canvas.getByTestId('down');

    // 模拟向上滑动
    await step('按钮的初始化状态应该是上面是置灰不可用，下面点击', async () => {
        // 检查按钮状态变化
        expect(upButton).toBeDisabled();
        expect(downButton).toBeEnabled();
    });

    await step('点击一次向下按钮，两个按钮多应该可用', async () => {
        await userEvent.click(downButton);
        await new Promise((resolve) => setTimeout(resolve, 100)); // 等待状态更新
        // 检查按钮状态变化
        expect(upButton).toBeEnabled();
        expect(downButton).toBeEnabled();
    });

    await step('滚动到最底部，向下按钮置灰不可用', async () => {
        await airplaneLeft.scrollTo({ top: 1000 });
        await new Promise((resolve) => setTimeout(resolve, 900)); // 等待状态更新
        // 检查按钮状态变化
        expect(upButton).toBeEnabled();
        expect(downButton).toBeDisabled(); // 向下按钮应置灰不可用
    });
};

export default meta;
