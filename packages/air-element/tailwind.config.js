/** @type {import('tailwindcss').Config} */
import rootConfig from '../../tailwind.config.js';

export default {
    ...rootConfig,
    content: ['./components/**/*.{vue,js,ts,jsx,tsx}'],

}
