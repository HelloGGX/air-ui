<template>
  <button
    :class="[
      'btn',
      buttonSizeClass,
      buttonTypeClass,
      { 'btn-disabled': isDisabled },
      { 'rounded-full': props.round },
      { 'relative': props.loading }
    ]"
    :style="{ backgroundColor: props.color }"
    @click="handleClick"
    :disabled="isDisabled"
  >
    <span v-if="props.loading" class="absolute inset-0 flex items-center justify-center">
      <ElIcon :component="props.loadingIcon" class="animate-spin h-4 w-4" />
    </span>
    <span v-if="!props.loading && props.leftIcon" class="left-icon">
      <img v-if="isString(props.leftIcon)" :src="props.leftIcon" alt="left icon" class="icon-class" />
      <component v-else :is="props.leftIcon" class="icon-class" />
    </span>
    <slot />
    <span v-if="!props.loading && props.rightIcon" class="right-icon">
      <img v-if="isString(props.rightIcon)" :src="props.rightIcon" alt="right icon" class="icon-class" />
      <component v-else :is="props.rightIcon" class="icon-class" />
    </span>
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

// 计算按钮的禁用状态
const isDisabled = computed(() => props.disabled || props.loading);

// 检查是否为字符串类型（本地图片路径）
const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

// 按钮类型与大小类映射
const buttonTypes = {
  primary: 'btn-primary',
  success: 'btn-success',
  danger: 'btn-danger',
  warning: 'btn-warning',
  info: 'btn-info',
  default: 'btn-default',
};

const buttonSizes = {
  small: 'btn-small',
  large: 'btn-large',
  default: 'btn-default-size',
};

// 计算按钮类型的类
const buttonTypeClass = computed(() => buttonTypes[props.type || 'default']);

// 计算按钮大小的类
const buttonSizeClass = computed(() => buttonSizes[props.size || 'default']);

// 处理按钮点击事件
const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event);
  }
};

defineExpose({ buttonRef });
</script>
