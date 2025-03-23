<template>
  <div>
    <!-- Header section -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
      <HomeButton />
    </div>

    <!-- User info section -->
    <div class="col-span-full mb-6">
      <UserInfoCard :user="userData?.user" />
    </div>

    <!-- Premium/Discount section -->
    <div
      v-if="userData?.user?.isPremium"
      class="col-span-full mb-6"
    >
      <PremiumMemberCard :user="userData?.user" />
    </div>
    <div
      v-else
      class="col-span-full mb-6"
    >
      <MemberDiscountCard :user="userData?.user" />
    </div>

    <!-- Items section -->
    <div class="mb-4">
      <h2 class="text-xl font-bold">{{ title }}</h2>
    </div>

    <div
      v-if="pending"
      class="text-center py-8 text-gray-600"
    >
      Loading items...
    </div>
    <div
      v-else-if="error"
      class="text-center py-8 text-red-500"
    >
      Error loading items: {{ error }}
    </div>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <template
        v-for="item in items"
        :key="item.id"
      >
        <component
          :is="userData?.user?.itemCardType === '2' ? ItemCard2 : ItemCard"
          :item="item"
          @show-detail="handleShowDetail"
        />
      </template>
    </div>

    <div
      v-if="showTotal"
      class="mt-4 text-center text-gray-600"
    >
      Total Items: {{ Math.min(total || 0, 100) }}
    </div>

    <!-- Item Detail Modal -->
    <ItemDetail ref="itemDetail" />
  </div>
</template>

<script setup lang="ts">
import ItemCard from '~/components/ItemCard.vue';
import ItemCard2 from '~/components/ItemCard2.vue';
import ItemDetail from '~/components/ItemDetail.vue';
import HomeButton from '~/components/HomeButton.vue';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  itemCardType: string;
  level: number;
  isPremium: boolean;
  premiumStartDate?: string;
  premiumEndDate?: string;
  premiumFeatures?: string[];
}

interface Item {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  category: string;
}

defineProps<{
  pageTitle: string;
  userData: { user: User } | null;
  items?: Item[];
  pending?: boolean;
  error?: Error | null;
  total?: number;
  title: string;
  showTotal?: boolean;
}>();

const itemDetail = ref<InstanceType<typeof ItemDetail>>();

const handleShowDetail = (item: Item) => {
  itemDetail.value?.open(item);
};
</script>
