<template>
  <div class="container mx-auto p-4">
    <PageContent
      page-title="SSR Partial Page"
      :user-data="userData"
      :items="itemsData?.items"
      :status="status"
      :total="itemsData?.total"
      title="Items (Client Rendered)"
      :show-total="false"
    />
  </div>
</template>

<script setup lang="ts">
import PageContent from '~/components/PageContent.vue';

// Server-side data fetching for user
const { data: userData } = await useFetch('/api/user');

// Client-side data fetching for items
const { status, data: itemsData } = await useFetch('/api/items', {
  default: () => ({ items: [], total: 0, timestamp: '' }),
  server: false,
});
</script>
