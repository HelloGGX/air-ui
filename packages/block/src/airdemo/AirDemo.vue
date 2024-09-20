<template>
  <div id="airdemo" @click="handleClick">
    {{ props.title }}
  </div>
  <AirSeat title="123" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AirSeat from 'block/airseat';
import '../theme/index.scss';

defineOptions({ name: 'AirDemo' });
const airdemoRef = ref<HTMLElement>();

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

defineExpose({ airdemoRef });

</script>
