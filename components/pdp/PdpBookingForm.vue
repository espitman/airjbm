<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <!-- Price box -->
    <div class="flex items-end justify-between mb-8">
      <div class="flex items-center">
        <span class="text-sm font-medium text-gray-600">شروع قیمت از</span>
      </div>
      <div class="flex items-end flex-col">
        <div class="flex items-center gap-2 mb-1">
          <span v-if="minPrice.originalPrice" class="text-base text-gray-400 line-through">{{ formatPrice(minPrice.originalPrice) }}</span>
          <span v-if="minPrice.discountPercent > 0" class="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">%{{ minPrice.discountPercent }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-gray-900">{{ formatPrice(minPrice.price) }}</span>
          <span class="text-sm text-gray-500">تومان / شب</span>
        </div>
      </div>
    </div>

    <!-- Date picker -->
    <div class="mb-8">
      <label class="block text-sm font-medium text-gray-700 mb-2">تاریخ</label>
      <div class="relative">
        <input 
          type="text" 
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="تاریخ را انتخاب کنید"
          @click="showCalendar = true"
          :value="selectedDates"
          readonly
        />
        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Calendar Modal -->
    <div v-if="showCalendar" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="relative">
        <PdpCalendar 
          :initial-check-in="checkInDate || undefined"
          :initial-check-out="checkOutDate || undefined"
          :calendar="calendar"
          @close="showCalendar = false" 
          @dates-selected="handleDatesSelected" 
        />
      </div>
    </div>

    <!-- Passenger counter -->
    <div class="mb-8">
      <!-- Adults -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base font-medium text-gray-900">تعداد مسافران</h3>
          <p class="text-sm text-gray-500">بالای ۲ سال</p>
        </div>
        <div class="flex items-center space-x-4 space-x-reverse">
          <button 
            @click="decreaseAdults" 
            class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <span class="w-8 text-center">{{ adults }}</span>
          <button 
            @click="increaseAdults" 
            class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="space-y-4">
      <button class="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
        رزرو
      </button>
      <p class="text-sm text-gray-500 text-center">ارسال درخواست رزرو برای شما هزینه‌ای ندارد!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PdpCalendar from './PdpCalendar.vue'


const props = defineProps<{
  calendar?: {
    date: string;
    price: number;
    status: string;
    discount?: number;
    jabamaDiscount?: number;
  }[];
}>()

onMounted(() => {
    console.log(props)
})

const adults = ref(1)
const showCalendar = ref(false)
const checkInDate = ref<Date | null>(null)
const checkOutDate = ref<Date | null>(null)

// Calculate minimum price for first 14 available days
const minPrice = computed(() => {
  console.log('Calendar data:', props.calendar);
  if (!props.calendar?.length) {
    console.log('No calendar data, using default price');
    return {
      price: 2500000,
      originalPrice: null,
      discountPercent: 0
    };
  }
  
  // Filter available days and take first 14
  const first14Days = props.calendar
    .filter(date => date.status === 'available')
    .slice(0, 14);
  console.log('First 14 available days:', first14Days);
  
  // If we don't have 14 days, return default price
  if (first14Days.length < 14) {
    console.log('Less than 14 days available, using default price');
    return {
      price: 2500000,
      originalPrice: null,
      discountPercent: 0
    };
  }
  
  // Find day with minimum price
  const minPriceDay = first14Days.reduce((min, day) => day.price < min.price ? day : min);
  
  // Calculate total discount percentage
  const totalDiscountPercent = (minPriceDay.discount || 0) + (minPriceDay.jabamaDiscount || 0);
  
  // Convert from Rial to Toman
  const price = minPriceDay.price / 10;
  const originalPrice = totalDiscountPercent > 0 ? (minPriceDay.price / (1 - totalDiscountPercent / 100)) / 10 : null;
  
  console.log('Calculated min price (Toman):', price, 'Original:', originalPrice);
  return { price, originalPrice, discountPercent: totalDiscountPercent };
});

// Format price with thousands separator
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const selectedDates = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return ''
  return `${formatDate(checkInDate.value)} - ${formatDate(checkOutDate.value)}`
})

const increaseAdults = () => {
  adults.value++
  showPricePreview()
}

const decreaseAdults = () => {
  if (adults.value > 1) {
    adults.value--
    showPricePreview()
  }
}

const showPricePreview = () => {
  const dates = checkInDate.value && checkOutDate.value 
    ? `${formatDate(checkInDate.value)} تا ${formatDate(checkOutDate.value)}`
    : 'تاریخ انتخاب نشده'
  
  alert(`تاریخ: ${dates}\nتعداد مسافر: ${adults.value} نفر`)
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('fa-IR')
}

const handleDatesSelected = (dates: { checkIn: Date; checkOut: Date }) => {
  checkInDate.value = dates.checkIn
  checkOutDate.value = dates.checkOut
  showCalendar.value = false
  showPricePreview()
}
</script> 