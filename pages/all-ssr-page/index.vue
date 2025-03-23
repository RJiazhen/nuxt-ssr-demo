<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">All SSR Page</h1>
      <HomeButton />
    </div>

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
      <div class="col-span-full mb-6">
        <UserInfoCard :user="userData?.user" />
      </div>
      <div
        v-if="userData?.user?.isPremium"
        class="col-span-full mb-6"
      >
        <PremiumMemberCard :user="userData?.user" />
      </div>
      <div
        v-else
        class="col-span-full mb-6"
      >
        <MemberDiscountCard :user="userData?.user" />
      </div>
      <div
        v-if="userData?.user?.itemCardType === '1'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <ItemCard
          v-for="item in data?.items.slice(0, 100)"
          :key="item.id"
          :item="item"
          @show-detail="handleShowDetail"
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
          @show-detail="handleShowDetail"
        />
      </div>
    </div>

    <div class="mt-4 text-center text-gray-600">
      Total Items: {{ Math.min(data?.total || 0, 100) }}
    </div>

    <!-- Item Detail Modal -->
    <ItemDetail ref="itemDetail" />
  </div>
</template>

<script setup lang="ts">
import ItemDetail from '~/components/ItemDetail.vue';
import HomeButton from '~/components/HomeButton.vue';

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
  premiumStartDate: string;
  premiumEndDate: string;
  premiumFeatures: string[];
}

interface UserResponse {
  user: User;
  visibleItems: number[];
  timestamp: string;
}

const { data, pending, error } = await useFetch<ApiResponse>('/api/items');
const {
  data: userData,
  pending: userPending,
  error: userError,
} = await useFetch<UserResponse>('/api/user');

// Add state for item detail modal
const itemDetail = ref<InstanceType<typeof ItemDetail>>();

// Handler for showing item detail
const handleShowDetail = (item: Item) => {
  itemDetail.value?.open(item);
};
</script>
