<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-2">{{ title }}</h2>
        <p class="text-gray-600">{{ description }}</p>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <div v-else class="relative">
        <swiper
          :modules="[Navigation]"
          :slides-per-view="1"
          :space-between="20"
          :navigation="{
            nextEl: `.swiper-button-next-${uniqueId}`,
            prevEl: `.swiper-button-prev-${uniqueId}`
          }"
          :breakpoints="{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }"
          class="featured-listings-swiper"
        >
          <swiper-slide v-for="listing in listings" :key="listing.id">
            <ListingCard
              :listing="{
                id: listing.id,
                title: listing.title,
                images: listing.images,
                city_fa: listing.city_fa,
                province_fa: listing.province_fa,
                price: listing.price_not_checkin_based.min_price,
                rate_score: listing.rate_score,
                rate_count: listing.rate_count,
                rooms: listing.rooms_count,
                capacity: listing.capacity,
                categories: listing.tags.slice(0, 2)
              }"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ListingCard from '~/components/ui/ListingCard.vue'
import { Listing } from '~/plugins/listingsApi'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
  keyword: {
    type: String,
    default: 'province-mazandaran'
  },
  title: {
    type: String,
    default: 'اقامتگاه‌های برتر'
  },
  description: {
    type: String,
    default: 'بهترین اقامتگاه‌های ما را کشف کنید'
  }
})

// Generate a unique ID for this component instance
const uniqueId = ref(`featured-${Math.random().toString(36).substring(2, 9)}`)

// Get listingsApi from Nuxt app
const { $listingsApi } = useNuxtApp()

// Use the listingsApi state
const listings = computed(() => $listingsApi.listings.value)
const loading = computed(() => $listingsApi.loading.value)
const error = computed(() => $listingsApi.error.value)

// Fetch listings for this specific component
onMounted(async () => {
  try {
    await $listingsApi.fetchListings({ 
      page: 1, 
      size: 6, 
      keyword: props.keyword 
    })
  } catch (err) {
    console.error('Error fetching featured listings:', err)
  }
})
</script>

<style scoped>
.featured-listings-swiper {
  padding: 1rem 0;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: theme('colors.blue.600');
}

:deep(.swiper-button-disabled) {
  opacity: 0.35;
  cursor: not-allowed;
}
</style> 