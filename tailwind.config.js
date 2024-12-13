/** @type {import('tailwindcss').Config} */
import { airTheme } from '@air-ui/theme';

module.exports = {
    content: ['./packages/**/!(node_modules)/*.{vue,js,ts,jsx,tsx}'],
    plugins: [airTheme]
};
