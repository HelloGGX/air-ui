<template>
    <div data-testid="airbg-ref" class="airbg">
        {{ props.title }}
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'AirBg' });
const airbgRef = ref<HTMLElement>();

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

defineExpose({ airbgRef });
</script>

<style scoped>
.airbg {
    /* 基础样式 */
}
</style>