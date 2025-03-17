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
      Error: {{ error.message }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="item in data?.items"
        :key="item.id"
        class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
        <p class="text-gray-600 mb-2">{{ item.description }}</p>
        <div class="flex justify-between items-center text-sm text-gray-500">
          <span>{{ item.category }}</span>
          <span>{{ new Date(item.createdAt).toLocaleDateString() }}</span>
        </div>
      </div>
    </div>

    <div class="mt-4 text-center text-gray-600">
      Total Items: {{ data?.total }}
    </div>
  </div>
</template>

<script setup lang="ts">
// Use ref to store the data
const data = ref(null);
const pending = ref(true);
const error = ref(null);

// Fetch data on client-side only
onMounted(async () => {
  try {
    const response = await fetch('/api/items');
    if (!response.ok) throw new Error('Failed to fetch data');
    data.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    pending.value = false;
  }
});
</script>
