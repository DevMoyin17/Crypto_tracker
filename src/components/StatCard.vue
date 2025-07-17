<template>
  <div class="bg-gray-700 rounded-md p-4 text-center">
    <p class="text-xs text-gray-400">{{ title }}</p>
    <p class="font-semibold text-white">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps(['title', 'value'])
</script>
