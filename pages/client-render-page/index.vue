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

// Use ref to store the data
const data = ref<ApiResponse | null>(null);
const pending = ref(true);
const error = ref<Error | null>(null);
const userData = ref<UserResponse | null>(null);

// Fetch data on client-side only
onMounted(async () => {
  try {
    // Fetch both data and user info in parallel
    const [itemsResponse, userResponse] = await Promise.all([
      fetch('/api/items'),
      fetch('/api/user'),
    ]);

    if (!itemsResponse.ok) throw new Error('Failed to fetch items');
    if (!userResponse.ok) throw new Error('Failed to fetch user data');

    data.value = await itemsResponse.json();
    userData.value = await userResponse.json();
  } catch (e) {
    error.value =
      e instanceof Error ? e : new Error('An unknown error occurred');
  } finally {
    pending.value = false;
  }
});
</script>
