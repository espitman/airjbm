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
            v-model:filters="filters"
            :user-filters="$listingsApi.userFilters.value"
            :show-rules-modal="showRulesModal"
            :show-amenities-modal="showAmenitiesModal"
            @close="hideFilters"
            @apply-filters="updateFiltersInUrl"
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

          <!-- Listings Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListingCard 
              v-for="listing in paginatedListings" 
              :key="listing.id" 
              :listing="listing" 
            />
          </div>
          
          <!-- Pagination -->
          <div v-if="!$listingsApi.loading.value && !$listingsApi.error.value" class="mt-8 flex justify-center">
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
import Filters from '~/components/ui/Filters.vue'
import FilterModals from '~/components/ui/FilterModals.vue'
import ListingCard from '~/components/ui/ListingCard.vue'
import RulesAmenitiesModal from '~/components/ui/RulesAmenitiesModal.vue'

const route = useRoute()
const router = useRouter()
const { $listingsApi } = useNuxtApp()

const showFilters = ref(true)
const showModal = ref(false)
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
  $listingsApi.fetchListings({ page, size: itemsPerPage, keyword: keyword.value })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const toggleFilters = () => {
  showFilters.value = !showFilters.value
  console.log('Toggling filters:', showFilters.value)
}

const hideFilters = () => {
  console.log('Hiding filters')
  showFilters.value = false
}

const filters = ref({
  search: '',
  city: '',
  type: '',
  minPrice: '',
  maxPrice: '',
  passengerCount: '',
  roomsCount: '',
  region: '',
  checkinDate: '',
  checkoutDate: '',
  selectedRules: [],
  selectedAmenities: [],
  sortBy: 'price-asc'
})

// Remove the localListings array and use API results directly
const filteredListings = computed(() => {
  // If we have filters applied, we need to filter the API results
  const hasFilters = 
    filters.value.search || 
    filters.value.city || 
    filters.value.type || 
    filters.value.minPrice || 
    filters.value.maxPrice || 
    filters.value.passengerCount || 
    filters.value.roomsCount || 
    filters.value.region || 
    filters.value.checkinDate || 
    filters.value.checkoutDate || 
    filters.value.selectedRules.length > 0 || 
    filters.value.selectedAmenities.length > 0 || 
    filters.value.sortBy !== 'price-asc'
  
  // If no filters are applied, just return the API results
  if (!hasFilters) {
    return $listingsApi.listings.value
  }
  
  // Otherwise, apply filters to the API results
  let result = [...$listingsApi.listings.value]

  // Apply search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    result = result.filter(listing => 
      listing.title.toLowerCase().includes(searchTerm) ||
      listing.location.toLowerCase().includes(searchTerm)
    )
  }

  // Apply city filter
  if (filters.value.city) {
    result = result.filter(listing => listing.city === filters.value.city)
  }

  // Apply type filter
  if (filters.value.type) {
    result = result.filter(listing => listing.type === filters.value.type)
  }

  // Apply price range filter
  if (filters.value.minPrice) {
    result = result.filter(listing => listing.price >= Number(filters.value.minPrice))
  }
  if (filters.value.maxPrice) {
    result = result.filter(listing => listing.price <= Number(filters.value.maxPrice))
  }

  // Apply passenger count filter
  if (filters.value.passengerCount) {
    result = result.filter(listing => 
      listing.capacity.base + listing.capacity.extra >= Number(filters.value.passengerCount)
    )
  }

  // Apply rooms count filter
  if (filters.value.roomsCount) {
    result = result.filter(listing => listing.rooms >= Number(filters.value.roomsCount))
  }

  // Apply region filter
  if (filters.value.region) {
    result = result.filter(listing => listing.region === filters.value.region)
  }

  // Apply check-in date filter
  if (filters.value.checkinDate) {
    result = result.filter(listing => listing.checkinDate >= filters.value.checkinDate)
  }

  // Apply check-out date filter
  if (filters.value.checkoutDate) {
    result = result.filter(listing => listing.checkoutDate <= filters.value.checkoutDate)
  }

  // Apply rules filter
  if (filters.value.selectedRules.length > 0) {
    result = result.filter(listing => 
      filters.value.selectedRules.every(rule => listing.rules.includes(rule))
    )
  }

  // Apply amenities filter
  if (filters.value.selectedAmenities.length > 0) {
    result = result.filter(listing => 
      filters.value.selectedAmenities.every(amenity => listing.amenities.includes(amenity))
    )
  }

  // Apply sorting
  switch (filters.value.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'rating-asc':
      result.sort((a, b) => a.rating - b.rating)
      break
  }

  return result
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil($listingsApi.total.value / itemsPerPage)
})

// Calculate which page numbers to display
const displayedPages = computed(() => {
  const pages = []
  const maxDisplayed = 5 // Maximum number of page buttons to show
  
  if (totalPages.value <= maxDisplayed) {
    // If total pages is less than max displayed, show all pages
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // Calculate the range of pages to show around the current page
    let start = Math.max(1, currentPage.value - Math.floor(maxDisplayed / 2))
    let end = Math.min(totalPages.value, start + maxDisplayed - 1)
    
    // Adjust start if we're near the end
    if (end === totalPages.value) {
      start = Math.max(1, end - maxDisplayed + 1)
    }
    
    // Add pages to the array
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// Use the API results directly for pagination
const paginatedListings = computed(() => {
  // The API already returns the correct page of results, so we don't need to slice
  return $listingsApi.listings.value
})

// Reset to first page when filters change
watch(filters, () => {
  currentPage.value = 1
}, { deep: true })

// Function to update page in URL
const updatePageQuery = (page) => {
  setTimeout(() => {
    console.log('Updating page in URL:', page)
    router.push({
      query: {
      ...route.query,
      page: page > 1 ? page : undefined
      }
    })
  }, 10)
}

// Watch for route query changes to update filters
watch(() => route.query, (newQuery) => {
  // Update filters from query parameters
  if (newQuery.search !== undefined) filters.value.search = newQuery.search
  if (newQuery.city !== undefined) filters.value.city = newQuery.city
  if (newQuery.type !== undefined) filters.value.type = newQuery.type
  if (newQuery.minPrice !== undefined) filters.value.minPrice = newQuery.minPrice
  if (newQuery.maxPrice !== undefined) filters.value.maxPrice = newQuery.maxPrice
  if (newQuery.passengerCount !== undefined) filters.value.passengerCount = newQuery.passengerCount
  if (newQuery.roomsCount !== undefined) filters.value.roomsCount = newQuery.roomsCount
  if (newQuery.region !== undefined) filters.value.region = newQuery.region
  if (newQuery.checkinDate !== undefined) filters.value.checkinDate = newQuery.checkinDate
  if (newQuery.checkoutDate !== undefined) filters.value.checkoutDate = newQuery.checkoutDate
  if (newQuery.selectedRules !== undefined) filters.value.selectedRules = newQuery.selectedRules.split(',')
  if (newQuery.selectedAmenities !== undefined) filters.value.selectedAmenities = newQuery.selectedAmenities.split(',')
  if (newQuery.sortBy !== undefined) filters.value.sortBy = newQuery.sortBy
  
  // Fetch listings when page parameter changes
  if (newQuery.page !== undefined) {
    const page = parseInt(newQuery.page)
    if (page > 0) {
      // Fetch new listings for the page from URL
      $listingsApi.fetchListings({ 
        page, 
        size: itemsPerPage, 
        keyword: keyword.value 
      })
    }
  }
}, { deep: true })

// Watch for route parameter changes to update keyword
watch(() => route.params.keyword, (newKeyword) => {
  if (newKeyword) {
    // Reset to first page when keyword changes
    currentPage.value = 1
    
    // Fetch listings with the new keyword
    $listingsApi.fetchListings({ 
      page: 1, 
      size: itemsPerPage, 
      keyword: newKeyword 
    })
  }
})

// Update pagination navigation to use the new currentPage setter
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    
    // Fetch new listings for the selected page
    $listingsApi.fetchListings({ 
      page, 
      size: itemsPerPage, 
      keyword: keyword.value 
    })
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Function to update filters in URL
const updateFiltersInUrl = () => {
  const query = { ...route.query }
  
  // Only include non-empty filters in the URL
  if (filters.value.search) query.search = filters.value.search
  else delete query.search
  
  if (filters.value.city) query.city = filters.value.city
  else delete query.city
  
  if (filters.value.type) query.type = filters.value.type
  else delete query.type
  
  if (filters.value.minPrice) query.minPrice = filters.value.minPrice
  else delete query.minPrice
  
  if (filters.value.maxPrice) query.maxPrice = filters.value.maxPrice
  else delete query.maxPrice
  
  if (filters.value.passengerCount) query.passengerCount = filters.value.passengerCount
  else delete query.passengerCount
  
  if (filters.value.roomsCount) query.roomsCount = filters.value.roomsCount
  else delete query.roomsCount
  
  if (filters.value.region) query.region = filters.value.region
  else delete query.region
  
  if (filters.value.checkinDate) query.checkinDate = filters.value.checkinDate
  else delete query.checkinDate
  
  if (filters.value.checkoutDate) query.checkoutDate = filters.value.checkoutDate
  else delete query.checkoutDate
  
  if (filters.value.selectedRules.length > 0) query.selectedRules = filters.value.selectedRules.join(',')
  else delete query.selectedRules
  
  if (filters.value.selectedAmenities.length > 0) query.selectedAmenities = filters.value.selectedAmenities.join(',')
  else delete query.selectedAmenities
  
  if (filters.value.sortBy !== 'price-asc') query.sortBy = filters.value.sortBy
  else delete query.sortBy
  
  // Reset to first page when filters change
  query.page = undefined
  
  router.push({ query })
}

// Function to handle modal filters
const handleModalFilters = (newFilters) => {
  filters.value = { ...newFilters }
  updateFiltersInUrl()
}

// Function to handle modal apply filters
const handleModalApplyFilters = () => {
  updateFiltersInUrl()
}

// Function to update selected rules
const updateSelectedRules = (rules) => {
  filters.value.selectedRules = rules
}

// Function to update selected amenities
const updateSelectedAmenities = (amenities) => {
  filters.value.selectedAmenities = amenities
}

// Initialize filters from URL query parameters
onMounted(() => {
  const query = route.query
  if (query.search) filters.value.search = query.search
  if (query.city) filters.value.city = query.city
  if (query.type) filters.value.type = query.type
  if (query.minPrice) filters.value.minPrice = query.minPrice
  if (query.maxPrice) filters.value.maxPrice = query.maxPrice
  if (query.passengerCount) filters.value.passengerCount = query.passengerCount
  if (query.roomsCount) filters.value.roomsCount = query.roomsCount
  if (query.locationType) filters.value.locationType = query.locationType
  if (query.checkinDate) filters.value.checkinDate = query.checkinDate
  if (query.checkoutDate) filters.value.checkoutDate = query.checkoutDate
  if (query.selectedRules) filters.value.selectedRules = query.selectedRules.split(',')
  if (query.selectedAmenities) filters.value.selectedAmenities = query.selectedAmenities.split(',')
  if (query.sortBy) filters.value.sortBy = query.sortBy
})
</script> 