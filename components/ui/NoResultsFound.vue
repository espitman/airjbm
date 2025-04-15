<template>
  <div class="text-center py-8">
    <p class="text-gray-600 text-lg">{{ message }}</p>
    
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