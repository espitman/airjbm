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
          مشاهده {{ amenities.length - displayedCount }} امکانات دیگر
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900">همه امکانات</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="loading" class="flex justify-center items-center py-12">
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
            <div v-for="(category, categoryIndex) in allAmenities" :key="categoryIndex" class="mb-8">
              <h4 class="text-xl font-bold text-gray-900 mb-4">{{ category.title.fa }}</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="flex items-start p-3 border border-gray-200 rounded-lg">
                  <div class="w-6 h-6 ml-3 mt-1 text-gray-600" :class="{ 'opacity-50': !item.state }">
                    <img :src="item.icon.url" :alt="item.title.fa" class="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div class="text-base font-medium" :class="{ 'opacity-50 line-through': !item.state }">{{ item.title.fa }}</div>
                    <ul v-if="item.items && item.items.length > 0" class="mt-1 text-sm text-gray-600">
                      <li v-for="(subItem, subIndex) in item.items" :key="subIndex" class="flex items-center">
                        <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {{ subItem }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useNuxtApp } from 'nuxt/app'
  import type { AmenityItem, AmenityCategory } from '../../types/amenities'

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

  const closeModal = () => {
    showModal.value = false
  }
  </script> 