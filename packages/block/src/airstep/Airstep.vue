<template>
  <div class="flex items-center justify-between max-w-4xl mx-auto">
    <div v-for="(step, index) in steps" :key="index" class="flex flex-col flex-1 " :class="isCenter ? 'items-center':''">
      <!-- <div class="relative w-full"> -->
      <div class="flex items-center w-full">
        <div v-if="isCenter" :class="[
          'flex-1 h-0.5',
          index === 0 ? '' : (index < active) ? 'bg-primary-500' : 'bg-gray-300',
        ]"></div>
        <div :class="[
          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
          index < active ? 'bg-primary-500 text-white-800' : 'bg-gray-300 text-white-800'
        ]">
          <template v-if="index < active - 1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </template>
          <template v-else>
            {{ index + 1 }}
          </template>
        </div>
        <div :class="[
          'flex-1 h-0.5',
          index === steps.length - 1 ? '' : index < active - 1 ? 'bg-primary-500' : 'bg-gray-300'
        ]"></div>
      </div>

      <div class="mt-2 text-sm font-medium" :class="index < active ? 'text-primary-500' : 'text-gray-600'">
        {{ step ? step?.label : '' }}
      </div>
      <!-- </div> -->

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '../theme/index.scss';

defineOptions({ name: 'Airstep' });
const airstepRef = ref<HTMLElement>();

const props = defineProps({
  active: {
    type: Number,
    default: 0
  },
  isCenter: {
    type: Boolean,
    default: false
  },
  steps: {
    type: Array as ()=> { label: string }[],
    default: []
  }
});

// const isCenter = ref(false)
// cons 
const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent
});

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

defineExpose({ airstepRef });

</script>
