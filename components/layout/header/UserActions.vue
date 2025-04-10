<template>
  <div class="hidden lg:flex items-center space-x-4 space-x-reverse">
    <button 
      type="button"
      @click="toggleSearch"
      class="p-2 text-gray-600 hover:text-blue-600 transition-colors"
      :class="{ 'text-blue-600': isSearchOpen }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
    <button class="btn-outline">Sign In</button>
    <button class="btn-primary">Sign Up</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const isSearchOpen = inject('isSearchOpen')
const toggleSearch = inject('toggleSearch')
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}

.btn-outline {
  @apply border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors;
}
</style> 