<template>
  <section class="py-6 bg-gray-50 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-4">
        <div>
          <NuxtLink :to="`/listings/${keyword}`" class="block">
            <h2 class="text-3xl font-bold mb-2 font-vazir hover:text-blue-600 transition-colors">{{ title }}</h2>
          </NuxtLink>
          <p class="text-gray-600 font-vazir">{{ description }}</p>
        </div>
        <div class="flex items-center gap-4">
          <button :class="`swiper-button-next-${uniqueId}`">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button :class="`swiper-button-prev-${uniqueId}`">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="relative">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 featured-listings-swiper min-h-[400px]">
          <ListingCardSkeleton v-for="n in 3" :key="n" class="h-full" />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 font-vazir">{{ error }}</p>
        <button 
          @click="fetchListings()" 
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-vazir"
        >
          تلاش مجدد
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="listings.length === 0" class="text-center py-12">
        <p class="text-gray-500 font-vazir">در حال حاضر هیچ آگهی ویژه‌ای وجود ندارد.</p>
      </div>

      <!-- Listings Carousel -->
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
import ListingCardSkeleton from '~/components/ui/ListingCardSkeleton.vue'
import { Listing } from '~/plugins/listingsApi'
import 'swiper/css'
import 'swiper/css/navigation'
import { useNuxtApp } from '#app'

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

// Local state for this component instance
const listings = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const total = ref(0)

// Get listingsApi from Nuxt app
const { $listingsApi } = useNuxtApp()

// Fetch listings for this specific component
const fetchListings = async () => {
  try {
    loading.value = true
    error.value = null

    const data = await $listingsApi.fetchListings({ 
      page: 1, 
      size: 12, 
      keyword: props.keyword 
    })

    listings.value = data.items
    total.value = data.total
  } catch (err) {
    console.error('Error fetching listings:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred while fetching listings'
  } finally {
    loading.value = false
  }
}

// Fetch listings when component is mounted
onMounted(() => {
  fetchListings()
})
</script>

<style scoped>
.featured-listings-swiper {
  padding: 1rem 0;
}

/* Use attribute selectors to target the specific buttons for this swiper instance */
[class^="swiper-button-next-"],
[class^="swiper-button-prev-"] {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

[class^="swiper-button-next-"]:hover,
[class^="swiper-button-prev-"]:hover {
  background-color: #f3f4f6;
  transform: scale(1.05);
}

[class^="swiper-button-next-"] i,
[class^="swiper-button-prev-"] i {
  color: #4b5563;
  font-size: 1rem;
}
</style> 