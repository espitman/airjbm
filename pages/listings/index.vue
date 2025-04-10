<template>
  <div>
    <!-- This page will redirect to the default keyword -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Redirect to the default keyword
  router.push('/listings/city-tehran')
})
</script> 