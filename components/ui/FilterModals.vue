<template>
  <!-- Rules Modal -->
  <div v-if="showRulesModal" class="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">قوانین</h3>
        <button @click="$emit('close-rules-modal')" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="space-y-2 max-h-96 overflow-y-auto">
        <label 
          v-for="rule in rules" 
          :key="rule.key"
          class="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
        >
          <input 
            type="checkbox" 
            :value="rule.key"
            v-model="localSelectedRules"
            class="rounded text-blue-600 focus:ring-blue-500"
          >
          <span>{{ rule['persian-name'] }}</span>
        </label>
      </div>
      <div class="mt-6 flex justify-end">
        <button 
          @click="applyRules"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
        >
          اعمال
        </button>
        <button 
          @click="$emit('close-rules-modal')"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          بستن
        </button>
      </div>
    </div>
  </div>

  <!-- Amenities Modal -->
  <div v-if="showAmenitiesModal" class="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">Amenities</h3>
        <button @click="$emit('close-amenities-modal')" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="space-y-2 max-h-96 overflow-y-auto">
        <label 
          v-for="amenity in amenities" 
          :key="amenity"
          class="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
        >
          <input 
            type="checkbox" 
            :value="amenity"
            v-model="localSelectedAmenities"
            class="rounded text-blue-600 focus:ring-blue-500"
          >
          <span>{{ amenity }}</span>
        </label>
      </div>
      <div class="mt-6 flex justify-end">
        <button 
          @click="applyAmenities"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
        >
          Apply
        </button>
        <button 
          @click="$emit('close-amenities-modal')"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  showRulesModal: Boolean,
  showAmenitiesModal: Boolean,
  selectedRules: {
    type: Array,
    default: () => []
  },
  selectedAmenities: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close-rules-modal', 'close-amenities-modal', 'update:selectedRules', 'update:selectedAmenities', 'apply-filters'])

const rules = [
  {
    key: 'ceremony',
    'persian-name': 'امکان برگزاری مراسم و مهمانی'
  },
  {
    key: 'pets',
    'persian-name': 'امکان ورود حیوانات خانگی'
  },
  {
    key: 'smoke',
    'persian-name': 'امکان استعمال دخانیات'
  },
  {
    key: '24h_reception',
    'persian-name': 'امکان پذیرش ۲۴ ساعته مهمان'
  },
  {
    key: 'single_persons',
    'persian-name': 'امکان پذیرش گروه‌های مجردی (فقط آقایان یا خانم‌ها)'
  }
]

const amenities = ['WiFi', 'Pool', 'Parking', 'Gym', 'Restaurant', 'Spa', 'Room Service']

const localSelectedRules = ref([...props.selectedRules])
const localSelectedAmenities = ref([...props.selectedAmenities])

watch(() => props.selectedRules, (newRules) => {
  localSelectedRules.value = [...newRules]
})

watch(() => props.selectedAmenities, (newAmenities) => {
  localSelectedAmenities.value = [...newAmenities]
})

const applyRules = () => {
  emit('update:selectedRules', localSelectedRules.value)
  emit('apply-filters', { selectedRules: localSelectedRules.value })
  emit('close-rules-modal')
}

const applyAmenities = () => {
  emit('update:selectedAmenities', localSelectedAmenities.value)
  emit('apply-filters', { selectedAmenities: localSelectedAmenities.value })
  emit('close-amenities-modal')
}

const applyFilters = () => {
  console.log('Applying filters in modal:', filters.value)
  
  // Emit all filters at once
  emit('apply-filters', {
    city: filters.value.city,
    type: filters.value.type,
    region: filters.value.region,
    minPrice: filters.value.minPrice,
    maxPrice: filters.value.maxPrice,
    passengerCount: filters.value.passengerCount,
    roomsCount: filters.value.roomsCount,
    checkinDate: filters.value.checkinDate,
    checkoutDate: filters.value.checkoutDate,
    selectedRules: filters.value.selectedRules,
    selectedAmenities: filters.value.selectedAmenities,
    sortBy: filters.value.sortBy
  })
  
  // Close the modal
  showModal.value = false
}
</script> 