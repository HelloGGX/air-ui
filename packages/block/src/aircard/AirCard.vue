<template>
  <div class="border border-solid border-gay-300 px-3 rounded-lg " :style="{ height, width }" @click="selectPsg"
    :class="isSelect ? 'bg-primary-500 text-white' : 'text-gray-600'">
    <div class="flex items-center justify-between">
      <div class="" style="">
        <span>{{ num }}.</span>
        <span>{{ name }}</span>
      </div>
      <div v-show="showClose" @click="handleClose">
        <!-- 点击状态 -->
        <svg v-if="isSelect" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 8.586L7.172 5.757L5.757 7.172L8.586 10L5.757 12.828L7.172 14.243L10 11.414L12.828 14.243L14.243 12.828L11.414 10L14.243 7.172L12.828 5.757L10 8.586Z"
            fill="white" fill-opacity="0.48" />
        </svg>
        <!-- 未点击状态 -->
        <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 8.586L7.172 5.757L5.757 7.172L8.586 10L5.757 12.828L7.172 14.243L10 11.414L12.828 14.243L14.243 12.828L11.414 10L14.243 7.172L12.828 5.757L10 8.586Z"
            fill="#B1B5BD" />
        </svg>
      </div>
    </div>
    <div class="font-bold">
      {{ seatNum }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '../theme/index.scss';

const props = defineProps({
  num: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    default: undefined
  },
  seatNum: {
    type: String,
    default: undefined
  },
  height: {
    type: String,
    default: "74px",
  },
  width: {
    type: String,
    default: "200px"
  },
  showClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits<{
  (e: "close"): void
  (e: "select"): void
}>();

const id = ref(`air-card-${Date.now()}`);

const isSelect = ref(false)

function handleClose() {
  emit("close");
}

function selectPsg() {
  emit("select");
  isSelect.value = !isSelect.value
}

</script>