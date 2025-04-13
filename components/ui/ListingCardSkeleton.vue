<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Image skeleton with red div -->
    <div class="relative">
      <div class="w-full h-56 bg-gray-200 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-full h-4 bg-white rounded-t-[64px]"></div>
    </div>
    
    <!-- Content skeleton -->
    <div class="p-4 pb-6">
      <!-- Title skeleton -->
      <div class="h-6 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
      
      <!-- Location skeleton -->
      <div class="flex items-center gap-2 mb-4">
        <div class="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        <div class="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
      
      <!-- Categories skeleton -->
      <div class="flex gap-2 mb-4">
        <div class="h-5 bg-gray-200 rounded-full animate-pulse w-16"></div>
        <div class="h-5 bg-gray-200 rounded-full animate-pulse w-16"></div>
      </div>
      
      <!-- Features skeleton -->
      <div class="flex gap-4">
        <div class="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        <div class="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        <div class="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
    </div>
  </div>
</template> 