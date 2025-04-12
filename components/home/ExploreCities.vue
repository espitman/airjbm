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
          <NuxtLink :to="`/listings/city-${cities[0].name_en}`" class="bg-red-400 h-64 rounded-lg p-4 flex flex-col justify-end items-center text-white hover:opacity-90 transition-opacity">
            <h3 class="text-xl font-semibold">{{ cities[0].name_fa }}</h3>
            <p class="text-sm mb-2">تهران</p>
          </NuxtLink>
          <NuxtLink :to="`/listings/city-${cities[1].name_en}`" class="bg-teal-400 h-64 rounded-lg p-4 flex flex-col justify-end items-center text-white hover:opacity-90 transition-opacity">
            <h3 class="text-xl font-semibold">{{ cities[1].name_fa }}</h3>
            <p class="text-sm mb-2">رامسر</p>
          </NuxtLink>
          <NuxtLink :to="`/listings/city-${cities[2].name_en}`" class="bg-blue-400 h-64 rounded-lg p-4 flex flex-col justify-end items-center text-white hover:opacity-90 transition-opacity">
            <h3 class="text-xl font-semibold">{{ cities[2].name_fa }}</h3>
            <p class="text-sm mb-2">مشهد</p>
          </NuxtLink>
        </div>
        
        <!-- Second row -->
        <div class="grid grid-cols-3 gap-4">
          <NuxtLink :to="`/listings/city-${cities[3].name_en}`" class="bg-green-400 h-64 rounded-lg p-4 flex flex-col justify-end items-center text-white hover:opacity-90 transition-opacity">
            <h3 class="text-xl font-semibold">{{ cities[3].name_fa }}</h3>
            <p class="text-sm mb-2">اصفهان</p>
          </NuxtLink>
          <NuxtLink :to="`/listings/city-${cities[4].name_en}`" class="col-span-2 bg-yellow-300 h-64 rounded-lg p-4 flex flex-col justify-end items-center text-gray-800 hover:opacity-90 transition-opacity">
            <h3 class="text-xl font-semibold">{{ cities[4].name_fa }}</h3>
            <p class="text-sm mb-2">شیراز</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cities = [
  {
    name_fa: "Tehran",
    name_en: "tehran"
  },
  {
    name_fa: "Ramsar",
    name_en: "ramsar"
  },
  {
    name_fa: "Mashhad",
    name_en: "mashhad"
  },
  {
    name_fa: "Isfahan",
    name_en: "isfahan"
  },
  {
    name_fa: "Shiraz",
    name_en: "shiraz"
  }
];
</script> 