<template>
  <div class="container mx-auto p-4">
    <PageContent
      page-title="Preloaded SSR Page"
      :user-data="userData"
      :items="itemsData?.items"
      :status="status"
      :total="itemsData?.total"
      title="Items (Preloaded SSR)"
      :show-total="true"
    />
  </div>
</template>

<script setup lang="ts">
// Server-side data fetching for user
const { data: userData } = await useFetch('/api/user');

// Client-side data fetching for items
const { status, data: itemsData } = await useFetch('/api/items', {
  default: () => ({ items: [], total: 0, timestamp: '' }),
  server: false,
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
