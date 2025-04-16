<template>
  <div>
    <HeroSection />
    <PopularCategories  />
    <ExploreCities />
    <FeaturedListings 
      keyword="city-tehran" 
      title="اقامتگاه‌های تهران" 
      description="بهترین اقامتگاه‌های تهران را کشف کنید" 
    />
    <div class="container mx-auto px-4 my-16">
      <VrboBanner />
    </div>
    <FeaturedListings 
      keyword="all-villas" 
      title="ویلاهای لوکس" 
      description="مجموعه کامل ویلاهای لوکس در سراسر ایران" 
    />
    <div class="container mx-auto px-4 my-16">
      <Stays />
    </div>
    <FeaturedListings 
      keyword="zone-south" 
      title="اقامتگاه‌های جنوب" 
      description="بهترین اقامتگاه‌های جنوب کشور با قیمت مناسب" 
    />
  </div>
</template>

<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import PopularCategories from '~/components/home/PopularCategories.vue'
import FeaturedListings from '~/components/home/FeaturedListings.vue'
import ExploreCities from '~/components/home/ExploreCities.vue'
import VrboBanner from '~/components/home/VrboBanner.vue'
import Stays from '~/components/home/Stays.vue'
</script>

