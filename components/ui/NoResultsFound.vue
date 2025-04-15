<template>
  <div class="text-center py-8">
    <!-- No Results Message -->
    <div class="text-left  border-b border-gray-200 pb-6">
      <div class="flex items-center justify-start gap-4">
        <div class="text-indigo-600">
          <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
            <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-2">متاسفیم!</h2>
          <p class="text-gray-600">نتیجه‌ای برای جستجوی شما یافت نشد.</p>
        </div>
      </div>
    </div>

    <!-- Related Listings -->
    <div v-if="relatedListings.length > 0" class="mt-8">
      <FeaturedListings 
        :listings="relatedListings"
        title="پیشنهادات مشابه"
        description=""
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import FeaturedListings from '~/components/home/FeaturedListings.vue'

const { $listingsApi } = useNuxtApp()
const relatedListings = ref([])

const props = defineProps({
  message: {
    type: String,
    default: 'هیچ اقامتگاهی با معیارهای شما یافت نشد.'
  },
  keyword: {
    type: String,
    default: ''
  },
  check_in: {
    type: String,
    default: ''
  },
  check_out: {
    type: String,
    default: ''
  },
  passengerCount: {
    type: [String, Number],
    default: ''
  }
})

const hasSearchParams = computed(() => {
  return props.keyword || props.check_in || props.check_out || props.passengerCount
})

const searchParamsText = computed(() => {
  const params = []
  if (props.keyword) params.push(props.keyword)
  if (props.check_in) params.push(`از ${props.check_in}`)
  if (props.check_out) params.push(`تا ${props.check_out}`)
  if (props.passengerCount) params.push(`${props.passengerCount} نفر`)
  return params.join(' - ')
})

const fetchRelatedListings = async () => {
  try {
    const data = await $listingsApi.fetchListings({
      page: 1,
      size: 6,
      keyword: props.keyword
    })
    relatedListings.value = data.items
  } catch (error) {
    console.error('Error fetching related listings:', error)
  }
}

onMounted(() => {
  if (props.keyword) {
    fetchRelatedListings()
  }
})
</script>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.3s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 