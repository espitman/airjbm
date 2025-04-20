<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <div class="flex flex-col space-y-4">
      <!-- Top row with tag and action buttons -->
      <div class="hidden md:flex justify-between items-center">
        <div>
          <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {{ propertyType }}
          </span>
        </div>
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span class="text-lg">اشتراک‌گذاری</span>
          </button>
          <button 
            class="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            @click="toggleSave"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              :class="{ 'text-red-500': isSaved }"
              :fill="isSaved ? 'currentColor' : 'none'" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="text-lg">ذخیره</span>
          </button>
        </div>
      </div>

      <!-- Property title -->
      <h1 class="text-xl md:text-3xl font-bold text-gray-900 max-w-full md:max-w-3xl">
        {{ title }}
      </h1>

      <!-- Host information box with 2 columns -->
      <div class="flex items-center pt-4 rounded-lg p-4 mt-4">
        <!-- Right column: Host's photo -->
        <div class="relative ml-4">
          <img 
            :src="hostImage" 
            :alt="hostName" 
            class="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
          <span class="absolute bottom-0 right-0 bg-teal-500 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        
        <!-- Left column: Host's name and rating/location -->
        <div class="flex flex-col">
          <!-- Top left: Host's name -->
          <div class="mb-2">
            <span class="text-gray-500 text-base">میزبان:</span>
            <span class="text-gray-900 text-lg font-medium mr-2">{{ hostName }}</span>
          </div>
          
          <!-- Bottom left: Rating and location -->
          <div class="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="font-semibold mr-1">{{ rating }}</span>
              <span class="text-gray-500 mr-1">({{ reviews }})</span>
            </div>
            <span class="text-gray-500 mx-1 md:mx-2">•</span>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="mr-1">{{ province }}{{ city ? `، ${city}` : '' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Property details -->
      <div class="flex flex-col gap-6 pt-4 border-t border-gray-200 mt-4">
        <!-- First row: Bed details in single row -->
        <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-sm md:text-base text-gray-700">ظرفیت تا {{ totalCapacity }} نفر ({{ capacity.base }} نفر پایه + تا {{ capacity.extra }} نفر اضافه)</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" class="h-5 w-5 text-gray-500">
              <path d="M22 17.5H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
              <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
            </svg>
            <span class="text-sm md:text-base">
              <template v-if="bedrooms > 0">
                {{ bedrooms }} <span class="md:hidden">اتاق</span><span class="hidden md:inline">اتاق خواب</span>
              </template>
              <template v-if="bedrooms > 0">
                <span class="text-gray-300 px-1 inline-block">|‌</span>
              </template>
              <template v-if="beds.double > 0">
                {{ beds.double }} <span class="hidden md:inline">تخت</span> دو نفره 
              </template>
              <template v-if="beds.double > 0 && (beds.single > 0 || beds.mattress > 0)">
                <span class="text-gray-300 px-1 inline-block">|‌</span>
              </template>
              <template v-if="beds.single > 0">
                {{ beds.single }} <span class="hidden md:inline">تخت</span> یک نفره
              </template>
              <template v-if="beds.single > 0 && beds.mattress > 0">
                <span class="text-gray-300 px-1 inline-block">|‌</span>
              </template>
              <template v-if="beds.mattress > 0">
                {{ beds.mattress }} <span class="hidden md:inline">رخت‌خواب</span> سنتی
              </template>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: String,
  city: String,
  province: String,
  rating: Number,
  reviews: Number,
  hostName: String,
  hostImage: String,
  capacity: {
    type: Object,
    default: () => ({ base: 0, extra: 0 })
  },
  beds: {
    type: Object,
    default: () => ({ double: 0, mattress: 0, single: 0, twin: 0 })
  },
  baths: Number,
  bedrooms: Number,
  propertyType: String,
});

const isSaved = ref(false);

const toggleSave = () => {
  isSaved.value = !isSaved.value;
};

const totalCapacity = computed(() => {
  return (props.capacity.base || 0) + (props.capacity.extra || 0);
});

const totalBeds = computed(() => {
  return (props.beds.double || 0) + (props.beds.mattress || 0) + (props.beds.single || 0) + (props.beds.twin || 0);
});
</script> 