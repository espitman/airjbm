<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden relative">
    <!-- Image Skeleton -->
    <div class="relative">
      <div class="h-56 bg-gray-200 rounded animate-pulse"></div>
      <!-- Price Badge Skeleton -->
      <div class="absolute top-4 left-4">
        <div class="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>
      <!-- Rating Skeleton -->
      <div class="absolute bottom-6 right-4 flex items-center">
        <div class="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
        <div class="mr-2">
          <div class="h-3 bg-gray-200 rounded w-12 mb-1 animate-pulse"></div>
          <div class="flex gap-1">
            <div v-for="i in 5" :key="i" class="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <!-- Red Div at Bottom -->
      <div class="absolute bottom-0 left-0 w-full h-4 bg-white rounded-t-[64px]"></div>
    </div>
    <!-- Content Skeleton -->
    <div class="p-4">
      <div class="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
      <div class="flex items-center mb-2">
        <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
      <div class="flex gap-2 mb-4">
        <div class="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
        <div class="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
      </div>
      <div class="flex items-center">
        <div class="h-4 bg-gray-200 rounded w-20 ml-4 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-20 ml-4 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props or logic needed for the skeleton component
</script> 