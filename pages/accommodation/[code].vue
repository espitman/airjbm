<template>
  <div class="container mx-auto px-4 py-0 md:py-8">
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

    <div v-else>
      <!-- Full width image gallery -->
      <ImageGallery 
        v-if="accommodation?.item?.placeImages?.length"
        :images="accommodation.item.placeImages"
        :title="accommodation.item.title"
      />
      
      <!-- Two column layout for content below gallery -->
      <div class="flex flex-col lg:flex-row gap-8 mt-8">
        <!-- Right Column (75%) - Now on the right in RTL -->
        <div class="lg:w-3/4">
          <PdpHeader 
            v-if="accommodation?.item"
            :title="accommodation.item.title"
            :city="accommodation.item.placeOfResidence?.area?.city?.name?.fa || ''"
            :province="accommodation.item.placeOfResidence?.area?.city?.province?.name?.fa || ''"
            :rating="accommodation.item.rateAndReview?.score || 0"
            :reviews="accommodation.item.rateAndReview?.count || 0"
            :hostName="(accommodation.meta?.hostInfo?.fistName || '') + ' ' + (accommodation.meta?.hostInfo?.lastName || '') || 'میزبان'"
            :hostImage="accommodation.meta?.hostInfo?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'"
            :capacity="{
              base: accommodation.item.capacity?.guests?.base || 0,
              extra: accommodation.item.capacity?.guests?.extra || 0
            }"
            :beds="{
              double: accommodation.item.capacity?.beds?.double || 0,
              mattress: accommodation.item.capacity?.beds?.mattress || 0,
              single: accommodation.item.capacity?.beds?.single || 0,
              twin: accommodation.item.capacity?.beds?.twin || 0
            }"
            :baths="accommodation.item.accommodationMetrics?.bathroomsCount || 0"
            :bedrooms="accommodation.item.accommodationMetrics?.bedroomsCount || 0"
            :propertyType="accommodation.item.typeDetails?.title_fa || 'اقامتگاه'"
          />
          
          <!-- Description component -->
          <div class="mt-8" v-if="accommodation?.item?.description">
            <PdpDescription 
              :description="accommodation.item.description"
            />
          </div>
          
          <!-- Amenities component -->
          <div class="mt-8">
            <PdpAmenities />
          </div>
        </div>

        <!-- Left Column (25%) - Now on the left in RTL -->
        <div class="lg:w-1/4">
          <!-- Content for left column will go here -->
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
import ImageGallery from '~/components/pdp/ImageGallery.vue'
import PdpHeader from '~/components/pdp/PdpHeader.vue'
import PdpDescription from '~/components/pdp/PdpDescription.vue'
import PdpAmenities from '~/components/pdp/PdpAmenities.vue'

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