interface TemplateParams {
    componentName: string;

}

export function generateVue({ componentName }: TemplateParams): string {
    return `<template>
    <div data-testid="${componentName}-ref" @click="handleClick">
        {{ props.title }}
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: '${componentName}' });
const ${componentName}Ref = ref<HTMLElement>();

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

defineExpose({ ${componentName}Ref });
</script>
`;
}
