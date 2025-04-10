<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <!-- Top Bar -->
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <span class="text-2xl font-bold text-blue-600">Jabama</span>
        </NuxtLink>

        <!-- Search Button -->
        <button @click="toggleSearch" class="flex items-center text-gray-600 hover:text-gray-900">
          <i class="fas fa-search mr-2"></i>
          <span>Search</span>
        </button>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <button class="btn-primary">
            Add Listing
            <i class="fas fa-plus ml-2"></i>
          </button>
          
          <button class="relative">
            <i class="fas fa-heart text-red-500"></i>
            <span class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              4
            </span>
          </button>

          <button class="flex items-center">
            <i class="fas fa-user mr-2"></i>
            Sign In
          </button>
        </div>
      </div>

      <!-- Search Panel -->
      <div v-if="isSearchOpen" class="py-4 border-t">
        <div class="flex flex-wrap gap-4">
          <!-- City Selection -->
          <div class="flex-1">
            <select class="w-full px-4 py-2 border rounded-lg">
              <option value="">Select City</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
              <option value="miami">Miami</option>
            </select>
          </div>
          
          <!-- Passenger Count -->
          <div class="w-48">
            <input 
              type="number" 
              min="0" 
              class="w-full px-4 py-2 border rounded-lg"
              placeholder="Passengers"
            >
          </div>
          
          <!-- Check-in Date -->
          <div class="w-48">
            <input 
              type="date" 
              class="w-full px-4 py-2 border rounded-lg"
              placeholder="Check-in"
            >
          </div>
          
          <!-- Check-out Date -->
          <div class="w-48">
            <input 
              type="date" 
              class="w-full px-4 py-2 border rounded-lg"
              placeholder="Check-out"
            >
          </div>
          
          <button class="btn-primary px-6">
            <i class="fas fa-search mr-2"></i>
            Search
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="py-4 border-t">
        <ul class="flex space-x-6">
          <li>
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/listings" class="text-gray-600 hover:text-gray-900">Listings</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/news" class="text-gray-600 hover:text-gray-900">News</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="text-gray-600 hover:text-gray-900">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="text-gray-600 hover:text-gray-900">Contact</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
const isSearchOpen = ref(false)

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
}
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}
</style> 