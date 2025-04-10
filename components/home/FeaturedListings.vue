<template>
  <section class="py-6 bg-gray-50 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-4">
        <div>
          <NuxtLink :to="`/listings?keyword=${keyword}`" class="block">
            <h2 class="text-3xl font-bold mb-2 font-vazir hover:text-blue-600 transition-colors">{{ title }}</h2>
          </NuxtLink>
          <p class="text-gray-600 font-vazir">{{ description }}</p>
        </div>
        <div class="flex items-center gap-4">
          <button class="swiper-button-next-custom">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="swiper-button-prev-custom">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom'
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

// Local state for this component instance
const listings = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const total = ref(0)

// Fetch listings for this specific component
const fetchListings = async () => {
  try {
    loading.value = true
    error.value = null

    const url = `https://jayaber.liara.run/search/${props.keyword}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ page: 1, size: 12 })
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid response format: items array not found')
    }

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

.swiper-button-next-custom,
.swiper-button-prev-custom {
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

.swiper-button-next-custom:hover,
.swiper-button-prev-custom:hover {
  background-color: #f3f4f6;
  transform: scale(1.05);
}

.swiper-button-next-custom i,
.swiper-button-prev-custom i {
  color: #4b5563;
  font-size: 1rem;
}
</style> 