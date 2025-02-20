import { minifyHtml } from '../../utils';

interface TemplateParams {
    componentName: string;
    name: string;
    componentTypes: string[];
    businessScenes: string[];
    description: string;
}

export default function generateStories({
    componentName,
    name,
    componentTypes,
    businessScenes,
    description
}: TemplateParams): string {
    const tagsHtml = minifyHtml(`
        <div class="space-y-4">
            <p class="text-lg font-semibold">${description}</p>
            <div class="flex gap-2">
                <div class="flex flex-wrap gap-2">
                    ${componentTypes
                        .map(
                            (type) => `
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ${type}
                        </span>
                    `
                        )
                        .join('')}
                </div>
                <div class="flex flex-wrap gap-2">
                    ${businessScenes
                        .map(
                            (scene) => `
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            ${scene}
                        </span>
                    `
                        )
                        .join('')}
                </div>
            </div>
        </div>
    `);

    return `import type { Meta, StoryFn } from '@storybook/vue3';
import ${componentName} from './${componentName}.vue';
import { userEvent, within, expect } from '@storybook/test';

const meta: Meta<typeof ${componentName}> = {
    title: '物料库/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: \`${tagsHtml}\`
            }
        }
    },
    argTypes: {
        title: {
            control: { type: 'text' },
            description: '标题',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'placeholder' }
            }
        },
    },
    args: {
        title: '旅客姓名',
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
