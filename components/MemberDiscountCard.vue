<template>
  <div
    v-if="user"
    class="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 text-white"
  >
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold mb-2">Premium Member Discount</h2>
        <div class="flex items-center space-x-2">
          <span class="text-3xl font-bold">${{ originalPrice }}</span>
          <span class="text-2xl font-bold">→</span>
          <span class="text-3xl font-bold">${{ discountedPrice }}</span>
        </div>
        <p class="text-sm mt-2">Save ${{ discountAmount }}</p>
      </div>
      <div class="text-right">
        <div class="text-sm mb-1">Discount ends in:</div>
        <div class="text-2xl font-bold">{{ formatTimeRemaining }}</div>
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

const props = defineProps<{
  user?: User;
}>();

// Original price and discount percentage
const originalPrice = 99.99;
const discountPercentage = 20;
const discountAmount = ((originalPrice * discountPercentage) / 100).toFixed(2);
const discountedPrice = (
  originalPrice *
  (1 - discountPercentage / 100)
).toFixed(2);

// Calculate time remaining until end of month
const timeRemaining = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const formatTimeRemaining = computed(() => {
  const { days, hours, minutes, seconds } = timeRemaining.value;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
});

// Update time remaining every second
onMounted(() => {
  const updateTimeRemaining = () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const diff = endOfMonth.getTime() - now.getTime();

    timeRemaining.value = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  updateTimeRemaining();
  const interval = setInterval(updateTimeRemaining, 1000);

  onUnmounted(() => clearInterval(interval));
});
</script>
