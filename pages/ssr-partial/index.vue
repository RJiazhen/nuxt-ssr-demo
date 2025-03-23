<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">SSR Partial Page</h1>
      <HomeButton />
    </div>

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
          <div class="mb-4">
            <h2 class="text-xl font-bold">Items (Client Rendered)</h2>
          </div>

          <div
            v-if="pending"
            class="text-center py-8 text-gray-600"
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
                @show-detail="handleShowDetail"
              />
            </template>
          </div>
        </div>
      </ClientOnly>
    </div>

    <!-- Item Detail Modal -->
    <ItemDetail ref="itemDetail" />
  </div>
</template>

<script setup lang="ts">
import ItemCard from '~/components/ItemCard.vue';
import ItemCard2 from '~/components/ItemCard2.vue';
import ItemDetail from '~/components/ItemDetail.vue';
import HomeButton from '~/components/HomeButton.vue';

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

// Add state for selected item and modal
const itemDetail = ref<InstanceType<typeof ItemDetail>>();

// Handler for showing item detail
const handleShowDetail = (item: Item) => {
  itemDetail.value?.open(item);
};
</script>
