<template>
  <section>
    <div class="container mx-auto px-4 my-8">
      <h2 class="text-3xl font-bold text-center mb-4">کاوش بهترین شهرها</h2>
      <p class="text-gray-600 text-center max-w-3xl mx-auto mb-8">
        به کشف زیبایی‌های شهرهای ایران بپردازید
      </p>
      <div>
        <!-- First row -->
        <div class="grid grid-cols-3 gap-4 mb-4">
          <NuxtLink :to="`/listings/city-${cities[0].name_en}`" class="relative h-64 rounded-lg overflow-hidden group">
            <img :src="`/images/cities/${cities[0].name_en}.jpg`" :alt="cities[0].name_fa" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-center p-4">
              <h3 class="text-xl font-semibold text-white uppercase">{{ cities[0].name_en }}</h3>
              <p class="text-sm text-white">{{ cities[0].name_fa }}</p>
            </div>
          </NuxtLink>
          <NuxtLink :to="`/listings/city-${cities[1].name_en}`" class="relative h-64 rounded-lg overflow-hidden group">
            <img :src="`/images/cities/${cities[1].name_en}.jpg`" :alt="cities[1].name_fa" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-center p-4">
              <h3 class="text-xl font-semibold text-white uppercase">{{ cities[1].name_en }}</h3>
              <p class="text-sm text-white">{{ cities[0].name_fa }}</p>
            </div>
          </NuxtLink>
          <NuxtLink :to="`/listings/city-${cities[2].name_en}`" class="relative h-64 rounded-lg overflow-hidden group">
            <img :src="`/images/cities/${cities[2].name_en}.jpg`" :alt="cities[2].name_fa" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-center p-4">
              <h3 class="text-xl font-semibold text-white uppercase">{{ cities[2].name_en }}</h3>
              <p class="text-sm text-white">{{ cities[0].name_fa }}</p>
            </div>
          </NuxtLink>
        </div>
        
        <!-- Second row -->
        <div class="grid grid-cols-3 gap-4">
          <NuxtLink :to="`/listings/city-${cities[3].name_en}`" class="relative h-64 rounded-lg overflow-hidden group">
            <img :src="`/images/cities/${cities[3].name_en}.jpg`" :alt="cities[3].name_fa" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-center p-4">
              <h3 class="text-xl font-semibold text-white uppercase">{{ cities[3].name_en }}</h3>
              <p class="text-sm text-white">{{ cities[0].name_fa }}</p>
            </div>
          </NuxtLink>
          <NuxtLink :to="`/listings/city-${cities[4].name_en}`" class="relative h-64 rounded-lg overflow-hidden group col-span-2">
            <img :src="`/images/cities/${cities[4].name_en}.jpg`" :alt="cities[4].name_fa" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-center p-4">
              <h3 class="text-xl font-semibold text-white uppercase">{{ cities[4].name_en }}</h3>
              <p class="text-sm text-white">{{ cities[0].name_fa }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cities = [
  {
    name_fa: "تهران",
    name_en: "tehran"
  },
  {
    name_fa: "رامسر",
    name_en: "ramsar"
  },
  {
    name_fa: "مشهد",
    name_en: "mashhad"
  },
  {
    name_fa: "اصفهان",
    name_en: "isfahan"
  },
  {
    name_fa: "شیراز",
    name_en: "shiraz"
  }
];
</script> 