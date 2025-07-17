<template>
  <div class="text-white space-y-2">
    <p class="text-xs text-gray-400 ">
      Last Updated: {{ formattedTime }}
    </p>

    <div class="flex bg-[#1E293B] rounded-lg p-1 gap-2 w-fit mb-6">
      <button @click="setActive('all')" :class="buttonClass('all')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.7 0-3 1.3-3 3v3h6v-3c0-1.7-1.3-3-3-3z" />
        </svg>
      </button>

      <button @click="setActive('gainers')" :class="buttonClass('gainers')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 12l6-6m0 0l6 6m-6-6v12" />
        </svg>
      </button>

      <button @click="setActive('losers')" :class="buttonClass('losers')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 12l-6 6m0 0l-6-6m6 6V6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps(['modelValue']) 
const emit = defineEmits(['update:modelValue', 'updated'])

const activeTab = ref(props.modelValue)
const lastUpdated = ref(new Date())

watch(() => props.modelValue, (val) => {
  activeTab.value = val
  lastUpdated.value = new Date()
})

const setActive = (tab) => {
  emit('update:modelValue', tab)
  emit('updated', new Date())
}

const formattedTime = computed(() =>
  lastUpdated.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
)

const buttonClass = (tab) => {
  return `p-2 rounded-md transition ${
    activeTab.value === tab ? 'bg-[#0F172A]' : 'hover:bg-[#334155]'
  }`
}
</script>
