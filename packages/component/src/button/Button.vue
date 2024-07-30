<template>
  <button class="bg-blue-500 hover:bg-blue-700" type="button" @click="onClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import  { buttonProps, buttonEmits } from './Button'


defineOptions({
  name: 'air-button',
})

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);


// 定义 onClick 方法
const onClick = (event: MouseEvent) => {
  emit('click', event);
};

</script>

