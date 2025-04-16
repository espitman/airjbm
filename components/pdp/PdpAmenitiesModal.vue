<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">همه امکانات</h3>
          <button @click="$emit('update:modelValue', false)" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
        
        <div v-else-if="error" class="text-center py-8">
          <div class="text-red-600 mb-4">
            <svg class="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8v4m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold mb-2">خطا!</h2>
          <p class="text-gray-600">{{ error }}</p>
        </div>
        
        <div v-else>
          <div v-for="(category, categoryIndex) in amenities" :key="categoryIndex" class="mb-8">
            <h4 class="text-xl font-bold text-gray-900 mb-4">{{ category.title.fa }}</h4>
            <div class="space-y-3">
              <div v-for="(item, itemIndex) in category.items" :key="itemIndex" 
                class="flex items-center py-3 border-b border-gray-200 last:border-b-0">
                <div class="w-6 h-6 ml-3 text-gray-600" :class="{ 'opacity-50': !item.state }">
                  <img :src="item.icon.url" :alt="item.title.fa" class="w-full h-full object-contain" />
                </div>
                <div class="flex-1">
                  <div class="text-base font-medium" :class="{ 'opacity-50 line-through': !item.state }">{{ item.title.fa }}</div>
                  <ul v-if="item.items && item.items.length > 0" class="mt-1 text-sm text-gray-600 flex flex-wrap gap-2">
                    <li v-for="(subItem, subIndex) in item.items" :key="subIndex" class="flex items-center">
                      <span class="w-1.5 h-1.5 bg-gray-400 rounded-full ml-2"></span>
                      {{ subItem }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AmenityCategory } from '../../types/amenities'

defineProps<{
  modelValue: boolean
  loading: boolean
  error: string | null
  amenities: AmenityCategory[]
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script> 