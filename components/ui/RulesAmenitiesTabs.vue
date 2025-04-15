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
            <label :for="rule.key" class="mr-2 text-sm text-gray-700">{{ rule['persian-name'] }}</label>
          </div>
        </div>

        <!-- Amenities Tab -->
        <div v-if="activeTab === 'amenities'" class="space-y-4">
          <!-- امکانات اولیه -->
          <div class="border rounded-lg overflow-hidden">
            <button 
              @click="toggleAccordion('basic')"
              class="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span class="font-medium">امکانات اولیه</span>
              <i :class="['fas', accordionStates.basic ? 'fa-chevron-up' : 'fa-chevron-down', 'transition-transform duration-300']"></i>
            </button>
            <div 
              :class="['accordion-content', { 'open': accordionStates.basic }]"
            >
              <div class="p-4 space-y-2">
                <div v-for="amenity in basicAmenities" :key="amenity.key" class="flex items-center">
                  <input 
                    type="checkbox" 
                    :id="amenity.key"
                    v-model="localSelectedAmenities"
                    :value="amenity.key"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label :for="amenity.key" class="mr-2 text-sm text-gray-700">{{ amenity['persian-name'] }}</label>
                </div>
              </div>
            </div>
          </div>

          <!-- امکانات خاص -->
          <div class="border rounded-lg overflow-hidden">
            <button 
              @click="toggleAccordion('special')"
              class="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span class="font-medium">امکانات خاص</span>
              <i :class="['fas', accordionStates.special ? 'fa-chevron-up' : 'fa-chevron-down', 'transition-transform duration-300']"></i>
            </button>
            <div 
              :class="['accordion-content', { 'open': accordionStates.special }]"
            >
              <div class="p-4 space-y-2">
                <div v-for="amenity in specialAmenities" :key="amenity.key" class="flex items-center">
                  <input 
                    type="checkbox" 
                    :id="amenity.key"
                    v-model="localSelectedAmenities"
                    :value="amenity.key"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label :for="amenity.key" class="mr-2 text-sm text-gray-700">{{ amenity['persian-name'] }}</label>
                </div>
              </div>
            </div>
          </div>

          <!-- مجهز به -->
          <div class="border rounded-lg overflow-hidden">
            <button 
              @click="toggleAccordion('equipped')"
              class="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span class="font-medium">مجهز به</span>
              <i :class="['fas', accordionStates.equipped ? 'fa-chevron-up' : 'fa-chevron-down', 'transition-transform duration-300']"></i>
            </button>
            <div 
              :class="['accordion-content', { 'open': accordionStates.equipped }]"
            >
              <div class="p-4 space-y-2">
                <div v-for="amenity in equippedAmenities" :key="amenity.key" class="flex items-center">
                  <input 
                    type="checkbox" 
                    :id="amenity.key"
                    v-model="localSelectedAmenities"
                    :value="amenity.key"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label :for="amenity.key" class="mr-2 text-sm text-gray-700">{{ amenity['persian-name'] }}</label>
                </div>
              </div>
            </div>
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
const accordionStates = ref({
  special: false,
  equipped: false,
  basic: true
})

const toggleAccordion = (section) => {
  // If the clicked section is already open, just close it
  if (accordionStates.value[section]) {
    accordionStates.value[section] = false
    return
  }
  
  // Close all sections first
  Object.keys(accordionStates.value).forEach(key => {
    accordionStates.value[key] = false
  })
  
  // Then open the clicked section
  accordionStates.value[section] = true
}

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

const specialAmenities = [
  {
    key: 'barbeque',
    'persian-name': 'باربیکیو',
  },
  {
    key: 'internet-wifi',
    'persian-name': 'اينترنت (Wifi)',
  },
  {
    key: 'swimming-pool',
    'persian-name': 'استخر',
  },
  {
    key: 'billiard',
    'persian-name': 'میز بیلیارد',
  },
  {
    key: 'jacuzzi',
    'persian-name': 'جکوزی',
  },
  {
    key: 'sauna',
    'persian-name': 'سونا',
  },
  {
    key: 'ventilation-system',
    'persian-name': 'سیستم تهویه هوا',
  }
]

const equippedAmenities = [
  {
    key: 'air-conditioning-system',
    'persian-name': 'سیستم سرمایشی',
  },
  {
    key: 'tv',
    'persian-name': 'تلویزیون',
  },
  {
    key: 'refrigerator',
    'persian-name': 'یخچال',
  },
  {
    key: 'heating-system',
    'persian-name': 'سیستم گرمایشی',
  },
  {
    key: 'sofa',
    'persian-name': 'مبلمان',
  },
  {
    key: 'food-serving-equipment',
    'persian-name': 'لوازم سرو غذا',
  }
]

const basicAmenities = [
  {
    key: 'bathroom',
    'persian-name': 'حمام',
  },
  {
    key: 'balcony',
    'persian-name': 'بالکن',
  },
  {
    key: 'wc',
    'persian-name': 'سرویس بهداشتی فرنگی',
  },
  {
    key: 'pwc',
    'persian-name': 'سرویس بهداشتی ایرانی',
  },
  {
    key: 'greenery',
    'persian-name': 'فضای سبز',
  },
  {
    key: 'parking',
    'persian-name': 'پارکینگ',
  },
  {
    key: 'elevator',
    'persian-name': 'آسانسور',
  },
  {
    key: 'water',
    'persian-name': 'آب',
  },
  {
    key: 'electric',
    'persian-name': 'برق',
  },
  {
    key: 'gas',
    'persian-name': 'گاز',
  }
]

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
  // Update the local state
  emit('update:selectedRules', localSelectedRules.value)
  emit('update:selectedAmenities', localSelectedAmenities.value)
  
  // Close the modal
  emit('close')
}
</script>

<style scoped>
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion-content.open {
  max-height: 500px;
  transition: max-height 0.3s ease-in;
}
</style> 