<template>
  <div class="w-full relative md:w-40">
    <template v-if="loading">
      <div class="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
    </template>
    <template v-else>
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
      >
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  currencies: {
    type: Array,
    default: () => ['USD', 'EUR', 'NGN', 'JPY', 'BTC', 'GBP', 'AUD', 'CAD', 'CNY', 'INR']
  },
})

const emit = defineEmits(['update:modelValue'])

const loading = ref(false)

watch(() => props.modelValue, () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 800) 
})
</script>
