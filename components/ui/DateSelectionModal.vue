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
            <div v-if="checkinDate" class="mt-1 text-xs text-gray-500">
              {{ gregorianToJalali(checkinDate) }}
            </div>
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
            <div v-if="checkoutDate" class="mt-1 text-xs text-gray-500">
              {{ gregorianToJalali(checkoutDate) }}
            </div>
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
import { useRoute, useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const route = useRoute()
const router = useRouter()
const { $persianTranslations } = useNuxtApp()

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

// Function to update URL parameters
const updateUrlParams = (checkin, checkout) => {
  const query = { ...route.query }
  if (checkin) {
    query.check_in = checkin
  } else {
    delete query.check_in
  }
  if (checkout) {
    query.check_out = checkout
  } else {
    delete query.check_out
  }
  router.push({ query })
}

// Function to close the modal
const closeModal = () => {
  emit('close')
}

// Function to confirm the selected dates
const confirmDates = () => {
  // Ensure dates are in the correct format (YYYY-MM-DD)
  const formattedCheckinDate = formatDateForEmission(checkinDate.value);
  const formattedCheckoutDate = formatDateForEmission(checkoutDate.value);
  
  // Update URL parameters
  updateUrlParams(formattedCheckinDate, formattedCheckoutDate);
  
  // Emit the date update event with the correct API format
  emit('update:dates', {
    check_in: formattedCheckinDate,
    check_out: formattedCheckoutDate
  });
  closeModal();
}

// Function to format date for emission
const formatDateForEmission = (dateString) => {
  if (!dateString) return '';
  
  // If the date is already in YYYY-MM-DD format, return it as is
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateString;
  }
  
  // If the date is in YYYY/MM/DD format, convert it to YYYY-MM-DD
  if (dateString.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
    return dateString.replace(/\//g, '-');
  }
  
  // If the date is in Jalali format (YYYY/MM/DD), convert it to Gregorian
  try {
    const [year, month, day] = dateString.split('/').map(Number);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      // Use the $persianTranslations.jalaliToGregorian function if available
      if ($persianTranslations && typeof $persianTranslations.jalaliToGregorian === 'function') {
        return $persianTranslations.jalaliToGregorian(year, month, day);
      }
      // Fallback to simple conversion
      return dateString.replace(/\//g, '-');
    }
  } catch (error) {
    console.error('Error formatting date:', error);
  }
  
  // If all else fails, return the original string
  return dateString;
}

// Function to convert Gregorian date to Jalali
const gregorianToJalali = (dateString) => {
  if (!dateString) return '';
  
  try {
    // Check if the date string is valid
    if (!dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
    
    // Convert Gregorian to Jalali for display
    const [year, month, day] = dateString.split('-').map(Number);
    
    // Validate the date components
    if (isNaN(year) || isNaN(month) || isNaN(day) || 
        month < 1 || month > 12 || day < 1 || day > 31) {
      return dateString;
    }
    
    // Use the $persianTranslations.gregorianToJalali function if available
    if ($persianTranslations && typeof $persianTranslations.gregorianToJalali === 'function') {
      const jalaliDate = $persianTranslations.gregorianToJalali(year, month, day);
      
      // Format with leading zeros for month and day
      const formattedMonth = jalaliDate.jm.toString().padStart(2, '0');
      const formattedDay = jalaliDate.jd.toString().padStart(2, '0');
      
      return `${jalaliDate.jy}/${formattedMonth}/${formattedDay}`;
    }
    
    return dateString;
  } catch (error) {
    console.error('Error converting date:', error);
    return dateString;
  }
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