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
    
    <!-- Flexible Policy Content -->
    <div v-if="activeTab === 'flexible'">
      <!-- Description -->
      <p class="text-gray-700 mb-10 text-left leading-relaxed">
        از لحظه رزرو تا ۲ روز قبل از تاریخ ورود کل مبلغ رزرو بازگشت داده می‌شود.
      </p>
      
      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <!-- Timeline items -->
        <div class="space-y-16">
          <!-- Item 1 -->
          <div class="relative flex">
            <div class="absolute right-0 mt-1">
              <div class="h-8 w-8 rounded-full bg-teal-100 border-4 border-white ring-2 ring-teal-400 flex items-center justify-center z-10"></div>
            </div>
            <div class="mr-16">
              <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">۲ روز قبل از ورود مهمان</h3>
              <p class="text-gray-700 text-left">پرداخت کامل وجه به مهمان</p>
            </div>
          </div>
          
          <!-- Item 2 -->
          <div class="relative flex">
            <div class="absolute right-0 mt-1">
              <div class="h-8 w-8 rounded-full bg-yellow-100 border-4 border-white ring-2 ring-yellow-400 flex items-center justify-center z-10"></div>
            </div>
            <div class="mr-16">
              <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">تا روز ورود مهمان</h3>
              <p class="text-gray-700 text-left">۲۰٪ مبلغ شب اول + ۱۰٪ مبلغ شب‌های باقیمانده</p>
            </div>
          </div>
          
          <!-- Item 3 -->
          <div class="relative flex">
            <div class="absolute right-0 mt-1">
              <div class="h-8 w-8 rounded-full bg-red-100 border-4 border-white ring-2 ring-red-400 flex items-center justify-center z-10"></div>
            </div>
            <div class="mr-16">
              <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">از روز ورود تا خروج مهمان</h3>
              <p class="text-gray-700 text-left">۱۰۰٪ مبلغ شب‌های سپری شده + ۲۰٪ مبلغ شب‌های باقیمانده</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Peak Day Policy Content -->
    <div v-else>
      <!-- Description -->
      <p class="text-gray-700 mb-10 text-left leading-relaxed">
        در روزهای پیک (تعطیلات رسمی و آخر هفته) قوانین لغو متفاوت است.
      </p>
      
      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <!-- Timeline items -->
        <div class="space-y-16">
          <!-- Item 1 -->
          <div class="relative flex">
            <div class="absolute right-0 mt-1">
              <div class="h-8 w-8 rounded-full bg-teal-100 border-4 border-white ring-2 ring-teal-400 flex items-center justify-center z-10"></div>
            </div>
            <div class="mr-16">
              <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">۷ روز قبل از ورود مهمان</h3>
              <p class="text-gray-700 text-left">۵۰٪ مبلغ کل رزرو</p>
            </div>
          </div>
          
          <!-- Item 2 -->
          <div class="relative flex">
            <div class="absolute right-0 mt-1">
              <div class="h-8 w-8 rounded-full bg-yellow-100 border-4 border-white ring-2 ring-yellow-400 flex items-center justify-center z-10"></div>
            </div>
            <div class="mr-16">
              <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">۳ روز قبل از ورود مهمان</h3>
              <p class="text-gray-700 text-left">۷۵٪ مبلغ کل رزرو</p>
            </div>
          </div>
          
          <!-- Item 3 -->
          <div class="relative flex">
            <div class="absolute right-0 mt-1">
              <div class="h-8 w-8 rounded-full bg-red-100 border-4 border-white ring-2 ring-red-400 flex items-center justify-center z-10"></div>
            </div>
            <div class="mr-16">
              <h3 class="text-lg font-bold text-gray-900 mb-2 text-left">کمتر از ۳ روز تا ورود مهمان</h3>
              <p class="text-gray-700 text-left">۱۰۰٪ مبلغ کل رزرو</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('flexible');
</script>

<style>
/* Add any additional custom styles here if needed */
</style> 