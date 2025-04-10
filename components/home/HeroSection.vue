<template>
  <section class="relative h-[300px] bg-gray-900">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img 
        src="https://cdn.jabama.com/image/jabama-images/1297502/833d6419-d033-44d1-b531-26afaf35797e.jpg" 
        alt="Hero background" 
        class="w-full h-full object-cover object-center"
      >
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <!-- Content -->
    <div class="relative h-full container mx-auto px-4 flex items-center">
      <div class="text-center mx-auto max-w-3xl">
        <h1 class="text-4xl font-bold text-white mb-4">
          بهترین اقامتگاه‌ها را با جاباما پیدا کنید
        </h1>
        <p class="text-lg text-gray-200 mb-8">
          هزاران اقامتگاه در سراسر دنیا منتظر شما هستند
        </p>
        <div class="flex justify-center gap-4">
          <NuxtLink 
            to="/listings" 
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            مشاهده اقامتگاه‌ها
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            درباره ما
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props needed for this component
</script> 