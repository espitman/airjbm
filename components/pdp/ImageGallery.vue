<template>
  <div>
    <!-- Lightbox -->
    <div v-if="showLightbox" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" @click="closeLightbox">
      <div class="relative max-w-4xl max-h-[90vh] w-full h-full flex flex-col">
        <!-- Close button -->
        <button class="absolute top-4 right-4 text-white z-10" @click.stop="closeLightbox">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Main image -->
        <div class="flex-1 flex items-center justify-center">
          <img 
            :src="currentImage?.url" 
            :alt="currentImage?.caption || title" 
            class="max-h-full max-w-full object-contain"
          />
        </div>
        
        <!-- Navigation -->
        <div class="absolute inset-y-0 left-0 flex items-center">
          <button 
            v-if="currentIndex > 0" 
            class="bg-black bg-opacity-50 text-white p-2 rounded-r-lg" 
            @click.stop="prevImage"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div class="absolute inset-y-0 right-0 flex items-center">
          <button 
            v-if="currentIndex < images.length - 1" 
            class="bg-black bg-opacity-50 text-white p-2 rounded-l-lg" 
            @click.stop="nextImage"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <!-- Thumbnails -->
        <div class="h-20 bg-black bg-opacity-50 flex items-center justify-center gap-2 p-2 overflow-x-auto">
          <div 
            v-for="(image, idx) in images" 
            :key="image.url"
            class="h-16 w-16 flex-shrink-0 cursor-pointer border-2"
            :class="currentIndex === idx ? 'border-white' : 'border-transparent'"
            @click.stop="goToImage(idx)"
          >
            <img :src="image.url" :alt="image.caption || `${title} - تصویر ${idx + 1}`" class="h-full w-full object-cover" />
          </div>
        </div>
        
        <!-- Image counter -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-1 rounded-lg">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>

    <!-- Mobile Carousel -->
    <div class="md:hidden">
      <div class="relative w-screen h-64 -mx-4">
        <Swiper
          :modules="[Pagination, Navigation]"
          :pagination="false"
          :navigation="false"
          class="w-full h-full overflow-hidden"
          @swiper="onSwiper"
        >
          <SwiperSlide v-for="(image, idx) in images" :key="image.url" class="overflow-hidden">
            <div class="w-full h-full cursor-pointer relative overflow-hidden group" @click="openLightbox(idx)">
              <img
                :src="image.url"
                :alt="`${title} - تصویر ${idx + 1}`"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </SwiperSlide>
        </Swiper>
        <!-- Photo Counter (outside slides) -->
        <div class="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-lg text-sm z-10">
          {{ currentSlide + 1 }}/{{ images.length }}
        </div>
      </div>
    </div>

    <!-- Desktop Grid -->
    <div
      class="hidden md:grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden w-full h-[500px]"
    >
      <!-- Main Image -->
      <div
        class="relative col-span-2 row-span-2 w-full h-full cursor-pointer overflow-hidden group"
        @click="openLightbox(0)"
      >
        <img
          :src="images[0]?.url"
          :alt="title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
      <!-- 2x2 grid for next 4 images -->
      <template v-for="(image, idx) in images.slice(1, 5)" :key="idx">
        <div class="relative w-full h-full cursor-pointer overflow-hidden group" @click="openLightbox(idx + 1)">
          <img
            :src="image.url"
            :alt="`${title} - تصویر ${idx + 2}`"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          <!-- Show All Images button on the last image -->
          <div v-if="idx === 3 && images.length > 5" class="absolute bottom-3 left-3 z-20">
            <button 
              class="bg-white text-gray-900 px-3 py-1 rounded-lg text-sm font-medium shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
              @click.stop="openLightbox(0)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              نمایش همه تصاویر
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import { ref, computed } from 'vue'

interface PlaceImage {
  caption: string
  type: string
  uploadId: string
  url: string
}

const props = defineProps<{
  images: PlaceImage[]
  title: string
}>()

const currentSlide = ref(0)
const showLightbox = ref(false)
const currentIndex = ref(0)

const currentImage = computed(() => {
  return props.images[currentIndex.value]
})

const onSwiper = (swiper: any) => {
  swiper.on('slideChange', () => {
    currentSlide.value = swiper.activeIndex
  })
}

const openLightbox = (index: number) => {
  currentIndex.value = index
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToImage = (index: number) => {
  currentIndex.value = index
}
</script>

<style scoped>
/* Removed all custom CSS in favor of Tailwind classes */
</style> 