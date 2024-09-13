<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <span>1</span>
        <span>zhagnsan</span>
      </div>
      <div @click="handleClose">
        x
      </div>
    </div>
    <div>
      33b
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
  backgroundColor: {
    type: String,
    default: undefined
  },
  textColor: {
    type: String,
    default: undefined
  },
  showClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits<{
  (e: "close"): void
}>();

const id = ref(`air-card-${Date.now()}`);

function handleClose() {
  emit("close")
}
</script>