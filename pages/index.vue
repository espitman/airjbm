<template>
  <div>
    <HeroSection />
    <PopularCategories  />
    <FeaturedListings keyword="province-tehran" />
  </div>
</template>

<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import PopularCategories from '~/components/home/PopularCategories.vue'
import FeaturedListings from '~/components/home/FeaturedListings.vue'


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