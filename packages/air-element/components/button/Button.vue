<template>
    <button :class="buttonClasses":disabled="props.disabled || props.loading" @click="onClick" ref="_ref">
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
import { buttonProps, buttonEmits } from './Button';
import { ElIcon } from 'element-plus';
import 'element-plus/es/components/icon/style/css';


defineOptions({
    name: 'AirButton'
});

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);

const onClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
        emit('click', event);
    }
};

const _ref = ref<HTMLButtonElement>();

const buttonClasses = computed(() => {
    const baseClasses = 'px-4 py-2 rounded transition-colors duration-300';
    const typeClasses = {
        default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        primary: 'bg-primary-700 text-white hover:bg-blue-700',
        success: 'bg-green-500 text-white hover:bg-green-700',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-700',
        info: 'bg-teal-500 text-white hover:bg-teal-700',
        danger: 'bg-red-500 text-white hover:bg-red-700'
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
