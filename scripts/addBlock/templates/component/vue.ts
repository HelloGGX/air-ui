interface TemplateParams {
    componentName: string;
    name: string;
}

export default function generateVue({ componentName, name }: TemplateParams): string {
    return `<template>
    <div data-testid="${name}-ref" class="${name}">
        {{ props.title }}
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: '${componentName}' });
const ${name}Ref = ref<HTMLElement>();

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
});

const emit = defineEmits({
    click: (evt: MouseEvent) => evt instanceof MouseEvent
});

const handleClick = (event: MouseEvent) => {
    emit('click', event);
};

defineExpose({ ${name}Ref });
</script>

<style scoped>
.${name} {
    /* 基础样式 */
}
</style>`;
}
