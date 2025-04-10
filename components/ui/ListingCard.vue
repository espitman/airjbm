<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="relative">
      <img :src="getImageUrl" :alt="listing.title" class="w-full h-48 object-cover">
      <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
        {{ formatPrice }} / شب
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ listing.title }}</h3>
      <div class="flex items-center text-gray-500 mb-2">
        <i class="fas fa-map-marker-alt ml-2"></i>
        {{ listing.location || listing.city_fa }}
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="category in getCategories" :key="category" 
              class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
          {{ category }}
        </span>
      </div>
      <div class="flex items-center text-gray-500 text-sm">
        <div class="flex items-center ml-4">
          <i class="fas fa-bed ml-2"></i>
          {{ listing.rooms || listing.rooms_count }} اتاق
        </div>
        <div class="flex items-center ml-4">
          <i class="fas fa-user ml-2"></i>
          {{ getCapacity }} مسافر
        </div>
        <div class="flex items-center">
          <i class="fas fa-comment ml-2"></i>
          {{ listing.comments || listing.rate_count }} نظر
        </div>
      </div>
      <div class="flex justify-between items-center mt-4">
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <i class="fas fa-star text-yellow-400 ml-1"></i>
            <span class="font-semibold">{{ listing.rating || listing.rate_score }}</span>
          </div>
          <div class="flex items-center text-gray-500">
            <i class="fas fa-comment-alt ml-1"></i>
            <span>{{ listing.comments || listing.rate_count }}</span>
          </div>
        </div>
        <NuxtLink :to="`/listings/${listing.id}`" 
                  class="btn-primary">
          مشاهده جزئیات
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  listing: {
    type: Object,
    required: true,
    validator: (listing) => {
      return listing.title
    }
  }
})

// Handle different image formats from API
const getImageUrl = computed(() => {
  if (props.listing.image) {
    return props.listing.image
  } else if (props.listing.images && props.listing.images.length > 0) {
    return props.listing.images[0]
  } else {
    return '/images/placeholder.jpg' // Fallback image
  }
})

// Format price based on API response
const formatPrice = computed(() => {
  if (typeof props.listing.price === 'number') {
    return `$${props.listing.price}`
  } else if (props.listing.price_not_checkin_based && props.listing.price_not_checkin_based.min_price) {
    return `$${props.listing.price_not_checkin_based.min_price}`
  } else {
    return 'N/A'
  }
})

// Get categories from different possible sources
const getCategories = computed(() => {
  if (props.listing.categories && props.listing.categories.length > 0) {
    return props.listing.categories
  } else if (props.listing.tags && props.listing.tags.length > 0) {
    return props.listing.tags.slice(0, 2)
  } else {
    return []
  }
})

// Get capacity from different possible sources
const getCapacity = computed(() => {
  if (props.listing.capacity) {
    return props.listing.capacity.base + (props.listing.capacity.extra || 0)
  } else {
    return 'N/A'
  }
})
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}
</style> 