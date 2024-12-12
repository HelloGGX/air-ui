export const space = {
    '4': '0.25rem',
    '8': '0.5rem',
    '12': '0.75rem',
    '16': '1rem',
    '24': '1.5rem',
    '40': '2.5rem',
    '80': '5rem'
} as const;

// 类型定义
export type SpaceKey = keyof typeof space;
export type SpaceValue = (typeof space)[SpaceKey];
