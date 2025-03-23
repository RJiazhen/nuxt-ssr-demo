<template>
  <div class="container mx-auto p-4">
    <PageContent
      page-title="All SSR Page"
      :user-data="userData"
      :items="data?.items"
      :status="itemsStatus"
      :total="data?.total"
      title="Items"
      :show-total="true"
    />
  </div>
</template>

<script setup lang="ts">
import PageContent from '~/components/PageContent.vue';

const { data, status: itemsStatus } = await useFetch('/api/items');
const { data: userData } = await useFetch('/api/user');
</script>
