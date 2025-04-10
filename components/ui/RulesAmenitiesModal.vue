<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative z-[101]">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b">
        <h3 class="text-xl font-semibold">فیلترها</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Tabs -->
      <div class="border-b">
        <div class="flex">
          <button 
            @click="activeTab = 'rules'"
            :class="[
              'flex-1 py-3 px-4 text-sm font-medium',
              activeTab === 'rules' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            قوانین
          </button>
          <button 
            @click="activeTab = 'amenities'"
            :class="[
              'flex-1 py-3 px-4 text-sm font-medium',
              activeTab === 'amenities' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            امکانات
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <!-- Rules Tab -->
        <div v-if="activeTab === 'rules'" class="space-y-2">
          <div v-for="rule in rules" :key="rule" class="flex items-center">
            <input 
              type="checkbox" 
              :id="rule"
              v-model="localFilters.selectedRules"
              :value="rule"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label :for="rule" class="ml-2 text-sm text-gray-700">{{ rule }}</label>
          </div>
        </div>

        <!-- Amenities Tab -->
        <div v-if="activeTab === 'amenities'" class="space-y-2">
          <div v-for="amenity in amenities" :key="amenity" class="flex items-center">
            <input 
              type="checkbox" 
              :id="amenity"
              v-model="localFilters.selectedAmenities"
              :value="amenity"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label :for="amenity" class="ml-2 text-sm text-gray-700">{{ amenity }}</label>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t p-4 flex justify-end space-x-2">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          انصراف
        </button>
        <button 
          @click="applyFilters"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          تایید
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update:filters'])

const activeTab = ref('rules')
const rules = ['بدون سیگار', 'بدون حیوانات خانگی', 'بدون مهمانی', 'بدون کودکان', 'ساعات سکوت']
const amenities = ['وای‌فای', 'استخر', 'پارکینگ', 'باشگاه', 'رستوران', 'اسپا', 'سرویس اتاق']

// Create a local copy of filters
const localFilters = ref({
  selectedRules: [],
  selectedAmenities: []
})

// Initialize local filters from props
watch(() => props.filters, (newFilters) => {
  localFilters.value = {
    selectedRules: [...(newFilters.selectedRules || [])],
    selectedAmenities: [...(newFilters.selectedAmenities || [])]
  }
}, { immediate: true, deep: true })

const applyFilters = () => {
  emit('update:filters', {
    ...props.filters,
    selectedRules: localFilters.value.selectedRules,
    selectedAmenities: localFilters.value.selectedAmenities
  })
  emit('close')
}
</script> 