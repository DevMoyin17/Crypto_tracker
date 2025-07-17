<!-- RefreshButton.vue (Reusable) -->
<template>
  <button
    @click="$emit('refresh')"
    class="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin-once" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582M20 20v-5h-.581M5 19a9 9 0 1014-14" />
    </svg>
    Refresh
  </button>
</template>

<script setup>
defineEmits(['refresh'])
</script>

<style scoped>
/* Optional one-time spin animation on click */
.animate-spin-once {
  transition: transform 0.5s ease;
}
button:active .animate-spin-once {
  transform: rotate(360deg);
}
</style>
