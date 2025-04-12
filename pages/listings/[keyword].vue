<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Toggle Button (Mobile) -->
        <button 
          @click="toggleFilters"
          class="lg:hidden w-full mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
        </button>

        <!-- Filters Sidebar -->
        <div 
          v-if="(showFilters || windowWidth >= 1024) && !$listingsApi.loading.value"
          class="lg:w-1/4 transition-all duration-300 lg:sticky lg:top-24 lg:self-start"
        >
          <Filters 
            :user-filters="$listingsApi.userFilters.value"
            :show-rules-modal="showRulesModal"
            :show-amenities-modal="showAmenitiesModal"
            @close="hideFilters"
            @apply-filters="handleApplyFilters"
            @open-rules-modal="showRulesModal = true"
            @open-amenities-modal="showAmenitiesModal = true"
            @show-modal="showModal = true"
          />
        </div>

        <!-- Listings Grid -->
        <div :class="['lg:w-3/4', {'w-full': !showFilters && windowWidth < 1024}]">
          <!-- Loading State -->
          <div v-if="$listingsApi.loading.value" class="fixed inset-0 flex justify-center items-center bg-white/80 z-50">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>

          <!-- Error State -->
          <div v-else-if="$listingsApi.error.value" class="text-center py-8">
            <p class="text-red-600">{{ $listingsApi.error.value }}</p>
          </div>

          <!-- Results Title -->
          <SearchResultsTitle v-if="!$listingsApi.loading.value && !$listingsApi.error.value" :keyword="keyword" />

          <!-- No Results Message -->
          <div v-if="!$listingsApi.loading.value && !$listingsApi.error.value && $listingsApi.listings.value.length === 0" class="text-center py-8">
            <p class="text-gray-600 text-lg">هیچ اقامتگاهی با معیارهای شما یافت نشد.</p>
          </div>

          <!-- Listings Grid -->
          <div v-if="!$listingsApi.loading.value && !$listingsApi.error.value && $listingsApi.listings.value.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListingCard 
              v-for="listing in paginatedListings" 
              :key="listing.id" 
              :listing="listing" 
            />
          </div>
          
          <!-- Pagination -->
          <div v-if="!$listingsApi.loading.value && !$listingsApi.error.value" class="mt-8">
            <Pagination
              :current-page="currentPage"
              :total-items="$listingsApi.total?.value || 0"
              :items-per-page="itemsPerPage"
              @page-change="goToPage"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Modals -->
    <FilterModals
      :show-rules-modal="showRulesModal"
      :show-amenities-modal="showAmenitiesModal"
      :selected-rules="filters.selectedRules"
      :selected-amenities="filters.selectedAmenities"
      @close-rules-modal="showRulesModal = false"
      @close-amenities-modal="showAmenitiesModal = false"
      @update:selected-rules="updateSelectedRules"
      @update:selected-amenities="updateSelectedAmenities"
      @apply-filters="handleModalApplyFilters"
    />

    <!-- Rules & Amenities Modal -->
    <RulesAmenitiesModal 
      :show="showModal"
      :filters="filters"
      @close="showModal = false"
      @update:filters="handleModalFilters"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import { useFilters } from '~/composables/useFilters'
import Filters from '~/components/ui/Filters.vue'
import FilterModals from '~/components/ui/FilterModals.vue'
import ListingCard from '~/components/ui/ListingCard.vue'
import RulesAmenitiesModal from '~/components/ui/RulesAmenitiesModal.vue'
import SearchResultsTitle from '~/components/ui/SearchResultsTitle.vue'
import Pagination from '~/components/ui/Pagination.vue'

const route = useRoute()
const router = useRouter()
const { $listingsApi } = useNuxtApp()
const { filters, updateFilter, applyFilters } = useFilters()

const showFilters = ref(true)
const showModal = ref(false)
const showRulesModal = ref(false)
const showAmenitiesModal = ref(false)
const windowWidth = ref(0)
const currentPage = computed({
  get: () => {
    const page = parseInt(route.query.page) || 1
    return page > 0 ? page : 1
  },
  set: (value) => {
    updatePageQuery(value)
  }
})
const itemsPerPage = 16

// Get the keyword from the URL parameter
const keyword = computed(() => {
  return route.params.keyword || 'city-tehran'
})

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
  
  // Get page from URL query or default to 1
  const pageFromQuery = parseInt(route.query.page) || 1
  const page = pageFromQuery > 0 ? pageFromQuery : 1
  
  // Fetch listings with the page from URL and keyword from route params
  fetchListings(page)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const hideFilters = () => {
  showFilters.value = false
}

// Add a flag to track if we're applying filters
const isApplyingFilters = ref(false)

const handleApplyFilters = async (updatedFilters = filters.value) => {
  // Set the flag to indicate we're applying filters
  isApplyingFilters.value = true
  
  // Apply filters to URL and get the updated filters
  const appliedFilters = await applyFilters()
  
  // Reset to page 1 when filters are applied
  currentPage.value = 1
  
  // Fetch listings with the updated filters and page 1
  await fetchListings(1, appliedFilters)
  
  // Scroll to top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // Reset the flag after a short delay
  setTimeout(() => {
    isApplyingFilters.value = false
  }, 100)
}

const handleClearFilters = async () => {
  // Set the flag to indicate we're applying filters
  isApplyingFilters.value = true
  
  // Clear all filters
  filters.value = {
    priceRange: [0, 1000000],
    bedrooms: [],
    bathrooms: [],
    propertyTypes: [],
    amenities: [],
    moreFilters: {}
  }
  
  // Clear URL parameters except keyword
  const query = { keyword: route.query.keyword }
  await router.replace({ query })
  
  // Reset to page 1
  currentPage.value = 1
  
  // Fetch listings with cleared filters
  await fetchListings(1)
  
  // Scroll to top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // Reset the flag after a short delay
  setTimeout(() => {
    isApplyingFilters.value = false
  }, 100)
}

const fetchListings = async (page, currentFilters = filters.value) => {
  try {
    // Show loading state
    $listingsApi.loading.value = true
    
    // Fetch listings with the current page and filters
    await $listingsApi.fetchListings({ 
      page, 
      size: itemsPerPage, 
      keyword: keyword.value,
      cities: currentFilters.cities,
      types: currentFilters.types,
      regions: currentFilters.regions,
      passengerCount: currentFilters.passengerCount ? Number(currentFilters.passengerCount) : undefined,
      rooms: currentFilters.roomsCount ? Number(currentFilters.roomsCount) : undefined,
      check_in: currentFilters.check_in || undefined,
      check_out: currentFilters.check_out || undefined,
      min_price: currentFilters.minPrice ? parseInt(currentFilters.minPrice) : undefined,
      max_price: currentFilters.maxPrice ? parseInt(currentFilters.maxPrice) : undefined,
      sort: currentFilters.sortBy || route.query.sort,
      selectedRules: currentFilters.selectedRules,
      selectedAmenities: currentFilters.selectedAmenities
    })
  } catch (error) {
    console.error('Error fetching listings:', error)
    $listingsApi.error.value = error instanceof Error ? error.message : 'An error occurred while fetching listings'
  } finally {
    $listingsApi.loading.value = false
  }
}

const updatePageQuery = async (page) => {
  // Create a new query object with all existing filters
  const query = { ...route.query, page: page.toString() }
  
  // Update URL without triggering navigation
  await router.replace({ query })
  
  // Only fetch listings if we're not applying filters
  if (!isApplyingFilters.value) {
    await fetchListings(page)
  }
}

const goToPage = async (page) => {
  currentPage.value = page
  await updatePageQuery(page)
}

// Watch for changes in the current page
watch(() => currentPage.value, async (newPage) => {
  if (newPage > 0) {
    await updatePageQuery(newPage)
  }
})

// Watch for changes in the route query page parameter
watch(() => route.query.page, (newPage) => {
  const page = parseInt(newPage || '1')
  if (page > 0 && page !== currentPage.value) {
    currentPage.value = page
    fetchListings(page)
  }
}, { immediate: true })

const totalPages = computed(() => {
  return Math.ceil(($listingsApi.total?.value || 0) / itemsPerPage)
})

const displayedPages = computed(() => {
  const pages = []
  const maxPages = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxPages / 2))
  let end = Math.min(totalPages.value, start + maxPages - 1)
  
  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const paginatedListings = computed(() => {
  return $listingsApi.listings.value
})

// Function to handle modal filters
const handleModalFilters = (newFilters) => {
  // Update each filter individually using the composable's updateFilter function
  Object.entries(newFilters).forEach(([key, value]) => {
    if (key in filters.value) {
      updateFilter(key, value)
    }
  })
  // Don't apply filters immediately, wait for the user to click the Apply button
}

// Function to handle modal apply filters
const handleModalApplyFilters = async () => {
  await handleApplyFilters()
}

// Function to update selected rules
const updateSelectedRules = (rules) => {
  updateFilter('selectedRules', rules)
  // Don't apply filters immediately, wait for the user to click the Apply button
}

// Function to update selected amenities
const updateSelectedAmenities = (amenities) => {
  updateFilter('selectedAmenities', amenities)
  // Don't apply filters immediately, wait for the user to click the Apply button
}
</script> 