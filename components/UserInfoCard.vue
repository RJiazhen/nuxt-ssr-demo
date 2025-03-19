<template>
  <div
    v-if="user"
    class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
  >
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0">
        <div
          class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
        >
          <span class="text-2xl font-bold">{{ user.name.charAt(0) }}</span>
        </div>
      </div>
      <div class="flex-grow">
        <h2 class="text-xl font-bold">{{ user.name }}</h2>
        <div class="flex items-center space-x-2 mt-1">
          <span class="px-2 py-1 bg-white/20 rounded-full text-sm">
            Level {{ user.level }}
          </span>
          <span
            v-if="user.isPremium"
            class="px-2 py-1 bg-yellow-400/20 rounded-full text-sm flex items-center"
          >
            <span class="mr-1">⭐</span>
            Premium Member
          </span>
          <span
            v-else
            class="px-2 py-1 bg-yellow-400/20 rounded-full text-sm flex items-center"
          >
            Free Member
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  itemCardType: string;
  level: number;
  isPremium: boolean;
}

defineProps<{
  user?: User;
}>();
</script>
