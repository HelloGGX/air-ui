<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="text-2xl font-bold">{{ props.title }}</div>
    <nav>
      <ul class="flex space-x-4">
        <li><a href="#" class="hover:underline">
            <AirButton size="large" type="primary">Home</AirButton>
          </a></li>
        <li><a href="#" class="hover:underline">
            <AirButton size="large" type="success">About</AirButton>
          </a></li>
        <li><a href="#" class="hover:underline">
            <AirButton size="large" type="danger" :disabled="true">Other</AirButton>
          </a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { AirButton } from '@air-ui/component';

const props = defineProps({
  title: {
    type: String,
    default: 'Logo'
  }
});
</script>

<style scoped>
/* 这里可以根据需要添加额外的样式 */
</style>
