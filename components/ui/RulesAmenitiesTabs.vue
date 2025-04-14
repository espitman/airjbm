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
          <div v-for="rule in rules" :key="rule.key" class="flex items-center">
            <input 
              type="checkbox" 
              :id="rule.key"
              v-model="localSelectedRules"
              :value="rule.key"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label :for="rule.key" class="ml-2 text-sm text-gray-700">{{ rule['persian-name'] }}</label>
          </div>
        </div>

        <!-- Amenities Tab -->
        <div v-if="activeTab === 'amenities'" class="space-y-2">
          <div v-for="amenity in amenities" :key="amenity" class="flex items-center">
            <input 
              type="checkbox" 
              :id="amenity"
              v-model="localSelectedAmenities"
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
  selectedRules: {
    type: Array,
    default: () => []
  },
  selectedAmenities: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'update:selectedRules', 'update:selectedAmenities'])

const activeTab = ref('rules')

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

const amenities = ['وای‌فای', 'استخر', 'پارکینگ', 'باشگاه', 'رستوران', 'اسپا', 'سرویس اتاق']

const localSelectedRules = ref([...props.selectedRules])
const localSelectedAmenities = ref([...props.selectedAmenities])

// Watch for changes in props
watch(() => props.selectedRules, (newRules) => {
  localSelectedRules.value = [...newRules]
})

watch(() => props.selectedAmenities, (newAmenities) => {
  localSelectedAmenities.value = [...newAmenities]
})

const applyFilters = () => {
  emit('update:selectedRules', localSelectedRules.value)
  emit('update:selectedAmenities', localSelectedAmenities.value)
  emit('close')
}
</script> 