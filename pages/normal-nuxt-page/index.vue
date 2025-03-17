<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Normal Nuxt Page</h1>

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
      Error: {{ error.message }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div class="col-span-full text-center mb-4">
        Initial HTML Response Time: {{ initialLoadTime }}
      </div>
      <div
        v-for="item in data?.items.slice(0, 100)"
        :key="item.id"
        class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
        <p class="text-gray-600 mb-2">{{ item.description }}</p>
        <div class="flex justify-between items-center text-sm text-gray-500">
          <span>{{ item.category }}</span>
          <span>{{ new Date(item.createdAt).toLocaleDateString() }}</span>
        </div>
      </div>
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

const initialLoadTime = ref<string | null>(null);

// Measure the initial HTML load time
onMounted(() => {
  const navigation = performance.getEntriesByType(
    'navigation',
  )[0] as PerformanceNavigationTiming;
  if (navigation) {
    const loadEventEnd = navigation.loadEventEnd;
    const startTime = navigation.startTime;
    initialLoadTime.value = `HTML Response took ${(
      loadEventEnd - startTime
    ).toFixed(2)}ms`;
  }
});

const { data, pending, error } = await useFetch<ApiResponse>('/api/items');
</script>
