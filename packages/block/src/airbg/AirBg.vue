<template>
    <div data-testid="undefined-ref" @click="handleClick">
        {{ props.title }}
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'AirBg' });
const undefinedRef = ref<HTMLElement>();

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

defineExpose({ undefinedRef });
</script>
