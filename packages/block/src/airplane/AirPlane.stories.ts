import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
import AirPlane from './AirPlane.vue';
import { expect, within, userEvent } from '@storybook/test';

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

    await step('初始状态检查', async () => {
        // 检查按钮状态
        const upButton = canvas.getByTestId('up');
        const downButton = canvas.getByTestId('down');

        expect(upButton).toBeDisabled();
        expect(downButton).toBeEnabled();

        // 检查座位区域是否渲染
        const airplaneLeft = canvas.getByTestId('airplane-left');
        expect(airplaneLeft).toBeInTheDocument();
    });
};

// 测试用例2：测试座位选择
export const SeatSelection = Template.bind({});
SeatSelection.play = async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('座位选择测试', async () => {
        // 模拟选择座位

        const availableSeats = canvas
            .getAllByTestId('airseat-ref')
            .filter((seat) => seat.getAttribute('data-status') === 'available');
        if (availableSeats.length > 0) {
            await userEvent.click(availableSeats[0]);
            // 验证选中状态
            expect(availableSeats[0]).toHaveAttribute('data-status', 'selected');
        }
    });
};

// 测试用例4：测试紧急出口座位
export const EmergencyExitSeats = Template.bind({});
EmergencyExitSeats.play = async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('紧急出口座位检查', async () => {
        // 滚动到紧急出口位置
        const airplaneLeft = canvas.getByTestId('airplane-left');
        airplaneLeft.scrollTo(0, 200);

        // 等待滚动完成
        await new Promise((resolve) => setTimeout(resolve, 500));

        const emergencyRightSeats = canvas
            .getAllByTestId('airseat-ref')
            .filter((seat) => seat.getAttribute('data-status') === 'emergency-right');
        expect(emergencyRightSeats.length).toBeGreaterThan(0);
        const emergencyLeftSeats = canvas
            .getAllByTestId('airseat-ref')
            .filter((seat) => seat.getAttribute('data-status') === 'emergency-left');
        expect(emergencyLeftSeats.length).toBeGreaterThan(0);
    });
};

export default meta;
