<template>
    <button 
        :class="buttonClasses" 
        :disabled="isDisabled" 
        @click="handleClick" 
        ref="buttonRef"
    >
        <!-- 显示加载图标 -->
        <template v-if="props.loading">
            <el-icon :size="props.size">
                <component :is="props.loadingIcon" />
            </el-icon>
        </template>
        <!-- 显示按钮内容 -->
        <slot v-else />
    </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { buttonProps, buttonEmits } from './Button';
import { ElIcon } from 'element-plus';
import 'element-plus/es/components/icon/style/css';

defineOptions({ name: 'AirButton' });

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);


const buttonRef = ref<HTMLButtonElement>();

// 处理按钮点击事件
const handleClick = (event: MouseEvent) => {
    if (!isDisabled) {
        emit('click', event);
    }
};

// 计算按钮是否禁用
const isDisabled = computed(() => props.disabled || props.loading);

// 计算按钮的类名
const buttonClasses = computed(() => {
    const baseClasses = 'px-4 py-2 rounded transition-colors duration-300';
    const typeClasses = {
        default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        primary: 'bg-primary-700 text-white hover:bg-blue-700',
        success: 'bg-green-500 text-white hover:bg-green-700',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-700',
        info: 'bg-teal-500 text-white hover:bg-teal-700',
        danger: 'bg-red-500 text-white hover:bg-red-700',
    };
    const sizeClasses = {
        small: 'text-sm',
        default: 'text-base',
        large: 'text-lg',
    };
    const stateClasses = {
        disabled: 'cursor-not-allowed opacity-50',
        loading: 'cursor-wait',
    };

    return [
        baseClasses,
        typeClasses[props.type || 'default'],
        sizeClasses[props.size || 'default'],
        isDisabled.value ? stateClasses.disabled : '',
        props.loading ? stateClasses.loading : '',
    ].filter(Boolean).join(' ');
});

defineExpose({ buttonRef });
</script>
