<template>
  <div class="max-w-4xl mx-auto p-6 font-vazir" dir="rtl">
    <!-- Main heading -->
    <h1 class="text-2xl font-bold text-gray-900 mb-8 text-left">قوانین لغو رزرو</h1>
    
    <!-- Tabs -->
    <div class="flex justify-start mb-6 border-b border-gray-200">
      <div class="flex space-x-reverse space-x-8">
        <button 
          @click="activeTab = 'flexible'"
          :class="[
            'pb-4 font-medium border-b-2',
            activeTab === 'flexible' 
              ? 'text-gray-900 border-gray-900' 
              : 'text-gray-500 hover:text-gray-700 border-transparent'
          ]"
        >
          سهل گیرانه
        </button>
        <button 
          @click="activeTab = 'peak'"
          :class="[
            'pb-4 font-medium border-b-2',
            activeTab === 'peak' 
              ? 'text-gray-900 border-gray-900' 
              : 'text-gray-500 hover:text-gray-700 border-transparent'
          ]"
        >
          قوانین ویژه روزهای پیک
        </button>
      </div>
    </div>
    
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    
    <!-- Error state -->
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
    
    <!-- Content -->
    <template v-else>
      <!-- Flexible Policy Content -->
      <div v-if="activeTab === 'flexible' && flexiblePolicy">
        <!-- Description -->
        <p class="text-gray-700 mb-10 text-left leading-relaxed">
          {{ flexiblePolicy.description }}
        </p>
        
        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical line -->
          <div class="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <!-- Timeline items -->
          <div class="space-y-16">
            <!-- Before Check-in -->
            <div class="relative flex">
              <div class="absolute right-0 mt-1">
                <div class="h-8 w-8 rounded-full border-4 border-white ring-2 flex items-center justify-center z-10" :style="{ backgroundColor: flexiblePolicy.beforeCheckIn.color + '20', borderColor: flexiblePolicy.beforeCheckIn.color }"></div>
              </div>
              <div class="mr-16">
                <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">{{ flexiblePolicy.beforeCheckIn.title }}</h3>
                <p class="text-gray-700 text-left">{{ flexiblePolicy.beforeCheckIn.text }}</p>
              </div>
            </div>
            
            <!-- Until Check-in -->
            <div class="relative flex">
              <div class="absolute right-0 mt-1">
                <div class="h-8 w-8 rounded-full border-4 border-white ring-2 flex items-center justify-center z-10" :style="{ backgroundColor: flexiblePolicy.untilCheckIn.color + '20', borderColor: flexiblePolicy.untilCheckIn.color }"></div>
              </div>
              <div class="mr-16">
                <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">{{ flexiblePolicy.untilCheckIn.title }}</h3>
                <p class="text-gray-700 text-left">{{ flexiblePolicy.untilCheckIn.text }}</p>
              </div>
            </div>
            
            <!-- After Check-in -->
            <div class="relative flex">
              <div class="absolute right-0 mt-1">
                <div class="h-8 w-8 rounded-full border-4 border-white ring-2 flex items-center justify-center z-10" :style="{ backgroundColor: flexiblePolicy.afterCheckIn.color + '20', borderColor: flexiblePolicy.afterCheckIn.color }"></div>
              </div>
              <div class="mr-16">
                <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">{{ flexiblePolicy.afterCheckIn.title }}</h3>
                <p class="text-gray-700 text-left">{{ flexiblePolicy.afterCheckIn.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Peak Day Policy Content -->
      <div v-else-if="activeTab === 'peak' && peakPolicy">
        <!-- Description -->
        <p class="text-gray-700 mb-10 text-left leading-relaxed">
          {{ peakPolicy.description }}
        </p>
        
        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical line -->
          <div class="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <!-- Timeline items -->
          <div class="space-y-16">
            <!-- Before Check-in -->
            <div class="relative flex">
              <div class="absolute right-0 mt-1">
                <div class="h-8 w-8 rounded-full border-4 border-white ring-2 flex items-center justify-center z-10" :style="{ backgroundColor: peakPolicy.beforeCheckIn.color + '20', borderColor: peakPolicy.beforeCheckIn.color }"></div>
              </div>
              <div class="mr-16">
                <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">{{ peakPolicy.beforeCheckIn.title }}</h3>
                <p class="text-gray-700 text-left">{{ peakPolicy.beforeCheckIn.text }}</p>
              </div>
            </div>
            
            <!-- Until Check-in -->
            <div class="relative flex">
              <div class="absolute right-0 mt-1">
                <div class="h-8 w-8 rounded-full border-4 border-white ring-2 flex items-center justify-center z-10" :style="{ backgroundColor: peakPolicy.untilCheckIn.color + '20', borderColor: peakPolicy.untilCheckIn.color }"></div>
              </div>
              <div class="mr-16">
                <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">{{ peakPolicy.untilCheckIn.title }}</h3>
                <p class="text-gray-700 text-left">{{ peakPolicy.untilCheckIn.text }}</p>
              </div>
            </div>
            
            <!-- After Check-in -->
            <div class="relative flex">
              <div class="absolute right-0 mt-1">
                <div class="h-8 w-8 rounded-full border-4 border-white ring-2 flex items-center justify-center z-10" :style="{ backgroundColor: peakPolicy.afterCheckIn.color + '20', borderColor: peakPolicy.afterCheckIn.color }"></div>
              </div>
              <div class="mr-16">
                <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">{{ peakPolicy.afterCheckIn.title }}</h3>
                <p class="text-gray-700 text-left">{{ peakPolicy.afterCheckIn.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from 'nuxt/app';
import type { CancellationPolicyItem } from '../../types/cancellation-policy';

const props = defineProps<{
  accommodationId: string;
}>();

const { $pdpApi } = useNuxtApp() as unknown as { $pdpApi: { getCancellationPolicyDetails: (id: string) => Promise<any> } };
const activeTab = ref('flexible');
const loading = ref(true);
const error = ref<string | null>(null);
const flexiblePolicy = ref<CancellationPolicyItem | null>(null);
const peakPolicy = ref<CancellationPolicyItem | null>(null);

const fetchCancellationPolicy = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await $pdpApi.getCancellationPolicyDetails(props.accommodationId);
    
    if (response.success && response.result.cancellationPolicy.length > 0) {
      // Find flexible and peak policies
      flexiblePolicy.value = response.result.cancellationPolicy.find(policy => policy.isDefault) || null;
      peakPolicy.value = response.result.cancellationPolicy.find(policy => !policy.isDefault) || null;
      
      // Set initial active tab based on available policies
      if (!flexiblePolicy.value && peakPolicy.value) {
        activeTab.value = 'peak';
      }
    } else {
      error.value = 'اطلاعات قوانین لغو رزرو در دسترس نیست';
    }
  } catch (err) {
    console.error('Error fetching cancellation policy:', err);
    error.value = 'خطا در دریافت اطلاعات قوانین لغو رزرو';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (props.accommodationId) {
    fetchCancellationPolicy();
  }
});
</script>

<style>
/* Add any additional custom styles here if needed */
</style> 