<template>
  <div>
    <!-- Mobile Carousel -->
    <div class="md:hidden relative w-full h-64">
      <Swiper
        :modules="[Pagination, Navigation]"
        :pagination="{ clickable: true }"
        :navigation="true"
        class="w-full h-full"
      >
        <SwiperSlide v-for="(image, idx) in images" :key="image.url">
          <img
            :src="image.url"
            :alt="`${title} - تصویر ${idx + 1}`"
            class="w-full h-full object-cover rounded-2xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Desktop Grid (unchanged) -->
    <div
      class="hidden md:grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden w-full h-[500px]"
    >
      <!-- Main Image -->
      <div
        class="relative col-span-2 row-span-2 w-full h-full"
      >
        <img
          :src="images[0]?.url"
          :alt="title"
          class="w-full h-full object-cover"
        />
      </div>
      <!-- 2x2 grid for next 4 images -->
      <template v-for="(image, idx) in images.slice(1, 5)" :key="idx">
        <div class="relative w-full h-full">
          <img
            :src="image.url"
            :alt="`${title} - تصویر ${idx + 2}`"
            class="w-full h-full object-cover"
          />
          <!-- Overlay on the last image -->
          <button
            v-if="idx === 3 && images.length > 5"
            class="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold"
            @click="$emit('show-all')"
          >
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553 2.276A2 2 0 0121 14.118V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.882a2 2 0 01.447-1.842L8 10m7-5a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Show all photos
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
</script>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  transform: scale(1.25);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(0, 0, 0, 0.5);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 16px;
}

@media (min-width: 768px) {
  .grid-cols-4 > div:first-child {
    grid-row: span 2 / span 2;
    grid-column: span 2 / span 2;
    height: 100%;
  }
  .grid-cols-4 > div {
    min-height: 0;
  }
}
</style> 