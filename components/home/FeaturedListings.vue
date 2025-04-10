<template>
  <section class="py-12 bg-gray-50 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-3xl font-bold mb-2 font-vazir">اقامتگاه‌های برتر</h2>
          <p class="text-gray-600 font-vazir">بهترین اقامتگاه‌های ما را کشف کنید</p>
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
      <div v-if="$listingsApi.loading.value" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="$listingsApi.error.value" class="text-center py-12">
        <p class="text-red-600 font-vazir">{{ $listingsApi.error.value }}</p>
        <button 
          @click="$listingsApi.fetchListings({ page: 1, size: 12, keyword: 'province-mazandaran' })" 
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-vazir"
        >
          تلاش مجدد
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="$listingsApi.listings.value.length === 0" class="text-center py-12">
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
          <swiper-slide v-for="listing in $listingsApi.listings.value" :key="listing.id">
            <ListingCard
              :listing="{
                id: listing.id,
                title: listing.title,
                image: listing.images[0],
                location: listing.city_fa,
                price: listing.price_not_checkin_based.min_price,
                rating: listing.rate_score,
                rooms: listing.rooms_count,
                capacity: listing.capacity,
                comments: listing.rate_count,
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
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ListingCard from '~/components/ui/ListingCard.vue'
import { Listing } from '~/plugins/listingsApi'
import 'swiper/css'
import 'swiper/css/navigation'

const { $listingsApi } = useNuxtApp()

onMounted(() => {
  $listingsApi.fetchListings({ page: 1, size: 12, keyword: 'province-mazandaran' })
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.featured-listings-swiper {
  padding: 1rem 0;
}

.swiper-button-prev-custom,
.swiper-button-next-custom {
  width: 40px;
  height: 40px;
  border-radius: 8px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background: #e5e7eb;
  color: #4b5563;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  display: none;
}
</style> 