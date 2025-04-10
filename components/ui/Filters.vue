<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <RulesAmenitiesModal 
      :show="showModal"
      :filters="localFilters"
      @close="showModal = false"
      @update:filters="(newFilters) => localFilters = newFilters"
    />
    <div 
      class="flex justify-between items-center mb-4 cursor-pointer"
      @click="closeFilters"
    >
      <h3 class="text-xl font-semibold flex items-center">
        Filters
      </h3>
    </div>
    
    <!-- City -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
      <select 
        v-model="localFilters.city" 
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
      >
        <option value="">All Cities</option>
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
    </div>

    <!-- Type and Location Type -->
    <div class="mb-4">
      <div class="flex gap-2">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select 
            v-model="localFilters.type" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
          >
            <option value="">All Types</option>
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
          <select 
            v-model="localFilters.locationType" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
          >
            <option value="">All Locations</option>
            <option v-for="type in locationTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Price Range -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
      <div class="px-2">
        <div class="flex gap-4 mb-2">
          <div class="w-1/2">
            <label class="block text-xs text-gray-600 mb-1">Min Price</label>
            <input 
              type="range" 
              v-model="localFilters.minPrice" 
              :min="0" 
              :max="1000" 
              step="10"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <div class="text-xs text-gray-600 mt-1">${{ localFilters.minPrice || 0 }}</div>
          </div>
          <div class="w-1/2">
            <label class="block text-xs text-gray-600 mb-1">Max Price</label>
            <input 
              type="range" 
              v-model="localFilters.maxPrice" 
              :min="0" 
              :max="1000" 
              step="10"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <div class="text-xs text-gray-600 mt-1">${{ localFilters.maxPrice || 1000 }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Passenger Count and Rooms Count -->
    <div class="mb-4">
      <div class="flex gap-2">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Passenger Count</label>
          <input 
            type="number" 
            v-model="localFilters.passengerCount" 
            placeholder="Number of passengers" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Rooms Count</label>
          <input 
            type="number" 
            v-model="localFilters.roomsCount" 
            placeholder="Number of rooms" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
      </div>
    </div>

    <!-- Check-in and Check-out Dates -->
    <div class="mb-4">
      <div class="flex gap-2">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
          <input 
            type="date" 
            v-model="localFilters.checkinDate" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
          <input 
            type="date" 
            v-model="localFilters.checkoutDate" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
      </div>
    </div>

    <!-- Rules and Amenities -->
    <div class="mb-6">
      <button 
        @click="$emit('show-modal')"
        class="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <h3 class="text-lg font-semibold">Filters</h3>
        <i class="fas fa-chevron-right text-gray-400"></i>
      </button>
    </div>

    <!-- Sort By -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
      <select 
        v-model="localFilters.sortBy" 
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
      </select>
    </div>

    <!-- Apply Filters Button -->
    <button 
      @click="applyFilters" 
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
    >
      Apply Filters
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import RulesAmenitiesModal from './RulesAmenitiesModal.vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:filters', 'close', 'apply-filters', 'show-modal'])

const showModal = ref(false)

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']
const types = ['Hotel', 'Apartment', 'House', 'Villa', 'Resort']
const locationTypes = ['City Center', 'Suburb', 'Beach', 'Mountain', 'Countryside']

// Create a local copy of filters that won't affect the parent until Apply is clicked
const localFilters = ref({
  search: '',
  city: '',
  type: '',
  minPrice: '',
  maxPrice: '',
  passengerCount: '',
  roomsCount: '',
  locationType: '',
  checkinDate: '',
  checkoutDate: '',
  selectedRules: [],
  selectedAmenities: [],
  sortBy: 'price-asc'
})

// Initialize local filters from props
watch(() => props.filters, (newFilters) => {
  localFilters.value = JSON.parse(JSON.stringify(newFilters))
}, { immediate: true, deep: true })

const applyFilters = () => {
  // Create a deep copy of the local filters to ensure all values are included
  const filtersToApply = {
    search: localFilters.value.search || '',
    city: localFilters.value.city || '',
    type: localFilters.value.type || '',
    minPrice: localFilters.value.minPrice || '',
    maxPrice: localFilters.value.maxPrice || '',
    passengerCount: localFilters.value.passengerCount || '',
    roomsCount: localFilters.value.roomsCount || '',
    locationType: localFilters.value.locationType || '',
    checkinDate: localFilters.value.checkinDate || '',
    checkoutDate: localFilters.value.checkoutDate || '',
    selectedRules: localFilters.value.selectedRules || [],
    selectedAmenities: localFilters.value.selectedAmenities || [],
    sortBy: localFilters.value.sortBy || 'price-asc'
  }
  
  // Log the filters being applied for debugging
  console.log('Applying filters:', filtersToApply)
  
  // Only emit the update when Apply is clicked
  emit('update:filters', filtersToApply)
  emit('apply-filters', filtersToApply)
  emit('close')
}

const closeFilters = () => {
  emit('close')
}
</script> 