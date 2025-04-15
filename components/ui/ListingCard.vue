<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden relative">
    <div class="relative">
      <!-- Image Slideshow with Gradient Overlay -->
      <div class="relative">
        <swiper
          :modules="[Pagination, Navigation]"
          :pagination="false"
          :navigation="true"
          :slides-per-view="1"
          :loop="true"
          class="listing-swiper"
        >
          <swiper-slide v-for="(image, index) in getAllImages" :key="index">
            <NuxtLink :to="`/listings/${listing.id}`" class="block">
              <div class="relative overflow-hidden group">
                <img
                  :src="image"
                  :alt="`${listing.title} - تصویر ${index + 1}`"
                  class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </NuxtLink>
          </swiper-slide>
        </swiper>
      </div>
      
      <!-- Price Badge - Positioned at top left -->
      <div class="absolute top-4 left-4 z-20">
        <div class="bg-blue-600/60 text-white px-3 py-1 rounded-lg shadow-md text-sm font-semibold">
          {{ formatPrice }}
        </div>
      </div>
      
      <!-- Rating Square - Positioned at bottom right -->
      <div class="absolute bottom-6 right-4 z-20 flex items-center">
        <div class="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-md">
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

      <!-- Red Div at Bottom of Image -->
      <div class="absolute bottom-0 left-0 w-full h-4 bg-white z-10 rounded-t-[64px]"></div>
    </div>
    <div class="p-4">
      <NuxtLink :to="`/listings/${listing.id}`" class="block">
        <h3 class="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors text-right truncate">
          {{ getTypeName }} {{ listing.title }}
        </h3>
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
import { Pagination, Navigation } from 'swiper/modules'
import { useNuxtApp } from '#app'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { $persianTranslations } = useNuxtApp()

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
  
  // First try to get the check-in based price
  if (props.listing.price_checkin_based && props.listing.price_checkin_based.total_price) {
    return convertToToman(props.listing.price_checkin_based.total_price)
  }
  
  // Then try to get the not check-in based price
  if (props.listing.price_not_checkin_based && props.listing.price_not_checkin_based.min_price) {
    return convertToToman(props.listing.price_not_checkin_based.min_price)
  }
  
  // Finally, try the direct price property
  if (typeof props.listing.price === 'number') {
    return convertToToman(props.listing.price)
  }
  
  return 'N/A'
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
  if (props.listing.capacity) {
    const base = props.listing.capacity.base || 0
    const extra = props.listing.capacity.extra || 0
    return `${base + extra} نفر`
  }
  return 'ظرفیت نامشخص'
})

// Get type name from different possible sources
const getTypeName = computed(() => {
  return $persianTranslations.getPersianTypeName(
    props.listing.type,
    props.listing.categories,
    props.listing.tags
  )
})
</script>

<style scoped>
.listing-swiper {
  height: 14rem;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  visibility: hidden;
}

.listing-swiper:hover :deep(.swiper-button-next),
.listing-swiper:hover :deep(.swiper-button-prev) {
  opacity: 1;
  visibility: visible;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 1rem;
}

:deep(.swiper-button-disabled) {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
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