<template>
  <div class="container mx-auto p-4">
    <PageContent
      page-title="SSR Partial Page"
      :user-data="userData"
      :items="itemsData?.items?.slice(0, 10)"
      :pending="pending"
      :error="error"
      :total="itemsData?.total"
      title="Items (Client Rendered)"
      :show-total="false"
    />
  </div>
</template>

<script setup lang="ts">
import PageContent from '~/components/PageContent.vue';

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
} = await useLazyFetch<ApiResponse>('/api/items', {
  default: () => ({ items: [], total: 0, timestamp: '' }),
  server: false,
});
</script>
