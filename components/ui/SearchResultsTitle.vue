<template>
  <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
    <div class="flex flex-row items-center">
      <h2 class="text-base sm:text-lg font-semibold text-gray-800 text-left flex-1">
        نتایج جستجو برای: {{ keyword }}
      </h2>
      
      <!-- Desktop Sort By -->
      <div class="hidden sm:flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700 whitespace-nowrap">مرتب‌سازی بر اساس</label>
        <select 
          v-model="filters.sortBy" 
          @change="handleSortChange"
          class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
        >
          <option value="">پیشفرض</option>
          <option value="price-asc">قیمت: کم به زیاد</option>
          <option value="price-desc">قیمت: زیاد به کم</option>
          <option value="score-desc">امتیاز: زیاد به کم</option>
          <option value="score-asc">امتیاز: کم به زیاد</option>
        </select>
      </div>

      <!-- Mobile Sort Icon and Dropdown -->
      <div class="sm:hidden relative">
        <button 
          @click="toggleMobileSort"
          class="p-2 rounded-lg hover:bg-gray-100"
        >
          <i class="fas fa-sort-amount-down text-gray-600"></i>
        </button>

        <!-- Mobile Sort Dropdown -->
        <div 
          v-if="showMobileSort"
          class="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          <button 
            v-for="option in sortOptions" 
            :key="option.value"
            @click="handleMobileSortSelect(option.value)"
            class="w-full px-4 py-2 text-right text-sm hover:bg-gray-100"
            :class="{ 'bg-blue-50 text-blue-600': filters.sortBy === option.value }"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFilters } from '~/composables/useFilters'
import { useNuxtApp } from '#app'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  keyword: {
    type: String,
    required: true
  }
})

const { $listingsApi } = useNuxtApp()
const { filters, applyFilters, handleMobileSortSelect, handleSortChange } = useFilters()
const route = useRoute()
const router = useRouter()
const showMobileSort = ref(false)

const sortOptions = [
  { value: '', label: 'پیشفرض' },
  { value: 'price-asc', label: 'قیمت: کم به زیاد' },
  { value: 'price-desc', label: 'قیمت: زیاد به کم' },
  { value: 'score-desc', label: 'امتیاز: زیاد به کم' },
  { value: 'score-asc', label: 'امتیاز: کم به زیاد' }
]

const toggleMobileSort = () => {
  showMobileSort.value = !showMobileSort.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  // Check if the click is outside the mobile sort area
  const mobileSortArea = document.querySelector('.sm\\:hidden.relative')
  if (mobileSortArea && !mobileSortArea.contains(event.target)) {
    showMobileSort.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 