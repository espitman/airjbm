import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LocationQueryValue } from 'vue-router'
import { useNuxtApp } from '#app'

export interface Filters {
  cities: string[]
  types: string[]
  regions: string[]
  minPrice: string
  maxPrice: string
  passengerCount: string
  roomsCount: string
  check_in: string
  check_out: string
  selectedRules: string[]
  selectedAmenities: string[]
  sortBy: string
  priceRange: number[]
  bedrooms: string[]
  bathrooms: string[]
  propertyTypes: string[]
  amenities: string[]
  moreFilters: any
}

// Helper function to safely convert query values to string array
function queryToArray(value: LocationQueryValue | LocationQueryValue[] | null | undefined): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string')
  }
  if (typeof value === 'string') {
    return value.split(',').filter(Boolean)
  }
  return [value].filter(Boolean)
}

// Helper function to safely convert query value to string
function queryToString(value: LocationQueryValue | LocationQueryValue[] | null | undefined): string {
  if (!value) return ''
  if (Array.isArray(value)) {
    return value[0] || ''
  }
  return value
}

export function useFilters() {
  const route = useRoute()
  const router = useRouter()
  const { $listingsApi } = useNuxtApp()
  
  // Add a flag to skip the route watcher
  const skipRouteWatcher = ref(false)
  const isApplyingFilters = ref(false)
  
  // Pagination state
  const currentPage = computed({
    get: () => {
      const page = parseInt(route.query.page) || 1
      return page > 0 ? page : 1
    },
    set: (value) => {
      updatePageQuery(value)
    }
  })

  // Initialize filters from URL or defaults
  const filters = ref<Filters>({
    cities: queryToArray(route.query.cities),
    types: queryToArray(route.query.types),
    regions: queryToArray(route.query.regions),
    minPrice: queryToString(route.query.minPrice),
    maxPrice: queryToString(route.query.maxPrice),
    passengerCount: queryToString(route.query.passengerCount),
    roomsCount: queryToString(route.query.roomsCount),
    check_in: queryToString(route.query.check_in),
    check_out: queryToString(route.query.check_out),
    selectedRules: queryToArray(route.query.selectedRules?.toString().split(',')),
    selectedAmenities: queryToArray(route.query.selectedAmenities?.toString().split(',')),
    sortBy: queryToString(route.query.sortBy),
    priceRange: route.query.priceRange 
      ? route.query.priceRange.split(',').map(Number)
      : [0, 1000000],
    bedrooms: route.query.bedrooms 
      ? route.query.bedrooms.split(',')
      : [],
    bathrooms: route.query.bathrooms 
      ? route.query.bathrooms.split(',')
      : [],
    propertyTypes: route.query.propertyTypes 
      ? route.query.propertyTypes.split(',')
      : [],
    amenities: route.query.amenities 
      ? route.query.amenities.split(',')
      : [],
    moreFilters: route.query.moreFilters 
      ? JSON.parse(route.query.moreFilters as string)
      : {}
  })

  // Function to update a single filter
  const updateFilter = (key: keyof Filters, value: string | string[]) => {
    // Create a new filters object with all existing values
    const updatedFilters = { ...filters.value }
    
    // Update only the specified key
    if (Array.isArray(value)) {
      if (key === 'cities' || key === 'types' || key === 'regions' || key === 'selectedRules' || key === 'selectedAmenities') {
        updatedFilters[key] = value
      }
    } else {
      if (key === 'minPrice' || key === 'maxPrice' || key === 'passengerCount' || key === 'roomsCount' || 
          key === 'check_in' || key === 'check_out' || key === 'sortBy') {
        updatedFilters[key] = value
      }
    }
    
    // Assign the entire object back to filters.value
    filters.value = updatedFilters
  }

  // Function to apply all filters (update URL and return filters for API)
  const applyFilters = async () => {
    // Set the flag to skip the route watcher
    skipRouteWatcher.value = true
    
    // Update URL with current filters
    const query = { ...route.query }
    
    // Handle array filters
    if (filters.value.cities.length > 0) {
      query.cities = filters.value.cities.join(',')
    } else {
      delete query.cities
    }
    
    if (filters.value.types.length > 0) {
      query.types = filters.value.types.join(',')
    } else {
      delete query.types
    }
    
    if (filters.value.regions.length > 0) {
      query.regions = filters.value.regions.join(',')
    } else {
      delete query.regions
    }

    // Handle string filters
    if (filters.value.minPrice) {
      query.minPrice = filters.value.minPrice
    } else {
      delete query.minPrice
    }

    if (filters.value.maxPrice) {
      query.maxPrice = filters.value.maxPrice
    } else {
      delete query.maxPrice
    }

    if (filters.value.passengerCount) {
      query.passengerCount = filters.value.passengerCount
    } else {
      delete query.passengerCount
    }

    if (filters.value.roomsCount) {
      query.roomsCount = filters.value.roomsCount
    } else {
      delete query.roomsCount
    }

    if (filters.value.check_in) {
      query.check_in = filters.value.check_in
    } else {
      delete query.check_in
    }

    if (filters.value.check_out) {
      query.check_out = filters.value.check_out
    } else {
      delete query.check_out
    }

    if (filters.value.sortBy) {
      query.sortBy = filters.value.sortBy
    } else {
      delete query.sortBy
    }

    // Handle array filters that need to be joined
    if (filters.value.selectedRules.length > 0) {
      query.selectedRules = filters.value.selectedRules.join(',')
    } else {
      delete query.selectedRules
    }

    if (filters.value.selectedAmenities.length > 0) {
      query.selectedAmenities = filters.value.selectedAmenities.join(',')
    } else {
      delete query.selectedAmenities
    }
    
    // Update URL without triggering navigation and wait for it to complete
    await router.replace({ query })
    
    // Reset the flag after a short delay
    setTimeout(() => {
      skipRouteWatcher.value = false
    }, 100)
    
    // Return filters for API call
    return filters.value
  }

  // Watch for URL changes to update filters
  watch(() => route.query, (newQuery) => {
    // Skip if the flag is set
    if (skipRouteWatcher.value) return
    
    // Create a new filters object with all existing values
    const updatedFilters = { ...filters.value }
    
    // Update all filters from URL
    updatedFilters.cities = queryToArray(newQuery.cities)
    updatedFilters.types = queryToArray(newQuery.types)
    updatedFilters.regions = queryToArray(newQuery.regions)
    updatedFilters.minPrice = queryToString(newQuery.minPrice)
    updatedFilters.maxPrice = queryToString(newQuery.maxPrice)
    updatedFilters.passengerCount = queryToString(newQuery.passengerCount)
    updatedFilters.roomsCount = queryToString(newQuery.roomsCount)
    updatedFilters.check_in = queryToString(newQuery.check_in)
    updatedFilters.check_out = queryToString(newQuery.check_out)
    updatedFilters.selectedRules = queryToArray(newQuery.selectedRules)
    updatedFilters.selectedAmenities = queryToArray(newQuery.selectedAmenities)
    updatedFilters.sortBy = queryToString(newQuery.sortBy)
    
    // Assign the entire object back to filters.value
    filters.value = updatedFilters
  }, { immediate: true })

  // Function to fetch listings
  const fetchListings = async (page: number, currentFilters = filters.value) => {
    try {
      // Show loading state
      $listingsApi.loading.value = true
      
      // Fetch listings with the current page and filters
      await $listingsApi.fetchListings({ 
        page, 
        size: 16, // itemsPerPage
        keyword: route.params.keyword || 'city-tehran',
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

  // Handle applying filters
  const handleApplyFilters = async () => {
    // Set the flag to indicate we're applying filters
    isApplyingFilters.value = true
    
    // Apply filters to URL and get the updated filters
    const appliedFilters = await applyFilters()
    
    // Reset to page 1 and fetch new listings
    await fetchListings(1, appliedFilters)
    
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Reset the flag after a short delay
    setTimeout(() => {
      isApplyingFilters.value = false
    }, 100)
  }

  // Handle clearing all filters
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
    
    // Reset to page 1 and fetch new listings
    await fetchListings(1)
    
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Reset the flag after a short delay
    setTimeout(() => {
      isApplyingFilters.value = false
    }, 100)
  }

  // Function to update page in URL and fetch listings
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

  // Function to go to a specific page
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

  return {
    filters,
    isApplyingFilters,
    currentPage,
    updateFilter,
    applyFilters,
    handleApplyFilters,
    handleClearFilters,
    fetchListings,
    updatePageQuery,
    goToPage
  }
} 