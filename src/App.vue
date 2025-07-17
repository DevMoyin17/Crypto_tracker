<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import SunIcon from '@heroicons/vue/24/outline/SunIcon'
import MoonIcon from '@heroicons/vue/24/outline/MoonIcon'

const theme = useThemeStore()

onMounted(() => {
  theme.initTheme()
})
</script>

<template>
  <div :class="{ dark: theme.isDark }">
    <header class="flex justify-end p-4 ">
      <button
        @click="theme.toggleTheme"
        class="p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <component :is="theme.isDark ? SunIcon : MoonIcon" class="w-5 h-5 transition-transform duration-300" />
      </button>
    </header>

    <router-view />
  </div>
</template>
