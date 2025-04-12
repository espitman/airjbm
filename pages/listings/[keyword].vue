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
            @apply-filters="onApplyFilters"
            @clear-filters="onClearFilters"
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
const { 
  filters,
  isApplyingFilters,
  toggleFilter,
  updateFilter,
  applyFilters,
  handleApplyFilters,
  handleClearFilters,
  fetchListings,
  currentPage,
  updatePageQuery,
  goToPage
} = useFilters()

const showFilters = ref(true)
const showModal = ref(false)
const showRulesModal = ref(false)
const showAmenitiesModal = ref(false)
const windowWidth = ref(0)
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

// Function to handle applying filters
const onApplyFilters = () => {
  handleApplyFilters()
}

// Function to handle clearing filters
const onClearFilters = () => {
  handleClearFilters()
}

// Function to handle modal apply filters
const handleModalApplyFilters = async () => {
  await onApplyFilters()
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