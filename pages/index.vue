<template>
  <div>
    <HeroSection />
    <PopularCategories  />
    <FeaturedListings 
      keyword="province-tehran" 
      title="اقامتگاه‌های تهران" 
      description="بهترین اقامتگاه‌های تهران را کشف کنید" 
    />
    <FeaturedListings 
      keyword="all-villas" 
      title="ویلاهای لوکس" 
      description="مجموعه کامل ویلاهای لوکس در سراسر ایران" 
    />
    <FeaturedListings 
      keyword="zone-north" 
      title="اقامتگاه‌های شمال" 
      description="بهترین اقامتگاه‌های شمال کشور با قیمت مناسب" 
    />
  </div>
</template>

<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import PopularCategories from '~/components/home/PopularCategories.vue'
import FeaturedListings from '~/components/home/FeaturedListings.vue'


</script>

