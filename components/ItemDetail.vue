<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="$emit('close')"
  >
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-black opacity-50"></div>

      <div
        class="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 pt-10"
      >
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10 border-none bg-transparent hover:cursor-pointer"
          @click="close"
        >
          <span class="text-2xl">×</span>
        </button>

        <div v-if="item">
          <div class="flex items-center justify-between mb-6">
            <span
              class="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full"
            >
              {{ item.category }}
            </span>
            <span class="text-sm text-gray-500">
              {{ new Date(item.createdAt).toLocaleDateString() }}
            </span>
          </div>

          <h2 class="text-3xl font-bold text-gray-800 mb-4">
            {{ item.title }}
          </h2>
          <p class="text-gray-600 mb-6 text-lg leading-relaxed">
            {{ item.description }}
          </p>

          <div class="flex items-center text-sm text-gray-500 border-t pt-4">
            <span class="mr-2">Item ID:</span>
            <span class="font-mono">{{ item.id }}</span>
          </div>
        </div>
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

const show = ref(false);
const item = ref<Item>();

const open = (clickedItem: Item) => {
  show.value = true;
  item.value = clickedItem;
};

const close = () => {
  show.value = false;
  item.value = undefined;
};

defineExpose({
  open,
  close,
});
</script>
