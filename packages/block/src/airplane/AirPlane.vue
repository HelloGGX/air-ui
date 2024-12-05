<template>
  <div class="bg-white rounded-lg p-4 flex items-center justify-between max-w-4xl mx-auto">
    <div></div>
    <div class="w-80 flex flex-col">
      <div class="w-40 h-40 rounded-full bg-orange-400"></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'AirPlane' });
const airplaneRef = ref<HTMLElement>();

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});
const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent
});

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

defineExpose({ airplaneRef });

</script>
