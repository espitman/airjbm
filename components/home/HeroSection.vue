<template>
  <section class="relative py-10 h-[320px]">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img 
        src="https://cdn.jabama.com/image/jabama-images/1297502/833d6419-d033-44d1-b531-26afaf35797e.jpg" 
        alt="Hero Background" 
        class="w-full h-full object-cover object-middle"
      />
      <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
    </div>
    
    <!-- Content -->
    <div class="container mx-auto px-4 relative z-10 h-full flex items-center">
      <div class="max-w-3xl mx-auto text-center text-white">
        <h1 class="text-4xl font-bold mb-4">Find the Best Places in Your City</h1>
        <p class="text-lg mb-6">Discover restaurants, hotels, shops, and more with our comprehensive directory.</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/listings" class="btn-primary text-lg px-8 py-3 rounded-lg w-[260px]">
            Browse Listings
          </NuxtLink>
          <button class="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg w-[260px]">
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