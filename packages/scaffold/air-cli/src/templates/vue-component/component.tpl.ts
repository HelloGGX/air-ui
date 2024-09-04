import type { TemplateFunction } from '../../utils/types';

const templateFn: TemplateFunction = function ({ name: componentName }) {
    componentName = componentName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());

    return {
        filename: `${componentName}.vue`,
        contents: `<template>
  <div :class="prefixCls">{{ componentName }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ${componentName}Props } from './interface';

defineOptions({ name: ${componentName} });
const props = defineProps(${componentName}Props);
</script>
`
    };
};

export default templateFn;
