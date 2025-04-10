<template>
  <nav class="hidden lg:flex items-center space-x-8">
    <NuxtLink 
      v-for="item in navigation" 
      :key="item.name"
      :to="item.href"
      class="text-gray-600 hover:text-blue-600 transition-colors"
    >
      {{ item.name }}
    </NuxtLink>
  </nav>
</template>

<script setup>
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]
</script> 