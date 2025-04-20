<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">قوانین و مقررات</h2>
    
    <div class="w-24 h-px bg-gray-200 mb-6"></div>
    
    <div class="mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">سیاست لغو رزرو</h3>
      <div class="text-gray-600 space-y-4">
        <p>
          {{ cancellationPolicyText }}
        </p>
        <button 
          v-if="cancellationPolicyText"
          @click="showModal = true" 
          class="text-gray-900 hover:text-gray-700 font-medium inline-flex items-center mt-2"
        >
          مشاهده جزئیات بیشتر
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p v-else class="text-gray-500 italic">
          اطلاعاتی در این مورد ثبت نشده است.
        </p>
      </div>
    </div>
    
    <div class="w-full h-px bg-gray-200 mb-6"></div>
    
    <div class="mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">ساعات ورود و خروج</h3>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="bg-gray-100 rounded-lg p-4 flex-1 transition-colors duration-200 hover:bg-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-gray-600">ورود</div>
            <div class="text-gray-900 text-lg font-medium">{{ persianCheckIn }}</div>
          </div>
        </div>
        <div class="bg-gray-100 rounded-lg p-4 flex-1 transition-colors duration-200 hover:bg-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-gray-600">خروج</div>
            <div class="text-gray-900 text-lg font-medium">{{ persianCheckOut }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="w-full h-px bg-gray-200 mb-6"></div>
    
    <div>
      <h3 class="text-xl font-bold text-gray-900 mb-4">نکات ویژه</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Restricted Rules (Positive) -->
        <template v-for="rule in restrictedRules" :key="rule.name">
          <div class="flex items-start">
            <div class="ml-4 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-1">{{ $persianTranslations.getPersianRuleName(rule) }}</h4>
              <p class="text-gray-600 text-sm">{{ rule.positive }}</p>
            </div>
          </div>
        </template>
        
        <!-- Negative Restricted Rules -->
        <template v-for="rule in negativeRestrictedRules" :key="rule.name">
          <div class="flex items-start">
            <div class="ml-4 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-1">{{ $persianTranslations.getPersianRuleName(rule) }}</h4>
              <p class="text-gray-600 text-sm">{{ rule.negative }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
    
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showModal = false"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white">
            <PdpCancellationDetails 
              :accommodation-id="accommodationId" 
              @close="showModal = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useNuxtApp } from '#app';
import PdpCancellationDetails from '~/components/pdp/PdpCancellationDetails.vue';

const { $persianTranslations } = useNuxtApp();
const showModal = ref(false);

const props = defineProps({
  restrictedRules: {
    type: Array,
    default: () => []
  },
  negativeRestrictedRules: {
    type: Array,
    default: () => []
  },
  checkIn: {
    type: String,
    default: '08:00'
  },
  checkOut: {
    type: String,
    default: '14:00'
  },
  cancellationPolicyText: {
    type: String,
    default: ''
  },
  accommodationId: {
    type: String,
    required: true
  }
});

const toPersianNumbers = (str) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (d) => persianNumbers[d]);
};

const persianCheckIn = computed(() => toPersianNumbers(props.checkIn));
const persianCheckOut = computed(() => toPersianNumbers(props.checkOut));
</script> 