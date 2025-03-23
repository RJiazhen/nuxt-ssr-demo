<template>
  <div class="container mx-auto p-4">
    <PageContent
      page-title="Client Render Page"
      :user-data="userData"
      :items="data?.items?.slice(0, 100)"
      :pending="pending"
      :error="error"
      :total="data?.total"
      title="Items"
      :show-total="true"
    />
  </div>
</template>

<script setup lang="ts">
import PageContent from '~/components/PageContent.vue';

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
