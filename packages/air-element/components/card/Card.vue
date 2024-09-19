<template>
    <button :class="buttonClasses" :disabled="props.disabled || props.loading" @click="onClick" ref="_ref">
        <template v-if="props.loading">
            <el-icon :size="props.size">
                <component :is="props.loadingIcon" />
            </el-icon>
        </template>
        <slot v-else />
    </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { cardProps, cardEmits } from './Card';
import { ElIcon } from 'element-plus';

defineOptions({
    name: 'AirCard'
});

const props = defineProps(cardProps);
const emit = defineEmits(cardEmits);

const onClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
        emit('click', event);
    }
};

const _ref = ref<HTMLButtonElement>();

const buttonClasses = computed(() => {
    const baseClasses = 'card-primary px-4 py-2 rounded transition-colors duration-300';
    const typeClasses = {
        default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        primary: 'bg-blue-500 text-white-800 hover:bg-blue-700',
        success: 'bg-green-500 text-white-800 hover:bg-green-700',
        warning: 'bg-yellow-500 text-white-800 hover:bg-yellow-700',
        info: 'bg-teal-500 text-white-800 hover:bg-teal-700',
        danger: 'bg-red-500 text-white-800 hover:bg-red-700'
    };
    const sizeClasses = {
        small: 'text-sm',
        default: 'text-base',
        large: 'text-lg'
    };
    const disabledClasses = 'cursor-not-allowed opacity-50';
    const loadingClasses = 'cursor-wait';

    return [
        baseClasses,
        typeClasses[props.type || 'default'],
        sizeClasses[props.size || 'default'],
        props.disabled || props.loading ? disabledClasses : '',
        props.loading ? loadingClasses : ''
    ].join(' ');
});

defineExpose({
    ref: _ref
});
</script>
