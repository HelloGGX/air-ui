<template>
  <button :class="[
    'air-btn',
    buttonSizeClass,
    buttonTypeClass,
    { 'air-btn--disabled': isDisabled },
  ]" :style="buttonStyle" @click="handleClick" :disabled="isDisabled">
    <!-- Loading 图标显示在按钮的右侧 -->
    <span v-if="props.loading" class="air-btn__loading">
      <ElIcon class="air-btn__icon--spin-right">
        <component :is="props.loadingIcon" />
      </ElIcon>
    </span>

    <slot />



  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { buttonProps, buttonEmits } from './Button';
import { ElIcon } from 'element-plus';

defineOptions({ name: 'AirButton' });

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);

const buttonRef = ref<HTMLButtonElement>();

// 计算按钮的禁用状态
const isDisabled = computed(() => props.disabled);

// 按钮类型与大小类映射
const buttonTypes = {
  primary: 'air-btn--primary',
  success: 'air-btn--success',
  danger: 'air-btn--danger',
  warning: 'air-btn--warning',
  info: 'air-btn--info',
  default: 'air-btn--default',
};

const buttonSizes = {
  small: 'air-btn--small',
  large: 'air-btn--large',
  default: 'air-btn--default-size',
};

// 计算按钮类型的类
const buttonTypeClass = computed(() => buttonTypes[props.type || 'default']);

// 计算按钮大小的类
const buttonSizeClass = computed(() => buttonSizes[props.size || 'default']);

// 动态计算按钮的样式
const buttonStyle = computed(() => {
  return {
    backgroundColor: props.color,
    borderRadius: props.round? 'var(--radius-full)': 'var(--radius-base)'
  };
});

// 处理按钮点击事件
const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event);
  }
};

defineExpose({ buttonRef });
</script>
