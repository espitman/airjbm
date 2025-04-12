<template>
  <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
    <h2 class="text-lg font-semibold text-gray-800">
      نتایج جستجو برای: {{ keyword }}
    </h2>
  </div>
</template>

<script setup>
defineProps({
  keyword: {
    type: String,
    required: true
  }
})
</script> 