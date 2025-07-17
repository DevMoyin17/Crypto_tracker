<template>
  <div v-if="coin" class="min-h-screen text-white px-5 py-6 max-w-6xl mx-auto ">
    <button @click="$router.back()" class="text-blue-400 mb-4 hover:underline">&larr; Back to list</button>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2 space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg p-6  ">
        <div class="flex items-center gap-4  ">
          <img :src="coin.image.large" :alt="coin.name" class="w-12 h-12" />
          <div>
            <h2 class="text-2xl font-bold">{{ coin.name }} <span class="text-sm bg-gray-700 px-2 py-1 rounded">Rank #{{ coin.market_cap_rank }}</span></h2>
            <p class="uppercase text-sm text-gray-400">{{ coin.symbol }}</p>
            <div class="flex gap-4 mt-1 text-blue-400 text-sm">
              <a :href="coin.links.homepage[0]" target="_blank">Website</a>
              <a :href="coin.links.blockchain_site[0]" target="_blank">Explorer</a>
              <a :href="coin.links.repos_url.github[0]" target="_blank">Github</a>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div class="bg-gray-800 rounded p-4">
            <p class="text-sm text-gray-400">Market Cap</p>
            <p class="text-xl font-semibold">${{ coin.market_data.market_cap.usd.toLocaleString() }}</p>
          </div>
          <div class="bg-gray-800 rounded p-4">
            <p class="text-sm text-gray-400">24h Volume</p>
            <p class="text-xl font-semibold">${{ coin.market_data.total_volume.usd.toLocaleString() }}</p>
          </div>
          <div class="bg-gray-800 rounded p-4">
            <p class="text-sm text-gray-400">Circulating Supply</p>
            <p class="text-xl font-semibold">{{ coin.market_data.circulating_supply.toLocaleString() }}</p>
          </div>
          <div class="bg-gray-800 rounded p-4">
            <p class="text-sm text-gray-400">Max Supply</p>
            <p class="text-xl font-semibold">{{ coin.market_data.max_supply?.toLocaleString() || 'N/A' }}</p>
          </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-xl">
          <h3 class="text-lg font-semibold mb-2">About {{ coin.name }}</h3>
          <p class="text-gray-300 text-sm" v-html="coin.description.en"></p>
        </div>
      </div>

      <div class="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg p-6 ">
        <div class="bg-gray-800 p-4 rounded-xl">
          <h3 class="text-lg font-semibold mb-2">{{ coin.name }} Price</h3>
          <p class="text-2xl font-bold">${{ coin.market_data.current_price.usd.toLocaleString() }}</p>
          <p
            class="text-sm mt-1"
            :class="coin.market_data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'"
          >
            {{ coin.market_data.price_change_percentage_24h.toFixed(2) }}%
          </p>
        </div>

        <div class="bg-gray-800 p-4 rounded-xl space-y-2">
          <h3 class="text-lg font-semibold">Stats</h3>
          <div class="text-sm text-gray-400">
            <p>ATH: <span class="text-white">${{ coin.market_data.ath.usd.toLocaleString() }}</span></p>
            <p>ATH Change: 
              <span
                :class="coin.market_data.ath_change_percentage.usd >= 0 ? 'text-green-400' : 'text-red-400'"
              >
                {{ coin.market_data.ath_change_percentage.usd.toFixed(2) }}%
              </span>
            </p>
            <p>ATH Date: <span class="text-white">{{ new Date(coin.market_data.ath_date.usd).toLocaleDateString() }}</span></p>
            <p>ATL: <span class="text-white">${{ coin.market_data.atl.usd.toLocaleString() }}</span></p>
            <p>ATL Change:
              <span
                :class="coin.market_data.atl_change_percentage.usd >= 0 ? 'text-green-400' : 'text-red-400'"
              >
                {{ coin.market_data.atl_change_percentage.usd.toFixed(2) }}%
              </span>
            </p>
            <p>ATL Date: <span class="text-white">{{ new Date(coin.market_data.atl_date.usd).toLocaleDateString() }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center text-white">
    Loading coin details...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const coin = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${route.params.id}`)
    coin.value = res.data
  } catch (err) {
    console.error("Failed to fetch coin data", err)
  }
})
</script>
