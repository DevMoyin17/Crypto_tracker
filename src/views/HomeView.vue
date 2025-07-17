<template>
    <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold pl-6">
  Live Cryptocurrency Updates
</h1>
 

  <section class="px-5 py-6 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div class="w-full md:flex-1">
        <SearchBar
          v-model="searchQuery"
          placeholder="Search..."
          class="w-full"
        />
      </div>
      

      <div class="flex items-center gap-3 justify-end md:w-auto">
        <CurrencyPicker
          v-model="selectedCurrency"
          :currencies="['USD', 'EUR', 'NGN', 'JPY', 'BTC', 'GBP', 'AUD', 'CAD', 'CNY', 'INR']"
        />
        <RefreshButton @refresh="fetchCoins" />
      </div>
    </div>
    <div class="mb-4">
    <CryptoToggle v-model="activeTab" @updated="updateTime" />

    </div>
     <h6 class="text-xl font-semibold">
    {{ heading }}
  </h6>


    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <SkeletonCard v-for="i in 10" :key="i" />
    </div>

    <div
      v-else-if="filteredCoins.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <CoinCard
        v-for="coin in filteredCoins"
        :key="coin.id"
        :coin="coin"
        :currency="selectedCurrency"
      />
    </div>

    <!-- No result -->
    <p v-else class="text-gray-500 text-center text-lg">
      No cryptocurrencies found matching your criteria.
    </p>
  </section>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { getTopCoins } from '@/services/api.js';
import CoinCard from '@/components/CoinCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import CurrencyPicker from '@/components/CurrencyPicker.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';
import RefreshButton from '@/components/RefreshButton.vue';
import CryptoToggle from '@/components/CryptoToggle.vue';

const coins = ref([]);
const searchQuery = ref('');
const selectedCurrency = ref('USD');
const loading = ref(true);
const activeTab = ref('all');
const heading = ref('All Cryptocurrencies');
const lastUpdated = ref(new Date());

const updateTime = () => {
  lastUpdated.value = new Date();
};

const fetchCoins = async () => {
  loading.value = true;
  try {
    coins.value = await getTopCoins(selectedCurrency.value);
    heading.value = 'All Cryptocurrencies';
  } catch (err) {
    console.error('Error fetching coins:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCoins();
});

const filteredCoins = computed(() => {
  if (!searchQuery.value) return coins.value;
  return coins.value.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

watch(selectedCurrency, async (newCurrency) => {
  loading.value = true;
  try {
    coins.value = await getTopCoins(newCurrency);
    heading.value = getHeadingByTab(activeTab.value);
  } catch (err) {
    console.error('Error fetching coins:', err);
  } finally {
    loading.value = false;
  }
});

watch(activeTab, async (newTab) => {
  loading.value = true;
  try {
    const data = await getTopCoins(selectedCurrency.value);
    if (newTab === 'gainers') {
      coins.value = data
        .filter((c) => c.price_change_percentage_24h > 0)
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 10);
      heading.value = 'Top Coins';
    } else if (newTab === 'losers') {
      coins.value = data
        .filter((c) => c.price_change_percentage_24h < 0)
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 10);
      heading.value = 'Top Lost';
    } else {
      coins.value = data;
      heading.value = 'All Cryptocurrencies';
    }
  } catch (err) {
    console.error('Error fetching tab data:', err);
  } finally {
    loading.value = false;
  }
});

const getHeadingByTab = (tab) => {
  switch (tab) {
    case 'gainers':
      return 'Top Coins';
    case 'losers':
      return 'Top Lost';
    default:
      return 'All Cryptocurrencies';
  }
};
</script>
