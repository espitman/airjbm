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
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
        {{ title }}
      </h1>

      <!-- Rating and location -->
      <div class="flex flex-wrap items-center gap-2 text-lg">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="font-semibold mr-1">{{ rating }}</span>
          <span class="text-gray-500 mr-1">({{ reviews }})</span>
        </div>
        <span class="text-gray-500 mx-2">•</span>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="mr-1">{{ province }}{{ city ? `، ${city}` : '' }}</span>
        </div>
      </div>

      <!-- Host information -->
      <div class="flex items-center pt-2">
        <div class="relative">
          <img 
            :src="hostImage" 
            :alt="hostName" 
            class="w-12 h-12 rounded-full object-cover border border-gray-200"
          />
          <span class="absolute bottom-0 right-0 bg-teal-500 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div class="mr-4">
          <span class="text-gray-500 text-lg">میزبان:</span>
          <span class="text-gray-900 text-lg font-medium mr-2">{{ hostName }}</span>
        </div>
      </div>

      <!-- Property details -->
      <div class="flex flex-wrap gap-6 pt-4 border-t border-gray-200 mt-4">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span class="text-base">
            <span class="md:hidden">{{ totalCapacity }}</span>
            <span class="hidden md:inline">
              <template v-if="beds.double > 0">
                {{ beds.double }} تخت دو نفره 
              </template>
              <template v-if="beds.double > 0 && (beds.single > 0 || beds.mattress > 0)">
                |‌
              </template>
              <template v-if="beds.single > 0">
                {{ beds.single }} تخت یک نفره
              </template>
              <template v-if="beds.single > 0 && beds.mattress > 0">
                |‌
              </template>
              <template v-if="beds.mattress > 0">
                {{ beds.mattress }} رخت‌خواب سنتی
              </template>
            </span>
          </span>
        </div>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" class="h-5 w-5 text-gray-500">
            <path d="M22 17.5H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
            <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
          </svg>
          <span class="text-base">
            <span class="md:hidden">{{ totalBeds }}</span>
            <span class="hidden md:inline">{{ totalBeds }} تخت</span>
          </span>
        </div>
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" class="h-6 w-6"><path d="M22 12H15C14.3509 12 13.7193 11.7895 13.2 11.4L10.8 9.6C10.2807 9.21053 9.64911 9 9 9H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 9V11C3 14.7712 3 16.6569 4.17157 17.8284C5.34315 19 7.22876 19 11 19H14C16.8089 19 18.2134 19 19.2223 18.3259C19.659 18.034 20.034 17.659 20.3259 17.2223C21 16.2134 21 14.8089 21 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 19V21M6 19V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 9V4.5C5 3.67157 5.67157 3 6.5 3C7.32843 3 8 3.67157 8 4.5V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          <span class="text-base">
            <span class="md:hidden">{{ baths }}</span>
            <span class="hidden md:inline">{{ baths }} حمام</span>
          </span>
        </div>
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" class="h-6 w-6"><path d="M17 16V8C17 5.64298 17 4.46447 16.2678 3.73223C15.5355 3 14.357 3 12 3H8C5.64298 3 4.46447 3 3.73223 3.73223C3 4.46447 3 5.64298 3 8V16C3 18.357 3 19.5355 3.73223 20.2678C4.46447 21 5.64298 21 8 21H12C14.357 21 15.5355 21 16.2678 20.2678C17 19.5355 17 18.357 17 16Z" stroke="currentColor" stroke-width="1.5"></path><path d="M11 21H17C18.8856 21 19.8284 21 20.4142 20.4142C21 19.8284 21 18.8856 21 17V10C21 8.11438 21 7.17157 20.4142 6.58579C19.8284 6 18.8856 6 17 6" stroke="currentColor" stroke-width="1.5"></path><path d="M13 11V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
          <span class="text-base">
            <span class="md:hidden">{{ bedrooms }}</span>
            <span class="hidden md:inline">{{ bedrooms }} اتاق خواب</span>
          </span>
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