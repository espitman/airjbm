<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative z-[101]">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-xl font-semibold">انتخاب تاریخ</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <!-- Date Pickers -->
        <div class="p-4 space-y-4">
          <!-- Check-in Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">تاریخ ورود</label>
            <ClientOnly>
              <DatePicker
                v-model="checkinDate"
                :format="datePickerConfig.format"
                :display-format="datePickerConfig.displayFormat"
                :editable="datePickerConfig.editable"
                :auto-close="datePickerConfig.autoClose"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <template #fallback>
                <input 
                  type="date" 
                  v-model="checkinDate" 
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
              </template>
            </ClientOnly>
          </div>
          
          <!-- Check-out Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">تاریخ خروج</label>
            <ClientOnly>
              <DatePicker
                v-model="checkoutDate"
                :format="datePickerConfig.format"
                :display-format="datePickerConfig.displayFormat"
                :editable="datePickerConfig.editable"
                :auto-close="datePickerConfig.autoClose"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <template #fallback>
                <input 
                  type="date" 
                  v-model="checkoutDate" 
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
              </template>
            </ClientOnly>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="p-4 border-t flex justify-end space-x-3 rtl:space-x-reverse">
          <button 
            @click="closeModal" 
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            انصراف
          </button>
          <button 
            @click="confirmDates" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import DatePicker from 'vue3-persian-datetime-picker'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  initialCheckinDate: {
    type: String,
    default: ''
  },
  initialCheckoutDate: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'update:dates'])

// Date picker configuration
const datePickerConfig = {
  format: 'YYYY-MM-DD',
  displayFormat: 'YYYY/MM/DD',
  editable: true,
  autoClose: true
}

// Local date values
const checkinDate = ref(props.initialCheckinDate)
const checkoutDate = ref(props.initialCheckoutDate)

// Watch for changes in props
watch(() => props.initialCheckinDate, (newValue) => {
  checkinDate.value = newValue
})

watch(() => props.initialCheckoutDate, (newValue) => {
  checkoutDate.value = newValue
})

// Function to close the modal
const closeModal = () => {
  emit('close')
}

// Function to confirm the selected dates
const confirmDates = () => {
  emit('update:dates', {
    checkinDate: checkinDate.value,
    checkoutDate: checkoutDate.value
  })
  closeModal()
}
</script>

<style>
/* Custom styles for the Jalali date picker */
.vpd-wrapper {
  z-index: 102;
}

.vpd-controls {
  z-index: 102;
}

.vpd-actions {
  z-index: 102;
}

.vpd-popup {
  z-index: 102 !important;
}
</style> 