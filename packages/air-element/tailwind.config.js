/** @type {import('tailwindcss').Config} */

export default {
    content: ['./components/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
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
                    100: 'var(--color-red-100)',
                    50: 'var(--color-red-50)'
                },
                blue: {
                    400: 'var(--color-blue-400)',
                    300: 'var(--color-blue-300)',
                    200: 'var(--color-blue-200)',
                    150: 'var(--color-blue-150)',
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
                    300: 'var(--color-orange-300)',
                    200: 'var(--color-orange-200)',
                    100: 'var(--color-orange-100)'
                }
            },
            boxShadow: {
                'size-l': 'var(--shadow-size-l)',
                'size-s': 'var(--shadow-size-s)'
            }
        }
    }
};
