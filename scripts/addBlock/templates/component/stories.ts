interface TemplateParams {
    componentName: string;
    name: string;
}

export default function generateStories({ componentName, name }: TemplateParams): string {
    return `import type { Meta, StoryFn } from '@storybook/vue3';
import { expect, within, userEvent } from '@storybook/test';
import ${componentName} from './${componentName}.vue';

const meta: Meta<typeof ${componentName}> = {
    title: '物料库/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: '${componentName} 组件描述'
            }
        }
    },
    argTypes: {
        title: {
            control: { type: 'text' },
            description: '标题',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        onClick: {
            description: '点击事件',
            table: {
                type: { summary: 'function' }
            }
        }
    },
    args: {
        title: '示例标题'
    }
};

const Template: StoryFn<typeof ${componentName}> = (args) => ({
    components: { ${componentName} },
    setup() {
        return { args };
    },
    template: '<${componentName} v-bind="args">{{ args.default }}</${componentName}>'
});

export const Default = Template.bind({});

Default.play = async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByTestId('${name}-ref');

    await step('测试组件渲染', async () => {
        expect(component).toBeInTheDocument();
    });

    await step('测试点击事件', async () => {
        await userEvent.click(component);
    });
};

export default meta;`;
}
