<template>
  <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold text-gray-800">
        نتایج جستجو برای: {{ keyword }}
      </h2>
      
      <!-- Sort By -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">مرتب‌سازی بر اساس</label>
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
    </div>
  </div>
</template>

<script setup>
import { useFilters } from '~/composables/useFilters'
import { useNuxtApp } from '#app'

const props = defineProps({
  keyword: {
    type: String,
    required: true
  }
})

const { $listingsApi } = useNuxtApp()
const { filters, applyFilters } = useFilters()

const handleSortChange = async () => {
  // Apply filters to URL and get the updated filters
  const appliedFilters = await applyFilters()
  
  // Fetch listings with the updated filters
  await $listingsApi.fetchListings({ 
    page: 1, 
    size: 16, 
    keyword: props.keyword,
    cities: appliedFilters.cities,
    types: appliedFilters.types,
    regions: appliedFilters.regions,
    passengerCount: appliedFilters.passengerCount ? Number(appliedFilters.passengerCount) : undefined,
    rooms: appliedFilters.roomsCount ? Number(appliedFilters.roomsCount) : undefined,
    check_in: appliedFilters.check_in || undefined,
    check_out: appliedFilters.check_out || undefined,
    min_price: appliedFilters.minPrice ? parseInt(appliedFilters.minPrice) : undefined,
    max_price: appliedFilters.maxPrice ? parseInt(appliedFilters.maxPrice) : undefined,
    sort: appliedFilters.sortBy,
    selectedRules: appliedFilters.selectedRules,
    selectedAmenities: appliedFilters.selectedAmenities
  })
}
</script> 