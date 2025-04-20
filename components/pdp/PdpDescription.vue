<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">درباره اقامتگاه</h2>
    
    <div class="w-32 h-px bg-gray-200 mb-8"></div>
    
    <div class="space-y-6 text-gray-600 text-lg">
      <p v-if="description" class="text-justify font-light leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  description: {
    type: String,
    default: ''
  },
});
</script> 