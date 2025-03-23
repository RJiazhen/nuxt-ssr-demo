<template>
  <div class="container mx-auto p-4">
    <PageContent
      page-title="All SSR Page"
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

interface ApiResponse {
  items: Item[];
  total: number;
  timestamp: string;
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
</script>
