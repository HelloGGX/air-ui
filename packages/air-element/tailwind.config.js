/** @type {import('tailwindcss').Config} */
import { airTheme } from '@air-ui/theme';

export default {
    content: ['./components/**/*.{vue,js,ts,jsx,tsx}'],
    plugins: [airTheme]
};
