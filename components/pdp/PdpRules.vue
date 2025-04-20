<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">قوانین و مقررات</h2>
    
    <div class="w-24 h-px bg-gray-200 mb-6"></div>
    
    <div class="mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">سیاست لغو رزرو</h3>
      <div class="text-gray-600 space-y-4">
        <p>
          بازگشت ۵۰٪ از مبلغ رزرو در صورت لغو اقامتگاه توسط مسافر در مدت ۴۸ ساعت پس از
          رزرو موفق و ۱۴ روز قبل از زمان ورود.
        </p>
        <p>
          سپس، لغو اقامتگاه ۱۴ روز قبل از زمان ورود، بازگشت ۵۰٪ از کل
          مبلغ پرداختی (منهای هزینه خدمات).
        </p>
      </div>
    </div>
    
    <div class="w-full h-px bg-gray-200 mb-6"></div>
    
    <div class="mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">ساعات ورود و خروج</h3>
      <div class="bg-gray-100 rounded-lg p-4">
        <div class="flex justify-between py-2">
          <div class="text-gray-600">ورود</div>
          <div class="text-gray-600">۰۸:۰۰ صبح - ۱۲:۰۰ شب</div>
        </div>
        <div class="flex justify-between py-2">
          <div class="text-gray-600">خروج</div>
          <div class="text-gray-600">۰۲:۰۰ بعد از ظهر - ۰۴:۰۰ بعد از ظهر</div>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-1">{{ $persianTranslations.getPersianRuleName(rule) }}</h4>
              <p class="text-gray-600">{{ rule.positive }}</p>
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
              <p class="text-gray-600">{{ rule.negative }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNuxtApp } from '#app';

const { $persianTranslations } = useNuxtApp();

const props = defineProps({
  restrictedRules: {
    type: Array,
    default: () => []
  },
  negativeRestrictedRules: {
    type: Array,
    default: () => []
  }
});
</script> 