<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Featured Listings</h2>
        <div class="flex gap-2">
          <button class="swiper-button-prev-custom w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50">
            <i class="fas fa-chevron-left text-blue-600"></i>
          </button>
          <button class="swiper-button-next-custom w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50">
            <i class="fas fa-chevron-right text-blue-600"></i>
          </button>
        </div>
      </div>
      <swiper
        :modules="[Navigation]"
        :slides-per-view="4"
        :space-between="12"
        :loop="true"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom'
        }"
        :breakpoints="{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 4 }
        }"
        class="listing-slider"
      >
        <swiper-slide v-for="listing in listings" :key="listing.id">
          <ListingCard :listing="listing" />
        </swiper-slide>
      </swiper>
      <div class="text-center mt-12">
        <NuxtLink to="/listings" class="btn-primary text-lg px-8 py-3" @click="scrollToTop">
          View All Listings
        </NuxtLink>
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