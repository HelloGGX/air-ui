import type { TemplateFunction } from '../../../utils/types';

const templateFn: TemplateFunction = function ({ name: componentName }) {
    componentName = componentName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());

    return {
        filename: `${componentName}.stories.ts`,
        contents: `import type { Meta, StoryObj } from '@storybook/vue3';
import ${componentName} from '../${componentName}.vue';

const meta: Meta<typeof ${componentName}> = {
  title: '${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  argTypes: {
    // Define your component's props here
  },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    // Define default props here
  },
};

export const CustomExample: Story = {
  args: {
    // Define custom props here
  },
};
`
    };
};

export default templateFn;
