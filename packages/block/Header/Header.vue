<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="text-2xl font-bold">{{props.title}}</div>
    <nav>
      <ul class="flex space-x-4">
        <li><a href="#" class="hover:underline">Home</a></li>
        <li><a href="#" class="hover:underline">About</a></li>
        <li><a href="#" class="hover:underline">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import Button from '@air-ui/button'; 

const props = defineProps({
  title: {
    type: String,
    default: 'My Application'
  }
});
</script>

<style scoped>
/* 这里可以根据需要添加额外的样式 */
</style>
