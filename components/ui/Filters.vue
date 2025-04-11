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
        v-model="localFilters.type" 
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
        v-model="localFilters.region" 
        @change="handleRegionChange"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pl-6"
      >
        <option value="">همه مناطق</option>
        <option v-for="region in regions" :key="region" :value="region">
          {{ getPersianRegionName(region) }}
        </option>
      </select>
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
              v-model="localFilters.minPrice" 
              :min="0" 
              :max="1000" 
              step="10"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <div class="text-xs text-gray-600 mt-1">${{ localFilters.minPrice || 0 }}</div>
          </div>
          <div class="w-1/2">
            <label class="block text-xs text-gray-600 mb-1">حداکثر قیمت</label>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد مسافر</label>
          <input 
            type="number" 
            v-model="localFilters.passengerCount" 
            placeholder="تعداد مسافران" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد اتاق</label>
          <input 
            type="number" 
            v-model="localFilters.roomsCount" 
            placeholder="تعداد اتاق‌ها" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
      </div>
    </div>

    <!-- Check-in and Check-out Dates -->
    <div class="mb-4">
      <div class="flex gap-2">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تاریخ ورود</label>
          <input 
            type="date" 
            v-model="localFilters.checkinDate" 
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700 mb-1">تاریخ خروج</label>
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
        <h3 class="text-lg font-semibold">فیلترها</h3>
        <i class="fas fa-chevron-right text-gray-400"></i>
      </button>
    </div>

    <!-- Sort By -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">مرتب‌سازی بر اساس</label>
      <select 
        v-model="localFilters.sortBy" 
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
import { ref, watch, computed, onMounted } from 'vue'
import RulesAmenitiesModal from './RulesAmenitiesModal.vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  userFilters: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:filters', 'close', 'apply-filters', 'show-modal', 'city-selected', 'type-selected', 'region-selected'])

const showModal = ref(false)

// Use cities from userFilters
const cities = ref(null)
const types = ref(['apartment', 'villa', 'carvansara', 'cottage', 'hostel'])
const regions = ref(['coastal', 'rustic', 'urban', 'forest', 'mountainous', 'desert', 'jungle', 'city'])

// Create a local copy of filters that won't affect the parent until Apply is clicked
const localFilters = ref({
  search: '',
  city: '',
  type: '',
  minPrice: '',
  maxPrice: '',
  passengerCount: '',
  roomsCount: '',
  region: '',
  checkinDate: '',
  checkoutDate: '',
  sortBy: 'price-asc',
  rules: [],
  amenities: []
})

// Separate display value for the city select
const selectedCityDisplay = ref('')

// Watch for changes in props.filters and update localFilters
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
  
  // Update the display value when filters change
  if (localFilters.value.city && cities.value) {
    const cityObj = cities.value.find(city => city.city_name_en === localFilters.value.city)
    if (cityObj) {
      selectedCityDisplay.value = cityObj.city_name_fa
    } else {
      selectedCityDisplay.value = ''
    }
  } else {
    selectedCityDisplay.value = ''
  }
}, { deep: true, immediate: true })

// Watch for changes in userFilters.cities and update cities
watch(() => props.userFilters.cities, (newCities) => {
  if (newCities && Array.isArray(newCities) && newCities.length > 0) {
    cities.value = newCities
    
    // Update the display value when cities are loaded
    if (localFilters.value.city) {
      const cityObj = newCities.find(city => city.city_name_en === localFilters.value.city)
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

// Watch for changes in the modelValue to update localFilters
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    localFilters.value = { ...newValue }
    
    // If we have a city and cities are loaded, find its Persian name
    if (localFilters.value.city && cities.value) {
      const cityObj = cities.value.find(city => city.city_name_en === localFilters.value.city)
      if (cityObj) {
        localFilters.value.cityDisplay = cityObj.city_name_fa
      }
    }
  }
}, { immediate: true, deep: true })

// Function to close filters
const closeFilters = () => {
  emit('close')
}

// Function to apply filters
const applyFilters = () => {
  // Emit the updated filters to the parent
  emit('update:filters', { ...localFilters.value })
  
  // Emit individual filter events
  if (localFilters.value.city) {
    emit('city-selected', localFilters.value.city)
  }
  
  if (localFilters.value.type) {
    emit('type-selected', localFilters.value.type)
  }
  
  if (localFilters.value.region) {
    emit('region-selected', localFilters.value.region)
  }
  
  // Emit the apply-filters event to trigger URL update
  emit('apply-filters')
}

// Function to get Persian name for type
const getPersianTypeName = (type) => {
  const typeMap = {
    'apartment': 'آپارتمان',
    'villa': 'ویلا',
    'carvansara': 'کاروانسرا',
    'cottage': 'کلبه',
    'hostel': 'هاستل',
    'complex': 'مجتمع اقامتگاهی',
    'suite': 'سوئیت',
    'traditional': 'سنتی',
    'ecotourism': 'بوم گردی',
    'inn': 'مسافرخانه'
  }
  return typeMap[type] || type
}

// Function to get Persian name for region
const getPersianRegionName = (region) => {
  const regionMap = {
    'coastal': 'ساحلی',
    'rustic': 'روستایی',
    'urban': 'شهری',
    'forest': 'جنگلی',
    'mountainous': 'کوهستانی',
    'desert': 'بیابانی',
    'jungle': 'جنگلی',
    'city': 'شهری'
  }
  return regionMap[region] || region
}

// Update the city selection handler
const handleCityChange = (event) => {
  const select = event.target
  const selectedCity = cities.value.find(city => city.city_name_fa === select.value)
  if (selectedCity) {
    localFilters.value.city = selectedCity.city_name_en
    selectedCityDisplay.value = selectedCity.city_name_fa
    // Don't emit city-selected event here, wait for Apply Filters button
  } else {
    localFilters.value.city = ''
    selectedCityDisplay.value = ''
    // Don't emit city-selected event here, wait for Apply Filters button
  }
}

// Update the type selection handler
const handleTypeChange = (event) => {
  const select = event.target
  localFilters.value.type = select.value
  console.log('Type selected:', select.value)
  // Don't emit type-selected event here, wait for Apply Filters button
}

// Update the region selection handler
const handleRegionChange = (event) => {
  const select = event.target
  localFilters.value.region = select.value
  console.log('Region selected:', select.value)
  // Don't emit region-selected event here, wait for Apply Filters button
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
  
  // Set the region from URL query if available
  if (props.filters && props.filters.region) {
    localFilters.value.region = props.filters.region
  } else {
    // Default to empty string (which will show "همه مناطق")
    localFilters.value.region = ''
  }
  
  // Set the type from URL query if available
  if (props.filters && props.filters.type) {
    localFilters.value.type = props.filters.type
  } else {
    // Default to empty string (which will show "همه انواع")
    localFilters.value.type = ''
  }
})
</script> 