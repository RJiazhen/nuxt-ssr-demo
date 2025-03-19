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

    <div v-else>
      <div class="col-span-full text-center mb-4">
        Initial HTML Response Time: {{ initialLoadTime }}
      </div>
      <div class="col-span-full mb-6">
        <UserInfoCard :user="userData?.user" />
      </div>
      <div
        v-if="userData?.user?.itemCardType === '1'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <ItemCard
          v-for="item in data?.items.slice(0, 100)"
          :key="item.id"
          :item="item"
        />
      </div>
      <div
        v-if="userData?.user?.itemCardType === '2'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <ItemCard2
          v-for="item in data?.items.slice(0, 100)"
          :key="item.id"
          :item="item"
        />
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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  itemCardType: string;
  level: number;
  isPremium: boolean;
}

interface UserResponse {
  user: User;
  visibleItems: number[];
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
const {
  data: userData,
  pending: userPending,
  error: userError,
} = await useFetch<UserResponse>('/api/user');
</script>
