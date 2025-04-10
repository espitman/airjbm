<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform -translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-2 opacity-0"
  >
    <div v-if="isOpen" class="py-4">
      <form @submit.prevent="handleSearch" class="flex flex-wrap gap-4">
        <!-- City Selection -->
        <div class="w-[40%]">
          <label for="city" class="block text-sm font-medium text-gray-700 mb-1 font-vazir">شهر</label>
          <select 
            id="city"
            v-model="searchParams.city" 
            class="w-full px-4 py-2 border rounded-lg pl-6 font-vazir"
          >
            <option value="" class="font-vazir">همه شهرها</option>
            <option value="New York" class="font-vazir">نیویورک</option>
            <option value="Los Angeles" class="font-vazir">لس آنجلس</option>
            <option value="Chicago" class="font-vazir">شیکاگو</option>
            <option value="Houston" class="font-vazir">هیوستون</option>
            <option value="Miami" class="font-vazir">میامی</option>
          </select>
        </div>

        <!-- Other Fields -->
        <div class="flex flex-1 gap-4 items-end">
          <!-- Guests -->
          <div class="w-24">
            <label for="guests" class="block text-sm font-medium text-gray-700 mb-1 font-vazir">مسافر</label>
            <input 
              id="guests"
              type="number" 
              min="0" 
              v-model="searchParams.passengerCount"
              class="w-full px-4 py-2 border rounded-lg font-vazir"
              placeholder="تعداد مسافران"
            >
          </div>

          <!-- Check-in -->
          <div class="flex-1">
            <label for="checkIn" class="block text-sm font-medium text-gray-700 mb-1 font-vazir">ورود</label>
            <input 
              id="checkIn"
              type="date" 
              v-model="searchParams.checkinDate"
              class="w-full px-4 py-2 border rounded-lg font-vazir"
              placeholder="انتخاب تاریخ ورود"
            >
          </div>

          <!-- Check-out -->
          <div class="flex-1">
            <label for="checkOut" class="block text-sm font-medium text-gray-700 mb-1 font-vazir">خروج</label>
            <input 
              id="checkOut"
              type="date" 
              v-model="searchParams.checkoutDate"
              class="w-full px-4 py-2 border rounded-lg font-vazir"
              placeholder="انتخاب تاریخ خروج"
            >
          </div>

          <!-- Search Button -->
          <button 
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-[42px] font-vazir"
          >
            جستجو
          </button>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const router = useRouter()
const searchParams = reactive({
  city: '',
  passengerCount: 0,
  checkinDate: '',
  checkoutDate: ''
})

const handleSearch = () => {
  // Create a clean query object
  const query = {}
  
  // Only add non-empty values to the query
  if (searchParams.city) query.city = searchParams.city
  if (searchParams.passengerCount > 0) query.passengerCount = searchParams.passengerCount
  if (searchParams.checkinDate) query.checkinDate = searchParams.checkinDate
  if (searchParams.checkoutDate) query.checkoutDate = searchParams.checkoutDate

  // Navigate to listings page with search parameters
  router.push({
    path: '/listings',
    query
  })
}
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-[42px];
}
</style> 