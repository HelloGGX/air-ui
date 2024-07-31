<template>
  <button class="bg-blue-500 hover:bg-blue-700" type="button" @click="onClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import  { buttonProps, buttonEmits } from './Button'


defineOptions({
  name: 'AirButton',
})

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);


// 定义 onClick 方法
const onClick = (event: MouseEvent) => {
  emit('click', event);
};

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})

</script>

