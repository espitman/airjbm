<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold mb-2">اقامتگاه‌های برتر</h2>
          <p class="text-gray-600">بهترین اقامتگاه‌های ما را کشف کنید</p>
        </div>
        <NuxtLink 
          to="/listings" 
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          @click="scrollToTop"
        >
          مشاهده همه
        </NuxtLink>
      </div>

      <!-- Listings Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ListingCard 
          v-for="listing in listings.slice(0, 6)" 
          :key="listing.id" 
          :listing="listing"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!listings.length" class="text-center py-12">
        <i class="fas fa-home text-gray-400 text-5xl mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">هیچ اقامتگاهی یافت نشد</h3>
        <p class="text-gray-600">در حال حاضر هیچ اقامتگاه برتری موجود نیست</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import ListingCard from '~/components/ui/ListingCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

defineProps({
  listings: {
    type: Array,
    required: true
  }
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.listing-slider {
  padding: 20px 0;
}

:deep(.swiper-button-next-custom),
:deep(.swiper-button-prev-custom) {
  position: static;
  margin: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.swiper-button-next-custom:after),
:deep(.swiper-button-prev-custom:after) {
  display: none;
}

:deep(.swiper-slide) {
  height: auto;
  display: flex;
}

:deep(.swiper-slide > div) {
  width: 100%;
}
</style> 