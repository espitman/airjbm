<template>
  <div class="flex items-center space-x-4">
    <!-- Add Business Button -->
    <button 
      class="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      ثبت کسب و کار
    </button>

    <!-- User Menu -->
    <div class="relative">
      <button 
        @click="toggleMenu"
        class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
      >
        <span class="hidden md:block">حساب کاربری</span>
        <i class="fas fa-user-circle text-2xl"></i>
      </button>

      <!-- Dropdown Menu -->
      <div 
        v-if="isMenuOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
      >
        <a 
          href="#" 
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          @click="login"
        >
          ورود
        </a>
        <a 
          href="#" 
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          @click="register"
        >
          ثبت نام
        </a>
      </div>
    </div>

    <!-- Search Toggle -->
    <button 
      @click="toggleSearch"
      class="text-gray-700 hover:text-blue-600 transition-colors"
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