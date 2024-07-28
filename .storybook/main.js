/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../packages/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: 'vue-component-meta',
    },
  },
  core: {
    builder: {
      name: "@storybook/builder-vite",
    },
  },
};
export default config;
