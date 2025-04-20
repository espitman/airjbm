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
        v-if="accommodation?.result?.item?.placeImages?.length"
        :images="accommodation.result.item.placeImages"
        :title="accommodation.result.item.title"
      />
      
      <!-- Two column layout for content below gallery -->
      <div class="flex flex-col lg:flex-row gap-4 mt-8">
        <!-- Right Column (8/12) - Now on the right in RTL -->
        <div class="lg:w-8/12">
          <PdpHeader 
            v-if="accommodation?.result?.item"
            :title="accommodation.result.item.title"
            :city="accommodation.result.item.placeOfResidence?.area?.city?.name?.fa || ''"
            :province="accommodation.result.item.placeOfResidence?.area?.city?.province?.name?.fa || ''"
            :rating="accommodation.result.item.rateAndReview?.score || 0"
            :reviews="accommodation.result.item.rateAndReview?.count || 0"
            :hostName="(accommodation.result.meta?.hostInfo?.fistName || '') + ' ' + (accommodation.result.meta?.hostInfo?.lastName || '') || 'میزبان'"
            :hostImage="accommodation.result.meta?.hostInfo?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'"
            :capacity="{
              base: accommodation.result.item.capacity?.guests?.base || 0,
              extra: accommodation.result.item.capacity?.guests?.extra || 0
            }"
            :beds="{
              double: accommodation.result.item.capacity?.beds?.double || 0,
              mattress: accommodation.result.item.capacity?.beds?.mattress || 0,
              single: accommodation.result.item.capacity?.beds?.single || 0,
              twin: accommodation.result.item.capacity?.beds?.twin || 0
            }"
            :baths="accommodation.result.item.accommodationMetrics?.bathroomsCount || 0"
            :bedrooms="accommodation.result.item.accommodationMetrics?.bedroomsCount || 0"
            :propertyType="accommodation.result.item.typeDetails?.title_fa || 'اقامتگاه'"
          />
          
          <!-- Description component -->
          <div class="mt-8" v-if="accommodation?.result?.item?.description">
            <PdpDescription 
              :description="accommodation.result.item.description"
            />
          </div>
          
          <!-- Amenities component -->
          <div class="mt-8">
            <PdpAmenities 
              :amenities="accommodation?.result?.item?.amenitiesV2 || []" 
              :count="accommodation?.result?.item?.selectedAmenitiesCount || 0"
            />
          </div>

          <!-- Badges component -->
          <div class="mt-8">
            <PdpBadges 
              :badges="accommodation?.result?.item?.badges || { main: [], secondary: [] }"
            />
          </div>

          <!-- Distance component -->
          <div class="mt-8">
            <PdpDistance 
              :nearbyCenters="accommodation?.result?.item?.nearbyCentersV2 || []"
            />
          </div>

          <!-- Rules component -->
          <div class="mt-8">
            <PdpRules 
              :restrictedRules="accommodation?.result?.item?.restrictedRules || []"
              :negativeRestrictedRules="accommodation?.result?.item?.negativeRestrictedRules || []"
              :checkIn="accommodation?.result?.item?.checkIn || '08:00'"
              :checkOut="accommodation?.result?.item?.checkOut || '14:00'"
              :cancellationPolicyText="accommodation?.result?.item?.cancellationPolicyText"
              :accommodation-id="accommodation?.result?.item?.id"
            />
          </div>
          
          <!-- Map component -->
          <div class="mt-8">
            <PdpMap
              v-if="accommodation?.result?.item?.placeOfResidence?.location"
              :latitude="accommodation.result.item.placeOfResidence.location.lat"
              :longitude="accommodation.result.item.placeOfResidence.location.lng"
              :title="accommodation.result.item.title"
              :address="getLocationDisplay"
              :radius="500"
            />
          </div>
        </div>

        <!-- Left Column (4/12) - Now on the left in RTL -->
        <div class="lg:w-4/12">
          <div class="sticky top-24 z-[40]">
            <PdpBookingForm 
              :calendar="accommodation?.result?.item?.calendar"
              :accommodation-id="accommodation?.result?.item?.id || ''"
              :max-capacity="(accommodation?.result?.item?.capacity?.guests?.base || 0) + (accommodation?.result?.item?.capacity?.guests?.extra || 0)"
            />
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
import type { AccommodationData } from '../../types/accommodation'
import ImageGallery from '../../components/pdp/ImageGallery.vue'
import PdpHeader from '../../components/pdp/PdpHeader.vue'
import PdpDescription from '../../components/pdp/PdpDescription.vue'
import PdpAmenities from '../../components/pdp/PdpAmenities.vue'
import PdpBookingForm from '../../components/pdp/PdpBookingForm.vue'
import PdpBadges from '../../components/pdp/PdpBadges.vue'
import PdpDistance from '../../components/pdp/PdpDistance.vue'
import PdpRules from '../../components/pdp/PdpRules.vue'
import PdpMap from '../../components/pdp/PdpMap.vue'

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
    accommodation.value = data
  } catch (err) {
    error.value = 'متاسفانه در دریافت اطلاعات اقامتگاه مشکلی پیش آمده است.'
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
  if (!accommodation.value?.result?.item?.capacity?.guests) return 'ظرفیت نامشخص'
  const base = accommodation.value.result.item.capacity.guests.base || 0
  const extra = accommodation.value.result.item.capacity.guests.extra || 0
  return `${base + extra} نفر`
})

const getLocationDisplay = computed(() => {
  if (!accommodation.value) return 'موقعیت نامشخص'
  
  const province = accommodation.value.result.item.placeOfResidence?.area?.city?.province?.name?.fa
  const city = accommodation.value.result.item.placeOfResidence?.area?.city?.name?.fa
  
  if (province && city) {
    return `${province}، ${city}`
  }
  
  if (province) {
    return province
  }
  
  if (city) {
    return city
  }
  
  const location = accommodation.value.result.item.placeOfResidence?.location
  if (location) {
    return `${location.lat}, ${location.lng}`
  }
  
  return 'موقعیت نامشخص'
})

onMounted(() => {
  fetchAccommodationDetails()
})
</script> 