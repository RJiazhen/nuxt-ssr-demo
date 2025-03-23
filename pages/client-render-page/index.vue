<template>
  <div class="container mx-auto p-4">
    <ClientOnly>
      <PageContent
        page-title="Client Render Page"
        :user-data="userData"
        :items="itemsData?.items?.slice(0, 100)"
        :pending="itemsStatus === 'pending'"
        :error="
          itemsStatus === 'error' ? new Error('Failed to fetch items') : null
        "
        :total="itemsData?.total"
        title="Items"
        :show-total="true"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import PageContent from '~/components/PageContent.vue';

// Client-side data fetching
const { data: itemsData, status: itemsStatus } = await useFetch('/api/items', {
  server: false,
});

const { data: userData, status: userStatus } = await useFetch('/api/user', {
  server: false,
});
</script>
