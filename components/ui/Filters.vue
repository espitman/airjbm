<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <RulesAmenitiesModal 
      :show="showModal"
      :filters="filters"
      @close="showModal = false"
      @update:filters="(newFilters) => filters = newFilters"
    />
    <div 
      class="flex justify-between items-center mb-4 cursor-pointer"
      @click="closeFilters"
    >
      <h3 class="text-xl font-semibold flex items-center">
        فیلترها
      </h3>
    </div>
    
    <!-- City -->
    <div v-if="cities && cities.length > 1" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">شهر</label>
      <select 
        v-model="selectedCityDisplay" 
        @change="handleCityChange"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
      >
        <option value="">همه شهرها</option>
        <option v-for="city in cities" :key="city.city_name_en" :value="city.city_name_fa">
          {{ city.city_name_fa }}
        </option>
      </select>
    </div>

    <!-- Type -->
    <div v-if="types && types.length > 1" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">نوع اقامتگاه</label>
      <select 
        :value="filters.types[0] || ''"
        @change="handleTypeChange"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
      >
        <option value="">همه انواع</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ getPersianTypeName(type) }}
        </option>
      </select>
    </div>

    <!-- Region -->
    <div v-if="regions && regions.length > 1" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">منطقه</label>
      <select 
        :value="filters.regions[0] || ''"
        @change="handleRegionChange"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
      >
        <option value="">همه مناطق</option>
        <option v-for="region in regions" :key="region" :value="region">
          {{ getPersianRegionName(region) }}
        </option>
      </select>
    </div>

    <!-- Check-in and Check-out Dates -->
    <div class="mb-4">
      <div class="flex gap-2">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تاریخ ورود</label>
          <input 
            type="date" 
            v-model="props.filters.checkinDate" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تاریخ خروج</label>
          <input 
            type="date" 
            v-model="props.filters.checkoutDate" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
      </div>
    </div>

    <!-- Passenger Count and Rooms Count -->
    <div class="mb-4">
      <div class="flex gap-2">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد مسافر</label>
          <input 
            type="number" 
            v-model="props.filters.passengerCount" 
            placeholder="تعداد مسافران" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد اتاق</label>
          <input 
            type="number" 
            v-model="props.filters.roomsCount" 
            placeholder="تعداد اتاق‌ها" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
      </div>
    </div>

    <!-- Price Range -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">محدوده قیمت</label>
      <div class="px-2">
        <div class="flex gap-4 mb-2">
          <div class="w-1/2">
            <label class="block text-xs text-gray-600 mb-1">حداقل قیمت</label>
            <input 
              type="range" 
              v-model="props.filters.minPrice" 
              :min="0" 
              :max="1000" 
              step="10"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <div class="text-xs text-gray-600 mt-1">${{ props.filters.minPrice || 0 }}</div>
          </div>
          <div class="w-1/2">
            <label class="block text-xs text-gray-600 mb-1">حداکثر قیمت</label>
            <input 
              type="range" 
              v-model="props.filters.maxPrice" 
              :min="0" 
              :max="1000" 
              step="10"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <div class="text-xs text-gray-600 mt-1">${{ props.filters.maxPrice || 1000 }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rules and Amenities -->
    <div class="mb-6">
      <button 
        @click="$emit('show-modal')"
        class="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <h3 class="text-lg font-semibold">فیلترها</h3>
        <i class="fas fa-chevron-right text-gray-400"></i>
      </button>
    </div>

    <!-- Sort By -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">مرتب‌سازی بر اساس</label>
      <select 
        v-model="props.filters.sortBy" 
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
      >
        <option value="price-asc">قیمت: کم به زیاد</option>
        <option value="price-desc">قیمت: زیاد به کم</option>
        <option value="rating-desc">امتیاز: زیاد به کم</option>
        <option value="rating-asc">امتیاز: کم به زیاد</option>
      </select>
    </div>

    <!-- Apply Filters Button -->
    <button 
      @click="applyFilters" 
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
    >
      اعمال فیلترها
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import RulesAmenitiesModal from './RulesAmenitiesModal.vue'
import { useFilters } from '~/composables/useFilters'
import { useNuxtApp } from '#app'

const { $persianTranslations } = useNuxtApp()

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  userFilters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:filters', 'close', 'apply-filters', 'show-modal'])

const showModal = ref(false)

// Use the filters composable
const { filters, updateFilter, applyFilters: applyFiltersToUrl } = useFilters()

// Use cities from userFilters
const cities = ref(null)
const types = ref(['apartment', 'villa', 'carvansara', 'cottage', 'hostel'])
const regions = ref(['coastal', 'rustic', 'urban', 'forest', 'mountainous', 'desert', 'jungle', 'city'])

// Separate display value for the city select
const selectedCityDisplay = ref('')

// Watch for changes in userFilters.cities and update cities
watch(() => props.userFilters.cities, (newCities) => {
  if (newCities && Array.isArray(newCities) && newCities.length > 0) {
    cities.value = newCities
    
    // Update the display value when cities are loaded
    if (filters.value.cities.length > 0) {
      const cityObj = newCities.find(city => city.city_name_en === filters.value.cities[0])
      if (cityObj) {
        selectedCityDisplay.value = cityObj.city_name_fa
      }
    }
  } else {
    cities.value = null
  }
}, { immediate: true })

// Watch for changes in userFilters.types and update types
watch(() => props.userFilters.types, (newTypes) => {
  if (newTypes && Array.isArray(newTypes) && newTypes.length > 0) {
    types.value = newTypes
  }
}, { immediate: true })

// Watch for changes in userFilters.regions and update regions
watch(() => props.userFilters.regions, (newRegions) => {
  if (newRegions && Array.isArray(newRegions) && newRegions.length > 0) {
    regions.value = newRegions
  }
}, { immediate: true })

// Function to close filters
const closeFilters = () => {
  emit('close')
}

// Function to apply filters
const applyFilters = () => {
  // First update the URL
  const currentFilters = applyFiltersToUrl()
  
  // Then emit the filters for the API call
  emit('apply-filters', {
    city: currentFilters.cities[0] || '',
    type: currentFilters.types[0] || '',
    region: currentFilters.regions[0] || '',
    minPrice: props.filters.minPrice || '',
    maxPrice: props.filters.maxPrice || '',
    passengerCount: props.filters.passengerCount || '',
    roomsCount: props.filters.roomsCount || '',
    checkinDate: props.filters.checkinDate || '',
    checkoutDate: props.filters.checkoutDate || '',
    selectedRules: props.filters.rules || [],
    selectedAmenities: props.filters.amenities || [],
    sortBy: props.filters.sortBy || 'price-asc'
  })
  
  // Close the modal if it's open
  if (showModal.value) {
    showModal.value = false
  }
}

// Function to get Persian name for type using the plugin
const getPersianTypeName = (type) => {
  return $persianTranslations.getPersianTypeName(type)
}

// Function to get Persian name for region using the plugin
const getPersianRegionName = (region) => {
  return $persianTranslations.getPersianRegionName(region)
}

// Update the city selection handler
const handleCityChange = (event) => {
  const select = event.target
  const selectedCity = cities.value.find(city => city.city_name_fa === select.value)
  if (selectedCity) {
    updateFilter('cities', [selectedCity.city_name_en])
    selectedCityDisplay.value = selectedCity.city_name_fa
  } else {
    updateFilter('cities', [])
    selectedCityDisplay.value = ''
  }
}

// Update the type selection handler
const handleTypeChange = (event) => {
  const select = event.target
  updateFilter('types', select.value ? [select.value] : [])
}

// Update the region selection handler
const handleRegionChange = (event) => {
  const select = event.target
  updateFilter('regions', select.value ? [select.value] : [])
}

// Initialize default values for types and regions
onMounted(() => {
  // Only set default types if not already set and API hasn't provided values
  if ((!types.value || types.value.length === 0) && 
      (!props.userFilters.types || !Array.isArray(props.userFilters.types) || props.userFilters.types.length === 0)) {
    types.value = ['apartment', 'villa', 'carvansara', 'cottage', 'hostel']
  }
  
  // Only set default regions if not already set and API hasn't provided values
  if ((!regions.value || regions.value.length === 0) && 
      (!props.userFilters.regions || !Array.isArray(props.userFilters.regions) || props.userFilters.regions.length === 0)) {
    regions.value = ['coastal', 'rustic', 'urban', 'forest', 'mountainous', 'desert', 'jungle', 'city']
  }
  
  // Initialize filters from URL if available
  if (props.filters) {
    // Update city filter if available
    if (props.filters.city) {
      updateFilter('cities', [props.filters.city])
      
      // Update city display if cities are loaded
      if (cities.value) {
        const cityObj = cities.value.find(city => city.city_name_en === props.filters.city)
        if (cityObj) {
          selectedCityDisplay.value = cityObj.city_name_fa
        }
      }
    }
    
    // Update type filter if available
    if (props.filters.type) {
      updateFilter('types', [props.filters.type])
    }
    
    // Update region filter if available
    if (props.filters.region) {
      updateFilter('regions', [props.filters.region])
    }
  }
})
</script> 