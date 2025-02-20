import { minifyHtml } from '../../utils';

interface TemplateParams {
    componentName: string;
    name: string;
    componentTypes: string[];
    businessScenes: string[];
    description: string;
}

export default function generateSnippetStories({
    componentName,
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

const meta: Meta = {
    title: '物料库/${componentName}',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: \`${tagsHtml}\`
            },
            source: {
                type: 'code',
                code: \`
<div class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
    <div class="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
      <div class="aspect-577/310 w-[36.0625rem] bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)" />
    </div>
    <div class="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
      <div class="aspect-577/310 w-[36.0625rem] bg-linear-to-r from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)" />
    </div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p class="text-sm/6 text-gray-900">
        <strong class="font-semibold">GeneriCon 2023</strong><svg viewBox="0 0 2 2" class="mx-2 inline size-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>Join us in Denver from June 7 – 9 to see what’s coming next.
      </p>
      <a href="#" class="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">Register now <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="flex flex-1 justify-end">
      <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
        <span class="sr-only">Dismiss</span>
        <span class="size-5 text-gray-900" aria-hidden="true" />
      </button>
    </div>
  </div>\`
            }
        }
    },
};

const Template: StoryFn = () => ({
    template: meta?.parameters?.docs.source.code
});

export const Default = Template.bind({});
export default meta;`;
}
