<template>
  <nav class="hidden lg:flex items-center space-x-8">
    <NuxtLink 
      v-for="link in links" 
      :key="link.to" 
      :to="link.to"
      class="text-gray-700 hover:text-blue-600 transition-colors"
    >
      {{ link.text }}
    </NuxtLink>
  </nav>
</template>

<script setup>
const links = [
  { to: '/', text: 'خانه' },
  { to: '/listings', text: 'اقامتگاه‌ها' },
  { to: '/about', text: 'درباره ما' },
  { to: '/contact', text: 'تماس با ما' }
]
</script> 