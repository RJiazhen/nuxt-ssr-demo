<template>
  <div
    class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
  >
    <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
    <p class="text-gray-600 mb-2">{{ item.description }}</p>
    <div class="flex justify-between items-center text-sm text-gray-500">
      <ul>
        <li>{{ item.id }}</li>
        <li>{{ item.category }}</li>
        <li>{{ new Date(item.createdAt).toLocaleDateString() }}</li>
      </ul>
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

defineProps<{
  item: Item;
}>();
</script>
