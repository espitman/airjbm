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
      <div class="relative">
        <!-- Selected Cities Tags -->
        <div v-if="selectedCities.length > 0" class="flex flex-wrap gap-2 mb-2">
          <div 
            v-for="city in selectedCities" 
            :key="city.city_name_en"
            class="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm"
          >
            <span>{{ city.city_name_fa }}</span>
            <button 
              @click="removeCity(city)"
              class="text-blue-600 hover:text-blue-800"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <input
          type="text"
          v-model="citySearch"
          @focus="showCityDropdown = true"
          @blur="handleCityBlur"
          @keydown.down.prevent="navigateDropdown('down')"
          @keydown.up.prevent="navigateDropdown('up')"
          @keydown.enter.prevent="selectHighlightedCity"
          @keydown.esc="closeDropdown"
          placeholder="جستجوی شهر..."
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
        />
        <div 
          v-if="showCityDropdown && filteredCities.length > 0"
          class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <div
            v-for="(city, index) in filteredCities"
            :key="city.city_name_en"
            @mousedown="selectCity(city)"
            :class="[
              'px-3 py-2 cursor-pointer text-sm',
              highlightedIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100',
              isCitySelected(city) ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            ]"
            :style="isCitySelected(city) ? 'pointer-events: none;' : ''"
          >
            {{ city.city_name_fa }}
            <span v-if="isCitySelected(city)" class="float-left text-xs text-gray-500">(انتخاب شده)</span>
          </div>
        </div>
      </div>
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
      <label class="block text-sm font-medium text-gray-700 mb-1">تاریخ اقامت</label>
      <button 
        @click="showDateModal = true"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-right flex justify-between items-center"
      >
        <span v-if="filters.check_in && filters.check_out">
          {{ formatDate(filters.check_in) }} - {{ formatDate(filters.check_out) }}
        </span>
        <span v-else>انتخاب تاریخ ورود و خروج</span>
        <i class="fas fa-calendar-alt text-gray-400"></i>
      </button>
    </div>

    <!-- Passenger Count and Rooms Count -->
    <div class="mb-4">
      <div class="flex gap-2">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد مسافر</label>
          <input 
            type="number" 
            v-model="filters.passengerCount" 
            placeholder="تعداد مسافران" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد اتاق</label>
          <input 
            type="number" 
            v-model="filters.roomsCount" 
            placeholder="تعداد اتاق‌ها" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
      </div>
    </div>

    <!-- Price Range Filter -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-4">محدوده قیمت</h3>
      <div class="px-4">
        <VueSlider
          v-model="priceRange"
          :min="0"
          :max="1000000000"
          :interval="1000000"
          :tooltip="'none'"
          :process="true"
          :dot-size="16"
          :height="4"
          :tooltip-dir="'top'"
          :rail-color="'#e5e7eb'"
          :process-color="'#3b82f6'"
          :dot-color="'#3b82f6'"
          :dot-border="2"
          :dot-border-color="'#ffffff'"
          :dot-shadow="true"
          :enable-cross="false"
          :lazy="false"
          :clickable="true"
          :drag-on-click="true"
          :multiple="true"
          :reverse="true"
          @change="handlePriceChange"
        />
        <div class="flex justify-between mt-2 text-sm text-gray-600">
          <span>{{ formatPrice(priceRange[1]) }}</span>
          <span>{{ formatPrice(priceRange[0]) }}</span>
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

    <!-- Apply Filters Button -->
    <button 
      @click="handleApplyFilters" 
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
    >
      اعمال فیلترها
    </button>
    
    <!-- Date Selection Modal -->
    <DateSelectionModal
      :show="showDateModal"
      :initial-checkin-date="filters.check_in"
      :initial-checkout-date="filters.check_out"
      @close="showDateModal = false"
      @update:dates="handleDateUpdate"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import RulesAmenitiesModal from './RulesAmenitiesModal.vue'
import DateSelectionModal from './DateSelectionModal.vue'
import { useFilters } from '~/composables/useFilters'
import { useNuxtApp } from '#app'
import VueSlider from 'vue-3-slider-component'

const { $persianTranslations } = useNuxtApp()

const props = defineProps({
  userFilters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'apply-filters', 'show-modal'])

const showModal = ref(false)
const showDateModal = ref(false)

// Use the filters composable
const { filters, updateFilter, applyFilters: applyFiltersToUrl } = useFilters()

// Use cities from userFilters
const cities = ref(null)
const types = ref(['apartment', 'villa', 'carvansara', 'cottage', 'hostel'])
const regions = ref(['coastal', 'rustic', 'urban', 'forest', 'mountainous', 'desert', 'jungle', 'city'])

// City search state
const citySearch = ref('')
const showCityDropdown = ref(false)

// Add highlightedIndex for keyboard navigation
const highlightedIndex = ref(-1)

// Add selectedCities ref to track selected cities
const selectedCities = ref([])

// Check if a city is already selected
const isCitySelected = (city) => {
  return selectedCities.value.some(selected => selected.city_name_en === city.city_name_en)
}

// Filtered cities based on search
const filteredCities = computed(() => {
  if (!cities.value) return []
  if (!citySearch.value) return cities.value
  
  return cities.value.filter(city => 
    city.city_name_fa.includes(citySearch.value) ||
    city.city_name_en.toLowerCase().includes(citySearch.value.toLowerCase())
  )
})

// Price range state
const priceRange = ref([0, 1000000000])

// Watch for changes in userFilters.cities and update cities
watch(() => props.userFilters.cities, (newCities) => {
  if (newCities && Array.isArray(newCities) && newCities.length > 0) {
    cities.value = newCities
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

// Watch for changes in filters and update price range
watch(() => filters.value, (newFilters) => {
  if (newFilters.minPrice) {
    priceRange.value[0] = parseInt(newFilters.minPrice)
  }
  if (newFilters.maxPrice) {
    priceRange.value[1] = parseInt(newFilters.maxPrice)
  }
}, { deep: true })

// Update the watch for filters.cities to handle multiple cities
watch(() => filters.value.cities, (newCities) => {
  if (newCities && Array.isArray(newCities) && newCities.length > 0 && cities.value) {
    selectedCities.value = newCities.map(cityName => {
      return cities.value.find(city => city.city_name_en === cityName)
    }).filter(Boolean)
  } else {
    selectedCities.value = []
  }
}, { immediate: true })

// Update selectCity to handle multiple selection without applying to URL
const selectCity = (city) => {
  if (!isCitySelected(city)) {
    selectedCities.value.push(city)
    const cityNames = selectedCities.value.map(c => c.city_name_en)
    updateFilter('cities', cityNames)
  }
  citySearch.value = ''
  showCityDropdown.value = false
  highlightedIndex.value = -1
}

// Add function to remove a city without applying to URL
const removeCity = (city) => {
  selectedCities.value = selectedCities.value.filter(c => c.city_name_en !== city.city_name_en)
  const cityNames = selectedCities.value.map(c => c.city_name_en)
  updateFilter('cities', cityNames)
}

// Navigate dropdown with keyboard
const navigateDropdown = (direction) => {
  if (!showCityDropdown.value || filteredCities.value.length === 0) return
  
  if (direction === 'down') {
    highlightedIndex.value = highlightedIndex.value < filteredCities.value.length - 1 
      ? highlightedIndex.value + 1 
      : 0
  } else {
    highlightedIndex.value = highlightedIndex.value > 0 
      ? highlightedIndex.value - 1 
      : filteredCities.value.length - 1
  }
}

// Select highlighted city with Enter key
const selectHighlightedCity = () => {
  if (highlightedIndex.value >= 0 && highlightedIndex.value < filteredCities.value.length) {
    selectCity(filteredCities.value[highlightedIndex.value])
  }
}

// Close dropdown with Escape key
const closeDropdown = () => {
  showCityDropdown.value = false
  highlightedIndex.value = -1
}

// Reset highlighted index when search changes
watch(citySearch, () => {
  highlightedIndex.value = -1
})

// Update handleCityBlur to also reset highlighted index
const handleCityBlur = () => {
  setTimeout(() => {
    showCityDropdown.value = false
    highlightedIndex.value = -1
  }, 200)
}

// Handle type change
const handleTypeChange = (event) => {
  const selectedType = event.target.value
  updateFilter('types', selectedType ? [selectedType] : [])
}

// Handle region change
const handleRegionChange = (event) => {
  const selectedRegion = event.target.value
  updateFilter('regions', selectedRegion ? [selectedRegion] : [])
}

// Handle price change
const handlePriceChange = (values) => {
  updateFilter('minPrice', values[0].toString())
  updateFilter('maxPrice', values[1].toString())
}

// Handle date update
const handleDateUpdate = (dates) => {
  updateFilter('check_in', dates.checkin)
  updateFilter('check_out', dates.checkout)
}

// Apply filters - this will be called when the Apply Filters button is clicked
const handleApplyFilters = async () => {
  // Make sure the cities are properly set in the filters
  const cityNames = selectedCities.value.map(c => c.city_name_en)
  updateFilter('cities', cityNames)
  
  // Apply filters to URL
  await applyFiltersToUrl()
  emit('apply-filters')
}

// Close filters
const closeFilters = () => {
  emit('close')
}

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
}

// Format date
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fa-IR')
}

// Get Persian type name
const getPersianTypeName = (type) => {
  return $persianTranslations?.getPersianTypeName(type) || type
}

// Get Persian region name
const getPersianRegionName = (region) => {
  return $persianTranslations?.getPersianRegionName(region) || region
}
</script>

<style>
/* Custom styles for the Jalali date picker */
.vpd-wrapper {
  z-index: 100;
}

.vpd-controls {
  z-index: 100;
}

.vpd-actions {
  z-index: 100;
}

.vpd-popup {
  z-index: 1000 !important;
}

/* Vue Slider custom styles */
.vue-slider {
  margin: 1rem 0;
}

.vue-slider-dot {
  cursor: pointer;
}

.vue-slider-process {
  background-color: #3b82f6;
}

.vue-slider-rail {
  background-color: #e5e7eb;
}
</style> 