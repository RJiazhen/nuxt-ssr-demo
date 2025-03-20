<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">SSR Partial Page</h1>

    <!-- Server-rendered section -->
    <div class="grid grid-cols-12 gap-4">
      <!-- User info section - Server rendered -->
      <div class="col-span-full mb-6">
        <UserInfoCard :user="userData?.user" />
      </div>

      <div
        v-if="userData?.user?.isPremium"
        class="col-span-full mb-6"
      >
        <PremiumMemberCard :user="userData?.user" />
      </div>

      <!-- Member discount section - Server rendered -->
      <div
        v-else
        class="col-span-full mb-6"
      >
        <MemberDiscountCard :user="userData?.user" />
      </div>

      <!-- Items section - Client rendered -->
      <ClientOnly>
        <div class="col-span-full">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Items (Client Rendered)</h2>
            <div class="text-sm text-gray-500">
              Request time: {{ requestTime }}ms
            </div>
          </div>

          <div
            v-if="pending"
            class="text-center py-8"
          >
            Loading items...
          </div>
          <div
            v-else-if="error"
            class="text-center py-8 text-red-500"
          >
            Error loading items: {{ error }}
          </div>
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <template
              v-for="item in (itemsData?.items || []).slice(0, 10)"
              :key="item.id"
            >
              <component
                :is="
                  userData?.user?.itemCardType === '2' ? ItemCard2 : ItemCard
                "
                :item="item"
                :user="userData?.user"
              />
            </template>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '~/components/ItemCard.vue';
import ItemCard2 from '~/components/ItemCard2.vue';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  itemCardType: string;
  level: number;
  isPremium: boolean;
  premiumStartDate: string;
  premiumEndDate: string;
  premiumFeatures: string[];
}

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

// Server-side data fetching for user
const { data: userData } = await useFetch<{ user: User }>('/api/user');

// Client-side data fetching for items
const {
  pending,
  error,
  data: itemsData,
  refresh,
} = await useLazyFetch<ApiResponse>('/api/items', {
  default: () => ({ items: [], total: 0, timestamp: '' }),
});

console.log(itemsData.value);

// Track request time
const requestTime = ref(0);
const startTime = Date.now();

onMounted(() => {
  requestTime.value = Date.now() - startTime;
});
</script>
