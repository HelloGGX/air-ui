import { minifyHtml } from '../../utils';
import generatePackage from './package';

interface TemplateParams {
    componentName: string;
    componentTypes: string[];
    businessScenes: string[];
    description: string;
}

export default function generateStories({
    componentName,
    componentTypes,
    businessScenes,
    description
}: TemplateParams): string {
    const packageJson = JSON.parse(generatePackage({ componentName }));
    const componentTypesHtml = componentTypes
        .map(
            (type) => `
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${type}</span>
        `
        )
        .join('');

    const businessScenesHtml = businessScenes
        .map(
            (scene) => `
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">${scene}</span>
        `
        )
        .join('');

    const descriptionTemplate = `
    <div class="flex justify-between items-start">
        <div class="flex-1 space-y-4">
            <p class="text-lg font-semibold">\${description}</p>
            <div class="flex justify-between items-center space-y-4">
                <div class="flex flex-wrap gap-2">
                    ${componentTypesHtml}
                    ${businessScenesHtml}
                </div>
                <code class="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded">npm i ${packageJson.name}</code>
            </div>
        </div>
    </div>`;

    return `import type { Meta, StoryFn } from '@storybook/vue3';
import ${componentName} from './${componentName}.vue';
import { userEvent, within, expect } from '@storybook/test';

const description = '${description}';

const meta: Meta<typeof ${componentName}> = {
    title: '物料库/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: \`${minifyHtml(descriptionTemplate)}\`
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
    const component = canvas.getByTestId('${componentName.toLowerCase()}-ref');

    await step('测试组件渲染', async () => {
        expect(component).toBeInTheDocument();
    });

    await step('测试点击事件', async () => {
        await userEvent.click(component);
    });
};

export default meta;`;
}
