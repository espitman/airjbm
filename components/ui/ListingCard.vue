<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden relative">
    <div class="relative">
      <!-- Image Slideshow with Gradient Overlay -->
      <div class="relative">
        <swiper
          :modules="[Pagination]"
          :pagination="{ clickable: true }"
          :slides-per-view="1"
          class="listing-swiper"
        >
          <swiper-slide v-for="(image, index) in getAllImages" :key="index">
            <NuxtLink :to="`/listings/${listing.id}`" class="block">
              <div class="relative overflow-hidden group">
                <img 
                  :src="image" 
                  :alt="`${listing.title} - تصویر ${index + 1}`" 
                  class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </NuxtLink>
          </swiper-slide>
        </swiper>
      </div>
      
      <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium z-10">
        {{ formatPrice }} / شب
      </div>
      
      <!-- Rating Square - Positioned at bottom right -->
      <div class="absolute bottom-4 right-4 z-20 flex items-center">
        <div class="bg-[#2E3F6E] w-8 h-8 rounded-lg flex items-center justify-center shadow-md">
          <div class="text-sm font-bold text-white">{{ listing.rate_score || '0' }}</div>
        </div>
        <div class="flex flex-col items-start mr-2">
          <div class="text-xs text-white font-medium">{{ listing.rate_count || '0' }} نظر</div>
          <div class="flex">
            <i v-for="i in 5" :key="i" 
               class="fas fa-star text-xs" 
               :class="i <= Math.floor(listing.rate_score || 0) ? 'text-yellow-400' : 'text-gray-300'"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4">
      <NuxtLink :to="`/listings/${listing.id}`" class="block">
        <h3 class="text-lg font-semibold mb-2 hover:text-[#2E3F6E] transition-colors">{{ listing.title }}</h3>
      </NuxtLink>
      <div class="flex items-center text-gray-500 mb-2">
        <i class="fas fa-map-marker-alt ml-2"></i>
        {{ getLocationDisplay }}
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
          {{ getCapacity }} 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  listing: {
    type: Object,
    required: true,
    validator: (listing) => {
      return listing.title
    }
  }
})

// Get all available images for the listing
const getAllImages = computed(() => {
  if (props.listing.images && props.listing.images.length > 0) {
    return props.listing.images
  } else if (props.listing.image) {
    return [props.listing.image]
  } else {
    return ['/images/placeholder.jpg'] // Fallback image
  }
})

// Format price based on API response
const formatPrice = computed(() => {
  // Function to convert dollars to toman (1 USD = ~50,000 toman)
  const convertToToman = (amount) => {
    if (!amount) return 'N/A'
    const tomanAmount = Math.round(amount / 10)
    return tomanAmount.toLocaleString('fa-IR') + ' تومان'
  }
  
  if (typeof props.listing.price === 'number') {
    return convertToToman(props.listing.price)
  } else if (props.listing.price_not_checkin_based && props.listing.price_not_checkin_based.min_price) {
    return convertToToman(props.listing.price_not_checkin_based.min_price)
  } else {
    return 'N/A'
  }
})

// Get categories from different possible sources
const getCategories = computed(() => {
  if (props.listing.categories && props.listing.categories.length > 0) {
    return props.listing.categories
  } else if (props.listing.tags && props.listing.tags.length > 0) {
    return props.listing.tags.slice(0, 2) // Limit to 2 tags
  }
  return []
})

// Get location display
const getLocationDisplay = computed(() => {
  // If we have both province and city, show both
  if (props.listing.province_fa && props.listing.city_fa) {
    return `${props.listing.province_fa}، ${props.listing.city_fa}`
  }
  
  // If we have just province
  if (props.listing.province_fa) {
    return props.listing.province_fa
  }
  
  // If we have just city
  if (props.listing.city_fa) {
    return props.listing.city_fa
  }
  
  // If we have location
  if (props.listing.location) {
    return props.listing.location
  }
  
  // Fallback
  return 'موقعیت نامشخص'
})

// Get capacity from different possible sources
const getCapacity = computed(() => {
  // If capacity is a number, return it directly
  if (typeof props.listing.capacity === 'number') {
    return `${props.listing.capacity} نفر`
  }
  
  // If capacity is an object with total property
  if (props.listing.capacity && props.listing.capacity.total) {
    return `${props.listing.capacity.total} نفر`
  }
  
  // If capacity is an object with base and extra properties
  if (props.listing.capacity && props.listing.capacity.base) {
    const base = props.listing.capacity.base
    const extra = props.listing.capacity.extra || 0
    
    if (extra > 0) {
      return `${base} نفر پایه + ${extra} نفر اضافه`
    } else {
      return `${base} نفر`
    }
  }
  
  // If we have capacity_base and capacity_extra
  if (props.listing.capacity_base) {
    const base = props.listing.capacity_base
    const extra = props.listing.capacity_extra || 0
    
    if (extra > 0) {
      return `${base} نفر پایه + ${extra} نفر اضافه`
    } else {
      return `${base} نفر`
    }
  }
  
  // Fallback
  return 'نامشخص'
})
</script>

<style scoped>
.listing-swiper {
  height: 12rem;
}

:deep(.swiper-pagination) {
  bottom: 0.5rem;
  left: 0.5rem;
  right: auto;
  text-align: left;
  width: auto;
  display: flex;
  justify-content: flex-start;
}

:deep(.swiper-pagination-bullet) {
  width: 0.5rem;
  height: 0.5rem;
  background: white;
  opacity: 0.7;
  margin: 0 0.25rem;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #3b82f6;
}

.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}
</style> 