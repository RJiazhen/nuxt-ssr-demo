<template>
  <div class="container mx-auto p-4">
    <PageContent
      page-title="All SSR Page"
      :user-data="userData"
      :items="data?.items?.slice(0, 100)"
      :pending="itemsStatus === 'pending'"
      :error="
        itemsStatus === 'error' ? new Error('Failed to load items') : null
      "
      :total="data?.total"
      title="Items"
      :show-total="true"
    />
  </div>
</template>

<script setup lang="ts">
import PageContent from '~/components/PageContent.vue';

const { data, status: itemsStatus } = await useFetch('/api/items');
const { data: userData, status: userStatus } = await useFetch('/api/user');
</script>
