<template>
  <div class="flex flex-col lg:flex-row gap-8">
    <!-- Filters Sidebar Skeleton (Desktop) -->
    <div class="hidden lg:block lg:w-1/4 transition-all duration-300 lg:sticky lg:top-24 lg:self-start">
      <div class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- City Filter Skeleton -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div class="space-y-2">
            <div v-for="n in 3" :key="n" class="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Price Range Skeleton -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div class="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <!-- Property Type Skeleton -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div class="space-y-2">
            <div v-for="n in 4" :key="n" class="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Amenities Skeleton -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div class="space-y-2">
            <div v-for="n in 3" :key="n" class="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Rules Skeleton -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div class="space-y-2">
            <div v-for="n in 3" :key="n" class="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Skeleton -->
    <div class="w-full lg:w-3/4">
      <!-- Search Results Title Skeleton -->
      <div class="mb-6">
        <div class="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div class="h-6 bg-gray-200 rounded w-1/4 mt-3 animate-pulse"></div>
      </div>

      <!-- Sort Skeleton -->
      <div class="mb-4">
        <div class="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>

      <!-- Mobile Filters Toggle Button Skeleton -->
      <div class="lg:hidden mb-4">
        <div class="h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <!-- Listings Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ListingCardSkeleton v-for="n in 6" :key="n" />
      </div>

      <!-- Pagination Skeleton -->
      <div class="mt-8 flex justify-center">
        <div class="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ListingCardSkeleton from './ListingCardSkeleton.vue'

defineProps({
  showFilters: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bg-gray-200 {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style> 