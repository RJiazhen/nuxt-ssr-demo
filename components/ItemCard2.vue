<template>
  <div
    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    @click="$emit('showDetail', item)"
  >
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <span
          class="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full"
        >
          {{ item.category }}
        </span>
        <span class="text-sm text-gray-500">
          {{ new Date(item.createdAt).toLocaleDateString() }}
        </span>
      </div>

      <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ item.title }}</h2>
      <p class="text-gray-600 mb-4">{{ item.description }}</p>

      <div class="flex items-center text-sm text-gray-500">
        <span class="mr-2">ID:</span>
        <span class="font-mono">{{ item.id }}</span>
      </div>
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

defineEmits<{
  showDetail: [item: Item];
}>();
</script>
