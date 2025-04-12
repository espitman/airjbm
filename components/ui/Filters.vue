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
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">شهر</label>
      <div class="relative" ref="cityDropdownRef">
        <div 
          @click="showCityDropdown = !showCityDropdown"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6 cursor-pointer flex justify-between items-center"
        >
          <span>{{ selectedCities.length > 0 ? 'انتخاب شهر' : 'انتخاب شهر' }}</span>
          <i class="fas fa-chevron-down text-gray-400"></i>
        </div>
        
        <div 
          v-if="showCityDropdown"
          class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <!-- Search input -->
          <div class="sticky top-0 bg-white p-2 border-b">
            <input 
              type="text" 
              v-model="citySearch"
              @input="highlightedIndex = -1"
              @keydown.down.prevent="navigateDropdown('down')"
              @keydown.up.prevent="navigateDropdown('up')"
              @keydown.enter.prevent="selectHighlightedCity"
              @keydown.esc="closeDropdown"
              placeholder="جستجوی شهر..." 
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
          </div>
          
          <!-- City list -->
          <div
            v-for="(city, index) in filteredCities"
            :key="city.city_name_en"
            @click="selectCity(city)"
            :class="[
              'px-3 py-2 cursor-pointer text-sm',
              isCitySelected(city) ? 'bg-blue-100' : highlightedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-100'
            ]"
          >
            {{ city.city_name_fa }}
            <span v-if="isCitySelected(city)" class="float-left text-xs text-gray-500">(انتخاب شده)</span>
          </div>
        </div>
        
        <!-- Selected Cities Tags -->
        <div v-if="selectedCities.length > 0" class="flex flex-wrap gap-1 mt-2">
          <div 
            v-for="city in selectedCities" 
            :key="city.city_name_en"
            class="flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
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
      </div>
    </div>

    <!-- Type -->
    <div v-if="types && types.length > 1" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">نوع اقامتگاه</label>
      <div class="relative" ref="typeDropdownRef">
        <div 
          @click="showTypeDropdown = !showTypeDropdown"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6 cursor-pointer flex justify-between items-center"
        >
          <span>{{ selectedTypes.length > 0 ? 'انتخاب نوع' : 'انتخاب نوع' }}</span>
          <i class="fas fa-chevron-down text-gray-400"></i>
        </div>
        
        <div 
          v-if="showTypeDropdown"
          class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <div
            v-for="type in types"
            :key="type"
            @click="toggleType(type)"
            :class="[
              'px-3 py-2 cursor-pointer text-sm',
              isTypeSelected(type) ? 'bg-blue-100' : 'hover:bg-gray-100'
            ]"
          >
            {{ $persianTranslations.getPersianTypeName(type) }}
            <span v-if="isTypeSelected(type)" class="float-left text-xs text-gray-500">(انتخاب شده)</span>
          </div>
        </div>
        
        <!-- Selected Types Tags -->
        <div v-if="selectedTypes.length > 0" class="flex flex-wrap gap-1 mt-2">
          <div 
            v-for="type in selectedTypes" 
            :key="type"
            class="flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
          >
            <span>{{ $persianTranslations.getPersianTypeName(type) }}</span>
            <button 
              @click="removeType(type)"
              class="text-blue-600 hover:text-blue-800"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Region Filter -->
    <div v-if="regions && regions.length > 0" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">منطقه</label>
      <div class="relative" ref="regionDropdownRef">
        <div 
          @click="toggleRegionDropdown"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6 cursor-pointer flex justify-between items-center"
        >
          <span>{{ selectedRegions.length > 0 ? 'انتخاب منطقه' : 'انتخاب منطقه' }}</span>
          <i class="fas fa-chevron-down text-gray-400"></i>
        </div>
        
        <div 
          v-if="showRegionDropdown"
          class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <div
            v-for="region in regions"
            :key="region"
            @click="toggleRegion(region)"
            :class="[
              'px-3 py-2 cursor-pointer text-sm',
              isRegionSelected(region) ? 'bg-blue-100' : 'hover:bg-gray-100'
            ]"
          >
            {{ $persianTranslations.getPersianRegionName(region) }}
            <span v-if="isRegionSelected(region)" class="float-left text-xs text-gray-500">(انتخاب شده)</span>
          </div>
        </div>
        
        <!-- Selected Regions Tags - Moved below the select box and made smaller -->
        <div v-if="selectedRegions.length > 0" class="flex flex-wrap gap-1 mt-2">
          <div 
            v-for="region in selectedRegions" 
            :key="region"
            class="flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
          >
            <span>{{ $persianTranslations.getPersianRegionName(region) }}</span>
            <button 
              @click="removeRegion(region)"
              class="text-blue-600 hover:text-blue-800"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
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
            :value="filters.passengerCount"
            @input="(e) => {
              const value = e.target.value;
              validatePassengerCount(value);
              updateFilter('passengerCount', value);
            }"
            min="1"
            placeholder="تعداد مسافران" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد اتاق</label>
          <input 
            type="number" 
            :value="filters.roomsCount"
            @input="(e) => {
              const value = e.target.value;
              validateRoomCount(value);
              updateFilter('roomsCount', value);
            }"
            min="0"
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
import { ref, watch, onMounted, computed, onBeforeUnmount } from 'vue'
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

const {
  filters,
  selectedCities,
  selectedRegions,
  selectedTypes,
  priceRange,
  showCityDropdown,
  showRegionDropdown,
  showTypeDropdown,
  citySearch,
  highlightedIndex,
  validatePassengerCount,
  validateRoomCount,
  formatPrice,
  formatDate,
  filteredCities,
  isCitySelected,
  selectCity,
  removeCity,
  isRegionSelected,
  toggleRegion,
  removeRegion,
  isTypeSelected,
  toggleType,
  removeType,
  handlePriceChange,
  handleDateUpdate,
  applyFilters,
  updateFilter
} = useFilters()

// Use cities from userFilters
const cities = ref(null)
const types = ref(['apartment', 'villa', 'carvansara', 'cottage', 'hostel'])
const regions = ref(['coastal', 'rustic', 'urban', 'forest', 'mountainous', 'desert', 'jungle', 'city'])

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

// Update handleCityBlur to not close the dropdown immediately
const handleCityBlur = () => {
  // Don't close the dropdown immediately to allow for selection
}

// Handle type change
const handleTypeChange = (event) => {
  const selectedType = event.target.value
  filters.value.types = selectedType ? [selectedType] : []
}

// Apply filters - this will be called when the Apply Filters button is clicked
const handleApplyFilters = async () => {
  // Make sure the cities are properly set in the filters
  const cityNames = selectedCities.value.map(c => c.city_name_en)
  filters.value.cities = cityNames
  
  // Update regions filter with selected regions
  filters.value.regions = selectedRegions.value
  
  // Apply filters to URL
  await applyFilters()
  
  // Emit the apply-filters event
  emit('apply-filters')
}

// Close filters
const closeFilters = () => {
  emit('close')
}

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

// Watch for changes in filters.regions and update selectedRegions
watch(() => filters.value.regions, (newRegions) => {
  if (newRegions && Array.isArray(newRegions) && newRegions.length > 0) {
    selectedRegions.value = newRegions
  } else {
    selectedRegions.value = []
  }
}, { immediate: true })

// Add ref for the city dropdown container
const cityDropdownRef = ref(null)

// Add ref for the type dropdown container
const typeDropdownRef = ref(null)

// Add click outside handler
onMounted(() => {
  const handleClickOutside = (event) => {
    if (cityDropdownRef.value && !cityDropdownRef.value.contains(event.target)) {
      closeDropdown()
    }
    if (regionDropdownRef.value && !regionDropdownRef.value.contains(event.target)) {
      showRegionDropdown.value = false
    }
    if (typeDropdownRef.value && !typeDropdownRef.value.contains(event.target)) {
      showTypeDropdown.value = false
    }
  }
  
  // Add and remove event listener
  document.addEventListener('click', handleClickOutside)
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

// Add region dropdown state
const regionDropdownRef = ref(null)

// Add function to toggle region dropdown
const toggleRegionDropdown = () => {
  showRegionDropdown.value = !showRegionDropdown.value
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