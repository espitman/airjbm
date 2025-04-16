<template>
    <div class="max-w-4xl mx-auto p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
      <!-- Heading and subheading -->
      <h2 class="text-3xl font-bold text-gray-900">Amenities</h2>
      <p class="text-xl text-gray-500 mt-2">About the property's amenities and services</p>
      
      <!-- First divider -->
      <div class="w-32 h-px bg-gray-200 my-8"></div>
      
      <!-- Amenities grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-8">
        <div v-for="(amenity, index) in displayedAmenities" :key="index" class="flex items-center">
          <div class="w-6 h-6 ml-4 text-gray-600" :class="{ 'opacity-50': !amenity.state }">
            <img :src="amenity.icon.url" :alt="amenity.title.fa" class="w-full h-full object-contain" />
          </div>
          <span class="text-base text-gray-700" :class="{ 'opacity-50 line-through': !amenity.state }">{{ amenity.title.fa }}</span>
        </div>
      </div>
      
      <!-- Second divider -->
      <div class="w-full h-px bg-gray-200 my-8"></div>
      
      <!-- View more button -->
      <div v-if="amenities.length > displayedCount" class="flex justify-center">
        <button 
          @click="displayedCount += 9"
          class="py-3 px-8 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
        >
          View more {{ amenities.length - displayedCount }} amenities
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'

  interface AmenityTitle {
    en: string
    fa: string
  }

  interface AmenityIcon {
    url: string
  }

  interface Amenity {
    icon: AmenityIcon
    state: boolean
    title: AmenityTitle
  }

  const props = defineProps<{
    amenities: Amenity[]
  }>()

  const displayedCount = ref(9)
  
  const displayedAmenities = computed(() => {
    return props.amenities.slice(0, displayedCount.value)
  })
  </script> 