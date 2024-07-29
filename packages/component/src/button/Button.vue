<template>
  <button :class="buttonClasses" type="button" @click="onClick" :style="style">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { reactive, computed, defineProps, defineEmits } from 'vue';
import type { ButtonProps } from './Button'


defineOptions({
  name: 'air-button',
})

const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
})
const props = withDefaults(defineProps<ButtonProps>(), {
  label: "Button",
  primary: true,
  size: "medium"
})

// 使用 reactive 将 props 转换为响应式对象
const state = reactive(props);

// 计算 buttonClasses
const buttonClasses = computed(() => {
  const baseClasses = 'font-bold rounded text-white';
  const primaryClasses = 'bg-blue-500 hover:bg-blue-700';
  const secondaryClasses = 'bg-gray-500 hover:bg-gray-700';

  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };

  return `${baseClasses} ${state.primary ? primaryClasses : secondaryClasses} ${sizeClasses[state.size || 'medium']}`;
});

// 计算 style
const style = computed(() => ({
  backgroundColor: state.backgroundColor,
}));

// 定义 onClick 方法
const onClick = (event: MouseEvent) => {
  emit('click', event);
};

</script>

