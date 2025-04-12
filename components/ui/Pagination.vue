<template>
  <div class="flex justify-center">
    <div class="flex flex-wrap justify-center gap-2 max-w-full">
      <!-- Previous Page Button -->
      <button 
        v-if="currentPage > 1"
        @click="goToPage(currentPage - 1)"
        class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <!-- First Page -->
      <button 
        v-if="currentPage > 3"
        @click="goToPage(1)"
        class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        1
      </button>
      
      <!-- Ellipsis -->
      <span v-if="currentPage > 4" class="px-2 py-2">...</span>
      
      <!-- Page Numbers -->
      <button 
        v-for="page in displayedPages" 
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-2 rounded-lg',
          currentPage === page 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ page }}
      </button>
      
      <!-- Ellipsis -->
      <span v-if="currentPage < totalPages - 3" class="px-2 py-2">...</span>
      
      <!-- Last Page -->
      <button 
        v-if="currentPage < totalPages - 2"
        @click="goToPage(totalPages)"
        class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        {{ totalPages }}
      </button>
      
      <!-- Next Page Button -->
      <button 
        v-if="currentPage < totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 16
  }
})

const emit = defineEmits(['page-change'])
const route = useRoute()
const router = useRouter()

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const displayedPages = computed(() => {
  const pages = []
  const maxPages = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxPages / 2))
  let end = Math.min(totalPages.value, start + maxPages - 1)
  
  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const goToPage = async (page) => {
  // Create a new query object with all existing filters
  const query = { ...route.query, page: page.toString() }
  
  // Update URL without triggering navigation
  await router.replace({ query })
  
  // Emit the page change event
  emit('page-change', page)
}
</script> 