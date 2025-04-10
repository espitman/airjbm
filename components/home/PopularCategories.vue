<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-2">دسته‌بندی‌های محبوب</h2>
        <p class="text-gray-600">اقامتگاه مورد نظر خود را بر اساس نوع پیدا کنید</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="category in categories" :key="category.id" 
             class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <i :class="['fas', category.icon, 'text-4xl text-blue-600 mb-4']"></i>
          <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
          <p class="text-gray-600 mb-4">{{ category.description }}</p>
          <NuxtLink 
            :to="`/listings/all-${category.id}`"
            class="text-blue-600 hover:text-blue-700 transition-colors"
          >
            مشاهده اقامتگاه‌ها
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    id: 'villas',
    name: 'ویلا',
    icon: 'fa-home',
    description: 'ویلاهای لوکس با منظره زیبا'
  },
  {
    id: 'apartment',
    name: 'آپارتمان',
    icon: 'fa-building',
    description: 'آپارتمان‌های مبله با امکانات کامل'
  },
  {
    id: 'cottage',
    name: 'کلبه',
    icon: 'fa-house-damage',
    description: 'کلبه‌های دنج و راحت'
  },
  {
    id: 'ecotourism',
    name: 'بومگردی',
    icon: 'fa-mountain',
    description: 'اقامتگاه‌های بومگردی منحصر به فرد'
  }
]
</script> 