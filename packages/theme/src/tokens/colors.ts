// colors.js

export const colors = {
    white: {
        800: 'rgba(255, 255, 255, 1)',
        700: 'rgba(255, 255, 255, 0.88)',
        600: 'rgba(255, 255, 255, 0.72)',
        500: 'rgba(255, 255, 255, 0.64)',
        400: 'rgba(255, 255, 255, 0.48)',
        300: 'rgba(255, 255, 255, 0.32)',
        200: 'rgba(255, 255, 255, 0.24)',
        100: 'rgba(255, 255, 255, 0)'
    },
    primary: {
        800: '#051773',
        700: '#0e2a99',
        600: '#1b41bf',
        500: '#2c5de5',
        400: '#5584f2',
        300: '#82acff',
        200: '#abcaff',
        100: '#edf4ff'
    },
    gray: {
        800: '#000000',
        700: '#202532',
        600: '#50545e',
        500: '#838791',
        400: '#bec0c5',
        300: '#d9dadd',
        200: '#eaeaeb',
        100: '#f2f2f3'
    },
    blue: {
        400: '#5584f2',
        200: '#abcaff',
        100: '#edf4ff'
    },
    green: {
        400: '#33bb53',
        200: '#caedd9',
        100: '#e9fbf1'
    },
    red: {
        400: '#e83f4e',
        200: '#ffd6d7',
        100: '#ffeff0'
    },
    purple: {
        400: '#9c5bfc',
        200: '#e5d5fc',
        100: '#f6f0ff'
    },
    orange: {
        400: '#ee843e',
        200: '#ffe1be',
        100: '#fff1e2'
    }
} as const;

// 类型定义
export type ColorsKey = keyof typeof colors;
export type ColorsValue = (typeof colors)[ColorsKey];
