<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Client Render Page</h1>

    <div
      v-if="pending"
      class="text-center"
    >
      Loading...
    </div>

    <div
      v-else-if="error"
      class="text-red-500"
    >
      Error: {{ error?.message || 'An error occurred' }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div>The initial load time is {{ initialLoadTime }}</div>
      <ItemCard
        v-for="item in data?.items.slice(0, 100)"
        :key="item.id"
        :item="item"
      />
    </div>

    <div class="mt-4 text-center text-gray-600">
      Total Items: {{ Math.min(data?.total || 0, 100) }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  category: string;
}

interface ApiResponse {
  items: Item[];
  total: number;
  timestamp: string;
}

// Use ref to store the data
const data = ref<ApiResponse | null>(null);
const pending = ref(true);
const error = ref<Error | null>(null);

const initialLoadTime = ref<string | null>(null);

// Fetch data on client-side only
onMounted(async () => {
  try {
    const response = await fetch('/api/items');
    if (!response.ok) throw new Error('Failed to fetch data');
    data.value = await response.json();
    nextTick(() => {
      const endTime = performance.now();
      const navigation = performance.getEntriesByType('navigation')[0];
      const startTime = navigation?.startTime;
      initialLoadTime.value = `Request took ${(
        endTime - startTime
      ).toFixed()}ms`;
    });
  } catch (e) {
    error.value =
      e instanceof Error ? e : new Error('An unknown error occurred');
  } finally {
    pending.value = false;
  }
});
</script>
