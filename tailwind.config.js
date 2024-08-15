/** @type {import('tailwindcss').Config} */
import elementTailwindConfig from 'packages/air-element/tailwind.config.js';

module.exports = {
    ...elementTailwindConfig,
    content: ['./packages/**/*.{vue,js,ts,jsx,tsx}']
};
