<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <div class="flex flex-col space-y-4">
      <!-- Title -->
      <h2 class="text-xl md:text-2xl font-bold text-gray-900">
        فاصله از مراکز مهم
      </h2>
      <div class="w-32 h-px bg-gray-200 mb-8"></div>

      <!-- Content -->
      <div v-if="nearbyCenters.length > 0" class="flex flex-col space-y-6">
        <div v-for="(center, index) in nearbyCenters" :key="index" class="flex flex-col">
          <span class="text-base font-medium text-gray-700">{{ center.title }}</span>
          <ul class="mt-2 space-y-2">
            <li v-for="(item, itemIndex) in center.items" :key="itemIndex" class="flex justify-between items-center">
              <span class="text-sm text-gray-700 text-right">{{ item.key }}</span>
              <span class="text-sm text-gray-500 text-left">{{ item.value }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- No Data Message -->
      <div v-else class="text-gray-500 text-base">
        اطلاعات فاصله در دسترس نیست
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  nearbyCenters: {
    type: Array,
    default: () => []
  }
});


</script> 