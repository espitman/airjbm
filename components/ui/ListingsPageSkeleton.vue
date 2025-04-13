<template>
  <div class="animate-pulse">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters Sidebar Skeleton -->
      <div class="hidden lg:block lg:w-1/4">
        <div class="bg-white rounded-lg p-6 space-y-6">
          <!-- City Filter -->
          <div>
            <div class="h-5 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          
          <!-- Price Range -->
          <div>
            <div class="h-5 bg-gray-200 rounded w-32 mb-2"></div>
            <div class="flex gap-2">
              <div class="h-10 bg-gray-200 rounded w-1/2"></div>
              <div class="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          
          <!-- Property Type -->
          <div>
            <div class="h-5 bg-gray-200 rounded w-28 mb-2"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          
          <!-- Amenities -->
          <div>
            <div class="h-5 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          
          <!-- Rules -->
          <div>
            <div class="h-5 bg-gray-200 rounded w-20 mb-2"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          
          <!-- Buttons -->
          <div class="space-y-2">
            <div class="h-10 bg-gray-200 rounded w-full"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Listings Grid Skeleton -->
      <div class="lg:w-3/4">
        <!-- Title Skeleton -->
        <div class="mb-6">
          <div class="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-48"></div>
        </div>

        <!-- Mobile Filter Button Skeleton -->
        <div class="lg:hidden mb-4">
          <div class="h-12 bg-gray-200 rounded w-full"></div>
        </div>

        <!-- Listings Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListingCardSkeleton v-for="i in 6" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props or logic needed for the skeleton component
import ListingCardSkeleton from './ListingCardSkeleton.vue'
</script> 