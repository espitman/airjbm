<template>
  <section class="bg-gray-900 text-white py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">Find the Best Places in Your City</h1>
        <p class="text-xl mb-8">Discover restaurants, hotels, shops, and more with our comprehensive directory.</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/listings" class="btn-primary text-lg px-8 py-3">
            Browse Listings
          </NuxtLink>
          <button class="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg">
            Add Your Business
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props needed for this component
</script> 