/** @type {import('tailwindcss').Config} */
import elementTailwindConfig from './packages/air-element/tailwind.config';

module.exports = {
    // ...elementTailwindConfig,
    content: [
        './packages/**/*.{vue,js,ts,jsx,tsx}',
        './docs/**/*.{vue,js,ts,jsx,tsx,md}',
        './docs/.vitepress/**/*.{vue,js,ts,jsx,tsx}'
    ]
};
