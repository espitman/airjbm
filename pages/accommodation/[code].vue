<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-bold">جزئیات اقامتگاه</h1>
          <div class="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm">
            کد: {{ code }}
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">توضیحات</h2>
          <p class="text-gray-600">اطلاعات اقامتگاه با کد {{ code }} در حال بارگذاری است.</p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
          <h2 class="text-xl font-semibold mb-4">اطلاعات اقامتگاه</h2>
          <div class="space-y-4">
            <div>
              <span class="text-gray-600">کد اقامتگاه:</span>
              <span class="font-semibold mr-2">{{ code }}</span>
            </div>
            <div>
              <span class="text-gray-600">وضعیت:</span>
              <span class="font-semibold mr-2">در حال توسعه</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const code = computed(() => route.params.code)
</script> 