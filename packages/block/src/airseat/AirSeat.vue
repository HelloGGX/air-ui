<template>
  <div id="airseat" @click="handleClick">
{{ props.title }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '../theme/index.scss';

defineOptions({ name: 'AirSeat' });
const airseatRef = ref<HTMLElement>();

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

defineExpose({ airseatRef });

</script>
