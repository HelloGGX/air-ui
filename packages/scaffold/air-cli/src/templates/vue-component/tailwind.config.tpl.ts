import { TemplateFunction } from '../../types';

const templateFn: TemplateFunction = function () {
    return {
        filename: 'tailwind.config.js',
        contents: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
    };
};

export default templateFn;
