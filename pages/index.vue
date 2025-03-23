<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8 text-center text-blue-500">
      Nuxt SSR Test
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink
        v-for="page in filteredRoutes"
        :key="page.path"
        :to="page.path"
        class="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg flex items-center text-white justify-center hover:cursor-pointer hover:shadow-xl transition-all duration-300 no-underline"
      >
        {{ page.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const routes = router.getRoutes();
const filteredRoutes = routes.filter((route) => route.name !== 'index');

prefetchComponents(['/preloaded-ssr']);
</script>
