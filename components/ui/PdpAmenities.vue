<template>
    <div class="max-w-4xl mx-auto p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
      <!-- Heading and subheading -->
      <h2 class="text-3xl font-bold text-gray-900">Amenities</h2>
      <p class="text-xl text-gray-500 mt-2">About the property's amenities and services</p>
      
      <!-- First divider -->
      <div class="w-32 h-px bg-gray-200 my-8"></div>
      
      <!-- Amenities grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-8">
        <!-- Row 1 -->
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <circle cx="12" cy="20" r="0.5"></circle>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Fast wifi</span>
        </div>
        
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"></path>
              <path d="M6 12V5a2 2 0 0 1 2-2h3v2.25"></path>
              <path d="M4 21l1-1.5"></path>
              <path d="M20 21l-1-1.5"></path>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Bathtub</span>
        </div>
        
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <path d="M10 3h4v8h-4z"></path>
              <path d="M14 7h3a3 3 0 0 1 3 3v2"></path>
              <path d="M7 7H4a3 3 0 0 0-3 3v2"></path>
              <path d="M13 17v-2"></path>
              <path d="M11 17v-2"></path>
              <path d="M18 12a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4"></path>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Hair dryer</span>
        </div>
        
        <!-- Row 2 -->
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <rect x="4" y="2" width="16" height="20" rx="2"></rect>
              <circle cx="12" cy="14" r="4"></circle>
              <line x1="12" y1="6" x2="12.01" y2="6"></line>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Sound system</span>
        </div>
        
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <path d="M7 3h10v4H7z"></path>
              <path d="M17 7v14H7V7"></path>
              <path d="M9 11h6"></path>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Shampoo</span>
        </div>
        
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <path d="M7 11h10v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"></path>
              <path d="M15 11V7a3 3 0 0 0-6 0v4"></path>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Body soap</span>
        </div>
        
        <!-- Row 3 -->
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
              <path d="M13 11l-4 6h6l-4 6"></path>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Water Energy</span>
        </div>
        
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <path d="M9 9h.01"></path>
              <path d="M15 9h.01"></path>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Water Polo</span>
        </div>
        
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Cable Car</span>
        </div>
        
        <!-- Row 4 -->
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
              <polyline points="17 2 12 7 7 2"></polyline>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Tv Smart</span>
        </div>
        
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"></path>
              <circle cx="10" cy="10" r="3"></circle>
              <path d="M22 10h-4"></path>
              <path d="M18 14l-2-2"></path>
              <path d="M18 6l-2 2"></path>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Cctv Camera</span>
        </div>
        
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
              <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
              <path d="M21 7v4a1 1 0 0 1-1 1h-3"></path>
              <path d="M9 12h6"></path>
              <path d="M8 17a5 5 0 0 1 8 0"></path>
              <rect x="3" y="3" width="18" height="14" rx="2"></rect>
            </svg>
          </div>
          <span class="text-lg text-gray-700">Virtual Reality Vr</span>
        </div>
      </div>
      
      <!-- Second divider -->
      <div class="w-full h-px bg-gray-200 my-8"></div>
      
      <!-- View more button -->
      <div class="flex justify-center">
        <button class="py-3 px-8 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
          View more 20 amenities
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  // Component can be extended with props and reactivity if needed
  </script>