// packages/air-ui/theme/plugin.ts
import plugin from 'tailwindcss/plugin';
import { colors } from './src/tokens/colors';
import { typography } from './src/tokens/typography';
import { radius } from './src/tokens/radius';
import { space } from './src/tokens/space';

function createCSSVars(
    prefix: string,
    obj: Record<string, any>,
    transformer: (value: any) => string = (val) => `${val}`
): Record<string, string> {
    return Object.entries(obj)
        .flatMap(([key, value]) => {
            if (typeof value === 'object' && !Array.isArray(value)) {
                return Object.entries(value).map(([subKey, subValue]) => [
                    `--air-${prefix}-${key}-${subKey}`,
                    transformer(subValue)
                ]);
            }
            return [[`--air-${prefix}-${key}`, transformer(value)]];
        })
        .reduce((vars, [key, val]) => ({ ...vars, [key]: val }), {});
}

export const airTheme = plugin(
    ({ addBase }) => {
        addBase({
            ':root': {
                // 颜色变量
                ...createCSSVars('color', colors),

                // 字体大小变量
                ...createCSSVars('font-size', typography.fontSize),

                // 字体族变量（使用特殊转换器）
                ...createCSSVars('font-family', typography.fontFamily),

                // 圆角变量
                ...createCSSVars('radius', radius),

                // 间距变量
                ...createCSSVars('space', space)
            }
        });
    },
    {
        theme: {
            extend: {
                colors: {
                    white: {
                        800: 'var(--air-color-white-800)',
                        700: 'var(--air-color-white-700)',
                        600: 'var(--air-color-white-600)',
                        500: 'var(--air-color-white-500)',
                        400: 'var(--air-color-white-400)',
                        300: 'var(--air-color-white-300)',
                        200: 'var(--air-color-white-200)',
                        100: 'var(--air-color-white-100)'
                    },
                    primary: {
                        800: 'var(--air-color-primary-800)',
                        700: 'var(--air-color-primary-700)',
                        600: 'var(--air-color-primary-600)',
                        500: 'var(--air-color-primary-500)',
                        400: 'var(--air-color-primary-400)',
                        300: 'var(--air-color-primary-300)',
                        200: 'var(--air-color-primary-200)',
                        100: 'var(--air-color-primary-100)'
                    },
                    gray: {
                        800: 'var(--air-color-gray-800)',
                        700: 'var(--air-color-gray-700)',
                        600: 'var(--air-color-gray-600)',
                        500: 'var(--air-color-gray-500)',
                        400: 'var(--air-color-gray-400)',
                        300: 'var(--air-color-gray-300)',
                        200: 'var(--air-color-gray-200)',
                        100: 'var(--air-color-gray-100)'
                    },
                    red: {
                        400: 'var(--air-color-red-400)',
                        200: 'var(--air-color-red-200)',
                        100: 'var(--air-color-red-100)'
                    },
                    blue: {
                        400: 'var(--air-color-blue-400)',
                        200: 'var(--air-color-blue-200)',
                        100: 'var(--air-color-blue-100)'
                    },
                    green: {
                        400: 'var(--air-color-green-400)',
                        200: 'var(--air-color-green-200)',
                        100: 'var(--air-color-green-100)'
                    },
                    purple: {
                        400: 'var(--air-color-purple-400)',
                        200: 'var(--air-color-purple-200)',
                        100: 'var(--air-color-purple-100)'
                    },
                    orange: {
                        400: 'var(--air-color-orange-400)',
                        200: 'var(--air-color-orange-200)',
                        100: 'var(--air-color-orange-100)'
                    }
                },
                fontSize: {
                    56: 'var(--air-font-size-56)',
                    48: 'var(--air-font-size-48)',
                    40: 'var(--air-font-size-40)',
                    32: 'var(--air-font-size-32)',
                    24: 'var(--air-font-size-24)',
                    20: 'var(--air-font-size-20)',
                    16: 'var(--air-font-size-16)',
                    14: 'var(--air-font-size-14)'
                },
                fontFamily: {
                    sans: ['var(--air-font-family-sans)'],
                    mome: ['var(--air-font-family-mome)']
                },
                borderRadius: {
                    none: 'var(--air-radius-none)',
                    sm: 'var(--air-radius-sm)',
                    base: 'var(--air-radius-base)',
                    DEFAULT: 'var(--air-radius-base)',
                    md: 'var(--air-radius-base)',
                    lg: 'var(--air-radius-lg)',
                    full: 'var(--air-radius-full)'
                },
                space: {
                    4: 'var(--air-space-4)',
                    8: 'var(--air-space-8)',
                    12: 'var(--air-space-12)',
                    16: 'var(--air-space-16)',
                    24: 'var(--air-space-24)',
                    40: 'var(--air-space-40)',
                    80: 'var(--air-space-80)'
                }
            }
        }
    }
);
