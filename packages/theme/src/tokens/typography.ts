// packages/air-ui/theme/src/tokens/typography.ts

export const typography = {
    // 基础字体栈
    fontFamily: {
        sans: [
            'Inter',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'Noto Sans',
            'sans-serif',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
            'Noto Color Emoji'
        ],
        mono: ['Fira Code', 'Cascadia Code', 'Source Code Pro', 'Menlo', 'Consolas', 'Monaco', 'monospace']
    },
    // 字体大小比例（使用现代排版比例）
    fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem', // 72px
        '8xl': '6rem', // 96px
        '9xl': '8rem' // 128px
    }
};

// 类型定义
export type TypographyKey = keyof typeof typography;
export type TypographyValue = (typeof typography)[TypographyKey];
