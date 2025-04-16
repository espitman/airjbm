<template>
    <div class="max-w-4xl mx-auto p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
      <!-- Heading and subheading -->
      <h2 class="text-3xl font-bold text-gray-900">امکانات</h2>
      <p class="text-xl text-gray-500 mt-2">درباره امکانات و خدمات اقامتگاه</p>
      
      <!-- First divider -->
      <div class="w-32 h-px bg-gray-200 my-8"></div>
      
      <!-- Amenities grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-8">
        <div v-for="(amenity, index) in displayedAmenities" :key="index" class="flex items-center">
          <div class="w-6 h-6 ml-4 text-gray-600" :class="{ 'opacity-50': !amenity.state }">
            <img :src="amenity.icon.url" :alt="amenity.title.fa" class="w-full h-full object-contain" />
          </div>
          <span class="text-base text-gray-700" :class="{ 'opacity-50 line-through': !amenity.state }">{{ amenity.title.fa }}</span>
        </div>
      </div>
      
      <!-- Second divider -->
      <div class="w-full h-px bg-gray-200 my-8"></div>
      
      <!-- View more button -->
      <div class="flex justify-center">
        <button 
          @click="openModal"
          class="py-3 px-8 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
        >
          مشاهده {{ count }} امکانات دیگر
        </button>
      </div>
    </div>

    <!-- Modal -->
    <PdpAmenitiesModal
      v-model="showModal"
      :loading="loading"
      :error="error"
      :amenities="allAmenities"
    />
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useNuxtApp } from 'nuxt/app'
  import type { AmenityItem, AmenityCategory } from '../../types/amenities'
  import PdpAmenitiesModal from './PdpAmenitiesModal.vue'

  interface Amenity {
    icon: {
      url: string
    }
    state: boolean
    title: {
      en: string
      fa: string
    }
  }

  const props = defineProps<{
    amenities: Amenity[]
    count: number
  }>()

  const nuxtApp = useNuxtApp()
  const pdpApi = nuxtApp.$pdpApi as {
    getAllAmenities: (accommodationId: string) => Promise<any>
  }

  const displayedCount = ref(9)
  const showModal = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const allAmenities = ref<AmenityCategory[]>([])
  
  const displayedAmenities = computed(() => {
    return props.amenities.slice(0, displayedCount.value)
  })

  const openModal = async () => {
    showModal.value = true
    loading.value = true
    error.value = null
    
    try {
      // Using a hardcoded ID for now - in a real app, you would get this from props or route
      const response = await pdpApi.getAllAmenities('6744eafa5ef0d7001b8f2e84')
      allAmenities.value = response.result.amenities
    } catch (err) {
      console.error('Error fetching all amenities:', err)
      error.value = 'متاسفانه در دریافت اطلاعات امکانات مشکلی پیش آمده است.'
    } finally {
      loading.value = false
    }
  }
  </script> 