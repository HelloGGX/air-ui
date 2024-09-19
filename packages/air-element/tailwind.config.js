/** @type {import('tailwindcss').Config} */
export default {
    content: ['./components/**/*.{vue,js,ts,jsx,tsx}'],

    theme: {
        extend: {
            colors: {
                white: {
                    800: 'var(--color-white-800)',
                    700: 'var(--color-white-700)',
                    600: 'var(--color-white-600)',
                    500: 'var(--color-white-500)',
                    400: 'var(--color-white-400)',
                    300: 'var(--color-white-300)',
                    200: 'var(--color-white-200)',
                    100: 'var(--color-white-100)'
                },
                gray: {
                    800: 'var(--color-gray-800)',
                    700: 'var(--color-gray-700)',
                    600: 'var(--color-gray-600)',
                    500: 'var(--color-gray-500)',
                    400: 'var(--color-gray-400)',
                    300: 'var(--color-gray-300)',
                    200: 'var(--color-gray-200)',
                    100: 'var(--color-gray-100)'
                },
                primary: {
                    800: 'var(--color-primary-800)',
                    700: 'var(--color-primary-700)',
                    600: 'var(--color-primary-600)',
                    500: 'var(--color-primary-500)',
                    400: 'var(--color-primary-400)',
                    300: 'var(--color-primary-300)',
                    200: 'var(--color-primary-200)',
                    100: 'var(--color-primary-100)'
                },
                red: {
                    400: 'var(--color-red-400)',
                    200: 'var(--color-red-200)',
                    100: 'var(--color-red-100)'
                },
                blue: {
                    400: 'var(--color-blue-400)',
                    200: 'var(--color-blue-200)',
                    100: 'var(--color-blue-100)'
                },
                green: {
                    400: 'var(--color-green-400)',
                    200: 'var(--color-green-200)',
                    100: 'var(--color-green-100)'
                },
                purple: {
                    400: 'var(--color-purple-400)',
                    200: 'var(--color-purple-200)',
                    100: 'var(--color-purple-100)'
                },
                orange: {
                    400: 'var(--color-orange-400)',
                    200: 'var(--color-orange-200)',
                    100: 'var(--color-orange-100)'
                }
            },
            boxShadow: {
                'size-l': 'var(--shadow-size-l)',
                'size-s': 'var(--shadow-size-s)'
            },
            fontSize: {
                56: 'var(--font-size-56)',
                48: 'var(--font-size-48)',
                40: 'var(--font-size-40)',
                32: 'var(--font-size-32)',
                24: 'var(--font-size-24)',
                20: 'var(--font-size-20)',
                16: 'var(--font-size-16)',
                14: 'var(--font-size-14)'
            },
            borderRadius: {
                none: 'var(--radius-none)', // 无圆角
                sm: 'var(--radius-sm)', // 小圆角
                base: 'var(--radius-base)', // 默认圆角
                DEFAULT: 'var(--radius-base)', // 默认圆角
                md: 'var(--radius-base)', // 中等圆角 (保持与默认相同)
                lg: 'var(--radius-lg)', // 大圆角
                full: 'var(--radius-full)' // 完全圆角
            }
        }
    }
};
