<template>
  <router-link :to="`/coin/${coin.id}`">
    <div class="relative border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition">
      
      <span class="absolute top-3 right-2 text-sm bg-gray-700 text-white px-2 py-1 rounded-full shadow">
        Rank #{{ coin.market_cap_rank }}
      </span>

      <div class="flex items-center gap-4 mb-3">
        <img :src="coin.image" :alt="coin.name" class="w-10 h-10 rounded-full" />
        <div>
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{{ coin.name }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ coin.symbol.toUpperCase() }}</p>
        </div>
      </div>

      <div class="space-y-1">
        <p class="text-base font-semibold text-gray-900 dark:text-gray-100">
            {{ formatCurrency(coin.current_price, currency) }}
        </p>
       
        <p
          class="text-sm font-medium"
          :class="coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'"
        >
          {{ coin.price_change_percentage_24h >= 0 ? '▲' : '▼' }}
          {{ coin.price_change_percentage_24h.toFixed(2) }}%
        </p>
      </div>
    </div>
  </router-link>
</template>


<script setup>
import {formatCurrency} from '@/services/formatCurrency.js';
defineProps({
  coin: Object,
  currency:{
        type: String,
    default: 'USD',

  }
})
</script>
