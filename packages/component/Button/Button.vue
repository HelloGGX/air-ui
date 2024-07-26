<template>
  <button 
    :class="buttonClasses" 
    type="button" 
    @click="onClick" 
    :style="style">
    {{ label }}
  </button>
</template>

<script setup>
import { reactive, computed } from 'vue';

// 定义 props
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator: function (value) {
      return ['small', 'medium', 'large'].indexOf(value) !== -1;
    },
  },
  backgroundColor: {
    type: String,
  },
});

// 定义 emits
const emit = defineEmits(['click']);

// 使用 reactive 将 props 转换为响应式对象
const state = reactive(props);

// 计算 buttonClasses
const buttonClasses = computed(() => {
  let baseClasses = 'font-bold rounded text-white';
  let primaryClasses = 'bg-blue-500 hover:bg-blue-700';
  let secondaryClasses = 'bg-gray-500 hover:bg-gray-700';

  let sizeClasses = {
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
const onClick = () => {
  emit('click');
};

</script>

<style scoped>
/* 可以根据需要在这里添加额外的样式 */
</style>
