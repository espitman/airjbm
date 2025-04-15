<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-8">
      <div class="text-red-600 mb-4">
        <svg class="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 8v4m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold mb-2">خطا!</h2>
      <p class="text-gray-600">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-bold">{{ accommodation?.item?.title }}</h1>
          <div class="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm">
            کد: {{ code }}
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">توضیحات</h2>
          <p class="text-gray-600">{{ accommodation?.description }}</p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
          <h2 class="text-xl font-semibold mb-4">اطلاعات اقامتگاه</h2>
          <div class="space-y-4">
            <div>
              <span class="text-gray-600">کد اقامتگاه:</span>
              <span class="font-semibold mr-2">{{ code }}</span>
            </div>
            <div v-if="accommodation?.price">
              <span class="text-gray-600">قیمت:</span>
              <span class="font-semibold mr-2">{{ formatPrice(accommodation.price) }}</span>
            </div>
            <div v-if="accommodation?.capacity">
              <span class="text-gray-600">ظرفیت:</span>
              <span class="font-semibold mr-2">{{ getCapacity }}</span>
            </div>
            <div v-if="accommodation?.location">
              <span class="text-gray-600">موقعیت:</span>
              <span class="font-semibold mr-2">{{ getLocationDisplay }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNuxtApp } from 'nuxt/app'
import type { AccommodationData } from '~/plugins/pdpApi'

const route = useRoute()
const nuxtApp = useNuxtApp()
const pdpApi = nuxtApp.$pdpApi as {
  fetchAccommodationByCode: (code: string) => Promise<AccommodationData>
}

const code = computed(() => route.params.code as string)
const accommodation = ref<AccommodationData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchAccommodationDetails = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await pdpApi.fetchAccommodationByCode(code.value)
    accommodation.value = data.result
    console.log(accommodation.value)
  } catch (err) {
    error.value = 'متاسفانه در دریافت اطلاعات اقامتگاه مشکلی پیش آمده است.'
    console.error('Error fetching accommodation details:', err)
  } finally {
    loading.value = false
  }
}

const formatPrice = (price: number) => {
  if (!price) return 'N/A'
  const tomanAmount = Math.round(price / 10)
  return tomanAmount.toLocaleString('fa-IR') + ' تومان'
}

const getCapacity = computed(() => {
  if (!accommodation.value?.capacity) return 'ظرفیت نامشخص'
  const base = accommodation.value.capacity.base || 0
  const extra = accommodation.value.capacity.extra || 0
  return `${base + extra} نفر`
})

const getLocationDisplay = computed(() => {
  if (!accommodation.value) return 'موقعیت نامشخص'
  
  // If we have both province and city, show both
  if (accommodation.value.province_fa && accommodation.value.city_fa) {
    return `${accommodation.value.province_fa}، ${accommodation.value.city_fa}`
  }
  
  // If we have just province
  if (accommodation.value.province_fa) {
    return accommodation.value.province_fa
  }
  
  // If we have just city
  if (accommodation.value.city_fa) {
    return accommodation.value.city_fa
  }
  
  // If we have location
  if (accommodation.value.location) {
    return accommodation.value.location
  }
  
  // Fallback
  return 'موقعیت نامشخص'
})

onMounted(() => {
  fetchAccommodationDetails()
})
</script> 