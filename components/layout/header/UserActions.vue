<template>
  <div class="flex items-center space-x-4">

    <!-- Search Toggle -->
    <button 
      @click="toggleSearch"
      class="text-gray-700 hover:text-blue-600 transition-colors font-vazir"
    >
      <i class="fas fa-search text-xl"></i>
    </button>
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