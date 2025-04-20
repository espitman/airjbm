<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <div class="flex flex-col space-y-4">
      <!-- Title -->
      <h2 class="text-xl md:text-2xl font-bold text-gray-900">
        مشخصات کلی اقامتگاه
      </h2>
      <div class="w-32 h-px bg-gray-200 mb-8"></div>

      <!-- Content -->
      <div class="flex flex-col space-y-4">
        <!-- Main badges -->
        <div v-if="badges.main?.length" class="flex flex-col space-y-4">
          <div v-for="(badge, index) in badges.main" :key="index" class="flex items-center gap-6">
            <div class="w-6 h-6 text-gray-600">
              <img :src="badge.icon" :alt="badge.title" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col">
              <span class="text-base font-medium text-gray-700">{{ badge.title }}</span>
              <span v-if="badge.data?.length" class="text-sm text-gray-500">{{ badge.data.join('، ') }}</span>
            </div>
          </div>
        </div>

        <!-- Secondary badges -->
        <div v-if="badges.secondary?.length" class="flex flex-col space-y-4">
          <div v-for="(badge, index) in badges.secondary" :key="index" class="flex items-center gap-6">
            <div class="w-6 h-6 text-gray-600">
              <img :src="badge.icon" :alt="badge.title" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col">
              <span class="text-base font-medium text-gray-700">{{ badge.title }}</span>
              <span v-if="badge.data?.length" class="text-sm text-gray-500">{{ badge.data.join('، ') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  badges: {
    type: Object,
    default: () => ({
      main: [],
      secondary: []
    })
  }
});
</script> 