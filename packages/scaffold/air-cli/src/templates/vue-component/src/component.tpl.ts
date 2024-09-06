import { TemplateFunction } from '../../../types';

const templateFn: TemplateFunction = function ({ name: componentName, useTailwindCSS, componentLibrary }) {
    componentName = componentName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());

    let imports = `import { defineProps } from 'vue';\nimport { ${componentName}Props } from './interface';`;
    let classNames = '';

    if (useTailwindCSS) {
        classNames = ' class="p-4 bg-gray-100 rounded-lg shadow-md"';
    }

    if (componentLibrary === 'element-plus') {
        imports += `\nimport { ElButton } from 'element-plus';`;
    } else if (componentLibrary === 'air-element') {
        imports += `\nimport { AirButton } from '@air-ui/air-element';`;
    } else if (componentLibrary === 'headless-ui') {
        imports += `\nimport { Menu } from '@headlessui/vue';`;
    }

    return {
        filename: `${componentName}.vue`,
        contents: `<template>
  <div${classNames}>
    <p>Edit this component</p>
    ${
        componentLibrary === 'element-plus'
            ? '<ElButton>Element Plus Button</ElButton>'
            : componentLibrary === 'air-element'
              ? '<AirButton>Air Element Button</AButton>'
              : componentLibrary === 'headless-ui'
                ? '<Menu><Menu.Button>Headless UI Menu</Menu.Button></Menu>'
                : ''
    }
  </div>
</template>

<script lang="ts" setup>
${imports}

const props = defineProps<${componentName}Props>();
</script>

${
    useTailwindCSS
        ? ''
        : `<style scoped>
/* Add component styles here */
</style>`
}
`
    };
};

export default templateFn;
