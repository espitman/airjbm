<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div v-if="pageState.loading">
        <ListingsPageSkeleton />
      </div>
      <div v-else>
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filters Sidebar (Desktop) -->
          <div 
            class="hidden lg:block lg:w-1/4 transition-all duration-300 lg:sticky lg:top-24 lg:self-start"
          >
            <Filters 
              :user-filters="pageState.userFilters"
              :show-rules-modal="showRulesModal"
              :show-amenities-modal="showAmenitiesModal"
              :filters="filters"
              :filtered-cities="filteredCities"
              :filtered-regions="filteredRegions"
              :filtered-types="filteredTypes"
              :filtered-rules="filteredRules"
              :filtered-amenities="filteredAmenities"
              :loading="loading"
              :error="error"
              @close="hideFilters"
              @apply-filters="onApplyFilters"
              @clear-filters="onClearFilters"
              @open-rules-modal="showRulesModal = true"
              @open-amenities-modal="showAmenitiesModal = true"
              @show-modal="showModal = true"
              @filters-changed="handleFiltersChanged"
            />
          </div>

          
          <!-- Listings Grid -->
          <div :class="['lg:w-3/4', {'w-full': !showFilters}]">
            <!-- Loading State -->
           

            <!-- Error State -->
            <div v-if="pageState.error" class="text-center py-8">
              <p class="text-red-600">{{ pageState.error }}</p>
            </div>

            <!-- Results Title and Mobile Filters -->
            <template v-if="!pageState.loading && !pageState.error">
              <SearchResultsTitle :keyword="keyword" />
              
              <!-- Mobile Filters Toggle Button -->
              <button 
                @click="toggleFilters"
                class="lg:hidden w-full mb-4 bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 transition-colors flex items-center justify-center shadow-sm"
              >
                <span>{{ showFilters ? 'بستن فیلترها' : 'نمایش فیلترها' }}</span>
                <i class="fas fa-chevron-down mr-2 transition-transform duration-300" :class="{ 'transform rotate-180': showFilters }"></i>
              </button>
              
              <!-- Mobile Filters with Animation -->
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0 overflow-hidden"
                enter-to-class="opacity-100 max-h-[2000px]"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="opacity-100 max-h-[2000px]"
                leave-to-class="opacity-0 max-h-0 overflow-hidden"
              >
                <div v-if="showFilters" class="mb-6">
                  <Filters 
                    :user-filters="pageState.userFilters"
                    :show-rules-modal="showRulesModal"
                    :show-amenities-modal="showAmenitiesModal"
                    :filters="filters"
                    :filtered-cities="filteredCities"
                    :filtered-regions="filteredRegions"
                    :filtered-types="filteredTypes"
                    :filtered-rules="filteredRules"
                    :filtered-amenities="filteredAmenities"
                    :loading="loading"
                    :error="error"
                    @close="hideFilters"
                    @apply-filters="onApplyFilters"
                    @clear-filters="onClearFilters"
                    @open-rules-modal="showRulesModal = true"
                    @open-amenities-modal="showAmenitiesModal = true"
                    @show-modal="showModal = true"
                    @filters-changed="handleFiltersChanged"
                  />
                </div>
              </transition>
            </template>

            <!-- No Results Message -->
            <div v-if="!pageState.loading && !pageState.error && pageState.listings.length === 0" class="text-center py-8">
              <p class="text-gray-600 text-lg">هیچ اقامتگاهی با معیارهای شما یافت نشد.</p>
            </div>

            <!-- Listings Grid -->
            <div v-if="!pageState.loading && !pageState.error && pageState.listings.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ListingCard 
                v-for="listing in paginatedListings" 
                :key="listing.id" 
                :listing="listing" 
              />
            </div>
            
            <!-- Pagination -->
            <div v-if="!pageState.loading && !pageState.error" class="mt-8">
              <Pagination
                :current-page="currentPage"
                :total-items="pageState.total"
                :items-per-page="itemsPerPage"
                @page-change="handlePageChange"
              />
            </div>
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
    <RulesAmenitiesTabs 
      :show="showModal"
      :selected-rules="filters.selectedRules"
      :selected-amenities="filters.selectedAmenities"
      @close="showModal = false"
      @update:selected-rules="updateSelectedRules"
      @update:selected-amenities="updateSelectedAmenities"
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
import RulesAmenitiesTabs from '~/components/ui/RulesAmenitiesTabs.vue'
import SearchResultsTitle from '~/components/ui/SearchResultsTitle.vue'
import Pagination from '~/components/ui/Pagination.vue'
import ListingsPageSkeleton from '~/components/ui/ListingsPageSkeleton.vue'

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
  goToPage
} = useFilters((appliedFilters) => {
  fetchPageListings({
    page: 1,
    size: 16,
    keyword: route.params.keyword || 'city-tehran',
    cities: appliedFilters.cities,
    types: appliedFilters.types,
    regions: appliedFilters.regions,
    passengerCount: appliedFilters.passengerCount ? Number(appliedFilters.passengerCount) : undefined,
    rooms: appliedFilters.roomsCount ? Number(appliedFilters.roomsCount) : undefined,
    check_in: appliedFilters.check_in || undefined,
    check_out: appliedFilters.check_out || undefined,
    min_price: appliedFilters.minPrice ? parseInt(appliedFilters.minPrice) : undefined,
    max_price: appliedFilters.maxPrice ? parseInt(appliedFilters.maxPrice) : undefined,
    sort: appliedFilters.sortBy,
    selectedRules: appliedFilters.selectedRules,
    selectedAmenities: appliedFilters.selectedAmenities
  })
})

const showFilters = ref(false)
const showModal = ref(false)
const showRulesModal = ref(false)
const showAmenitiesModal = ref(false)
const windowWidth = ref(0)
const itemsPerPage = 16

// Page state
const pageState = ref({
  listings: [],
  loading: true,
  error: null,
  total: 0,
  userFilters: {
    cities: [],
    provinces: [],
    regions: [],
    types: []
  }
})

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
  fetchPageListings()
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
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
  return Math.ceil(pageState.value.total / itemsPerPage)
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
  return pageState.value.listings
})

// Function to handle modal filters
const handleModalFilters = (newFilters) => {
  // Scroll to top immediately
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  
  // Update each filter individually using the composable's updateFilter function
  Object.entries(newFilters).forEach(([key, value]) => {
    if (key in filters.value) {
      updateFilter(key, value)
    }
  })
  // Don't apply filters immediately, wait for the user to click the Apply button
}

// Function to handle applying filters
const onApplyFilters = async () => {
  // Scroll to top immediately
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  
  await handleApplyFilters()
  // Close the filters box on mobile after applying filters
  if (windowWidth.value < 1024) {
    showFilters.value = false
  }
  // Reset to first page and fetch listings with new filters
  goToPage(1)
  await fetchPageListings()
}

// Function to handle clearing filters
const onClearFilters = async () => {
  // Scroll to top immediately
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  
  await handleClearFilters()
  // Reset to first page and fetch listings with cleared filters
  goToPage(1)
  await fetchPageListings()
}

// Function to handle page change
const handlePageChange = async (page) => {
  // Scroll to top immediately
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  
  // Update current page
  currentPage.value = page
  
  // Update URL with new page number
  await router.push({
    query: { ...route.query, page: page.toString() }
  })
  
  // Fetch listings for the new page
  await fetchPageListings()
}

// Watch for filter changes
watch(
  () => ({
    selectedCities: filters.value.cities,
    selectedTypes: filters.value.types,
    selectedRegions: filters.value.regions,
    selectedCapacity: filters.value.passengerCount,
    selectedRooms: filters.value.roomsCount,
    checkInDate: filters.value.check_in,
    checkOutDate: filters.value.check_out,
    priceRange: filters.value.priceRange,
    selectedRules: filters.value.selectedRules,
    selectedAmenities: filters.value.selectedAmenities
  }),
  async (newFilters) => {
    // Reset to first page when filters change
    currentPage.value = 1
    // Update URL with new page number
    await router.push({
      query: { ...route.query, page: '1' }
    })
    await fetchPageListings()
  },
  { deep: true }
)

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

// Add a debounce mechanism to prevent duplicate API calls
const fetchDebounceTimeout = ref(null)

// Fetch listings with page state
const fetchPageListings = async () => {
  // Clear any existing timeout
  if (fetchDebounceTimeout.value) {
    clearTimeout(fetchDebounceTimeout.value)
  }
  
  // Set a new timeout to debounce the API call
  fetchDebounceTimeout.value = setTimeout(async () => {
    try {
      pageState.value.loading = true
      pageState.value.error = null

      // Get current filters
      const currentFilters = filters.value

      // Prepare API parameters
      const apiParams = {
        page: currentPage.value,
        size: itemsPerPage,
        keyword: route.params.keyword,
        cities: currentFilters.cities,
        types: currentFilters.types,
        regions: currentFilters.regions,
        passengerCount: currentFilters.passengerCount ? parseInt(currentFilters.passengerCount) : undefined,
        rooms: currentFilters.roomsCount ? parseInt(currentFilters.roomsCount) : undefined,
        check_in: currentFilters.check_in,
        check_out: currentFilters.check_out,
        min_price: currentFilters.minPrice ? parseInt(currentFilters.minPrice) : undefined,
        max_price: currentFilters.maxPrice ? parseInt(currentFilters.maxPrice) : undefined,
        sort: currentFilters.sortBy,
        selectedRules: currentFilters.selectedRules,
        selectedAmenities: currentFilters.selectedAmenities
      }

      console.log('Fetching page:', currentPage.value, 'with params:', apiParams)

      const data = await $listingsApi.fetchListings(apiParams)

      pageState.value.listings = data.items
      pageState.value.total = data.total
      pageState.value.userFilters = data.userFilters
    } catch (err) {
      console.error('Error fetching listings:', err)
      pageState.value.error = err instanceof Error ? err.message : 'An error occurred while fetching listings'
    } finally {
      pageState.value.loading = false
    }
  }, 100) // 100ms debounce
}

// Add the handler function
const handleFiltersChanged = async (appliedFilters) => {
  // Scroll to top immediately
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  
  await fetchPageListings({
    page: 1,
    size: 16,
    keyword: route.params.keyword || 'city-tehran',
    cities: appliedFilters.cities,
    types: appliedFilters.types,
    regions: appliedFilters.regions,
    passengerCount: appliedFilters.passengerCount ? Number(appliedFilters.passengerCount) : undefined,
    rooms: appliedFilters.roomsCount ? Number(appliedFilters.roomsCount) : undefined,
    check_in: appliedFilters.check_in || undefined,
    check_out: appliedFilters.check_out || undefined,
    min_price: appliedFilters.minPrice ? parseInt(appliedFilters.minPrice) : undefined,
    max_price: appliedFilters.maxPrice ? parseInt(appliedFilters.maxPrice) : undefined,
    sort: appliedFilters.sortBy,
    selectedRules: appliedFilters.selectedRules,
    selectedAmenities: appliedFilters.selectedAmenities
  })
}
</script> 