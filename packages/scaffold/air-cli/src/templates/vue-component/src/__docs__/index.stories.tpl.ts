import { TemplateFunction } from '../../../../types';

const templateFn: TemplateFunction = function ({ name: componentName }) {
    componentName = componentName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());

    return {
        filename: `${componentName}.stories.ts`,
        contents: `import type { Meta, StoryObj } from '@storybook/vue3';
import ${componentName} from '../${componentName}.vue';

const meta: Meta<typeof ${componentName}> = {
    title: 'Components/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {};
`
    };
};

export default templateFn;
