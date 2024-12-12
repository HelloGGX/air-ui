export const radius = {
    none: '0rem',
    sm: '0.25rem',
    base: '0.5rem',
    lg: '0.75rem',
    full: '625rem'
} as const;
// 类型定义
export type RadiusKey = keyof typeof radius;
export type RadiusValue = (typeof radius)[RadiusKey];
