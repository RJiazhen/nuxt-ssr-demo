<template>
  <div
    class="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white"
  >
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold mb-2">Premium Membership</h2>
        <div class="flex items-center space-x-2">
          <span class="text-3xl font-bold"
            >Level {{ premiumData?.premiumMember.level }}</span
          >
        </div>
        <p class="text-sm mt-2">
          Member since
          {{ formatDate(premiumData?.premiumMember.premiumStartDate) }}
        </p>
      </div>
      <div class="text-right">
        <div class="text-sm mb-1">Premium expires on:</div>
        <div class="text-2xl font-bold">
          {{ formatDate(premiumData?.premiumMember.premiumEndDate) }}
        </div>
      </div>
    </div>

    <div class="mt-6 border-t border-white/20 pt-4">
      <div class="flex justify-between mb-4">
        <div>
          <div class="text-sm">Total Savings</div>
          <div class="text-xl font-bold">
            ${{ premiumData?.premiumMember.totalSavings }}
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm">Next Reward</div>
          <div class="text-xl font-bold">
            ${{ premiumData?.premiumMember.nextReward }}
          </div>
        </div>
      </div>

      <h3 class="font-semibold mb-2">Your Premium Benefits:</h3>
      <ul class="grid grid-cols-2 gap-2 text-sm">
        <li
          v-for="feature in premiumData?.premiumMember.premiumFeatures"
          :key="feature"
          class="flex items-center"
        >
          <span class="mr-2">✓</span>
          {{ feature }}
        </li>
      </ul>
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

interface PremiumMember {
  level: number;
  premiumStartDate: string;
  premiumEndDate: string;
  premiumFeatures: string[];
  membershipStatus: string;
  totalSavings: number;
  nextReward: number;
}

interface PremiumResponse {
  premiumMember: PremiumMember;
  timestamp: string;
}

const props = defineProps<{
  user?: User;
}>();

// Fetch premium member data
const { data: premiumData } = await useFetch<PremiumResponse>(
  '/api/premium-member',
);

// Format date to a readable string
const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>
