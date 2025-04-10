<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="category in categories" :key="category.name" 
             class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <i :class="category.icon" class="text-4xl text-gray-600"></i>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
            <p class="text-gray-600 mb-4">{{ category.description }}</p>
            <NuxtLink :to="`/listings?category=${category.slug}`" class="text-blue-600 hover:text-blue-800">
              Browse {{ category.name }} <i class="fas fa-arrow-right ml-1"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script> 