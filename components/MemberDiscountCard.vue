<template>
  <div
    v-if="user"
    class="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 text-white"
  >
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold mb-2">Premium Member Discount</h2>
        <div class="flex items-center space-x-2">
          <span class="text-3xl font-bold"
            >${{ discountData?.discount.originalPrice }}</span
          >
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

    <div class="mt-6 border-t border-white/20 pt-4">
      <h3 class="font-semibold mb-2">Premium Features:</h3>
      <ul class="grid grid-cols-2 gap-2 text-sm">
        <li
          v-for="feature in discountData?.discount.features"
          :key="feature"
          class="flex items-center"
        >
          <span class="mr-2">✓</span>
          {{ feature }}
        </li>
      </ul>
    </div>

    <div class="mt-4 text-xs text-white/80">
      <p
        v-for="term in discountData?.discount.terms"
        :key="term"
        class="mb-1"
      >
        {{ term }}
      </p>
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

interface Discount {
  originalPrice: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  features: string[];
  terms: string[];
}

interface DiscountResponse {
  discount: Discount;
  timestamp: string;
}

const props = defineProps<{
  user?: User;
}>();

// Fetch discount data
const { data: discountData } = await useFetch<DiscountResponse>(
  '/api/discount',
);

// Calculate discount amounts
const discountAmount = computed(() => {
  if (!discountData.value) return '0.00';
  return (
    (discountData.value.discount.originalPrice *
      discountData.value.discount.discountPercentage) /
    100
  ).toFixed(2);
});

const discountedPrice = computed(() => {
  if (!discountData.value) return '0.00';
  return (
    discountData.value.discount.originalPrice *
    (1 - discountData.value.discount.discountPercentage / 100)
  ).toFixed(2);
});

// Calculate time remaining until end date
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
    if (!discountData.value) return;

    const now = new Date();
    const endDate = new Date(discountData.value.discount.endDate);
    const diff = endDate.getTime() - now.getTime();

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
