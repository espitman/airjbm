import { ref, watch, computed, defineEmits } from 'vue'
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

export function useFilters(onFiltersChanged?: (filters: any) => void) {
  const route = useRoute()
  const router = useRouter()
  const { $listingsApi } = useNuxtApp()
  const emit = defineEmits(['filters-changed'])
  
  // Add a flag to skip the route watcher
  const skipRouteWatcher = ref(false)
  const isApplyingFilters = ref(false)
  
  // Pagination state
  const currentPage = ref(parseInt(route.query.page) || 1)

  // Filter state
  const selectedCities = ref([])
  const selectedRegions = ref([])
  const selectedTypes = ref([])
  const priceRange = ref([0, 1000000000])
  const showCityDropdown = ref(false)
  const showRegionDropdown = ref(false)
  const showTypeDropdown = ref(false)
  const citySearch = ref('')
  const highlightedIndex = ref(-1)
  const showDateModal = ref(false)

  // Add selectedAmenities ref
  const selectedAmenities = ref<string[]>([])

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

  // Filter validation
  const validatePassengerCount = (value) => {
    const num = parseInt(value)
    if (isNaN(num) || num < 1) {
      filters.value.passengerCount = '1'
    }
  }

  const validateRoomCount = (value) => {
    const num = parseInt(value)
    if (isNaN(num) || num < 0) {
      filters.value.roomsCount = '0'
    }
  }

  // Filter formatting
  const formatPrice = (value) => {
    return new Intl.NumberFormat('fa-IR').format(value) + ' تومان'
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // City selection
  const filteredCities = computed(() => {
    // Get cities from the API response
    const cities = $listingsApi.userFilters?.value?.cities || []
    
    // Filter based on search text if it exists
    const searchFiltered = citySearch.value
      ? cities.filter(city => 
          city.city_name_fa.includes(citySearch.value) ||
          city.city_name_en.toLowerCase().includes(citySearch.value.toLowerCase())
        )
      : cities
    
    // Sort cities by Persian name
    return searchFiltered.sort((a, b) => {
      return a.city_name_fa.localeCompare(b.city_name_fa, 'fa')
    })
  })

  const isCitySelected = (city) => {
    return selectedCities.value.some(c => c.city_name_en === city.city_name_en)
  }

  const selectCity = (city) => {
    if (!isCitySelected(city)) {
      selectedCities.value.push(city)
      filters.value.cities = selectedCities.value.map(c => c.city_name_en)
    }
    // Clear search text when a city is selected
    citySearch.value = ''
    highlightedIndex.value = -1
  }

  const removeCity = (city) => {
    selectedCities.value = selectedCities.value.filter(c => c.city_name_en !== city.city_name_en)
    filters.value.cities = selectedCities.value.map(c => c.city_name_en)
  }

  // Region selection
  const isRegionSelected = (region) => {
    return selectedRegions.value.includes(region)
  }

  const toggleRegion = (region) => {
    const index = selectedRegions.value.indexOf(region)
    if (index === -1) {
      selectedRegions.value.push(region)
    } else {
      selectedRegions.value.splice(index, 1)
    }
    filters.value.regions = [...selectedRegions.value]
  }

  const removeRegion = (region) => {
    selectedRegions.value = selectedRegions.value.filter(r => r !== region)
    filters.value.regions = [...selectedRegions.value]
  }

  // Type selection
  const isTypeSelected = (type) => {
    return selectedTypes.value.includes(type)
  }

  const toggleType = (type) => {
    const index = selectedTypes.value.indexOf(type)
    if (index === -1) {
      selectedTypes.value.push(type)
    } else {
      selectedTypes.value.splice(index, 1)
    }
    filters.value.types = [...selectedTypes.value]
  }

  const removeType = (type) => {
    selectedTypes.value = selectedTypes.value.filter(t => t !== type)
    filters.value.types = [...selectedTypes.value]
  }

  // Price range handling
  const handlePriceChange = (values) => {
    priceRange.value = values
    filters.value.minPrice = values[0].toString()
    filters.value.maxPrice = values[1].toString()
  }

  // Date handling
  const handleDateUpdate = (dates) => {
    filters.value.check_in = dates.checkin
    filters.value.check_out = dates.checkout
  }

  // Function to update a single filter
  const updateFilter = (key: keyof Filters, value: string | string[], skipCallback = false) => {
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
    
    // Call the callback if provided and not skipped
    if (onFiltersChanged && !skipCallback) {
      onFiltersChanged()
    }
  }

  // Function to scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Function to apply all filters (update URL and return filters for API)
  const applyFilters = async () => {
    // Set the flag to skip the route watcher
    skipRouteWatcher.value = true
    
    // Scroll to top immediately
    scrollToTop()
    
    // Update URL with current filters
    const query = { ...route.query }
    
    // Reset page to 1 when applying filters
    query.page = '1'
    currentPage.value = 1
    
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

    // Update URL with new query
    await router.push({ query })
    
    // Reset the flag
    skipRouteWatcher.value = false
    
    // Return the current filters for API use
    return {
      cities: filters.value.cities,
      types: filters.value.types,
      regions: filters.value.regions,
      passengerCount: filters.value.passengerCount,
      rooms: filters.value.roomsCount,
      check_in: filters.value.check_in,
      check_out: filters.value.check_out,
      min_price: parseInt(filters.value.minPrice) || 0,
      max_price: parseInt(filters.value.maxPrice) || 1000000000,
      sort: filters.value.sortBy,
      selectedRules: filters.value.selectedRules,
      selectedAmenities: filters.value.selectedAmenities
    }
  }

  // Function to handle applying filters
  const handleApplyFilters = async () => {
    isApplyingFilters.value = true
    try {
      await applyFilters()
    } finally {
      isApplyingFilters.value = false
    }
  }

  // Function to handle clearing filters
  const handleClearFilters = async () => {
    // Set the flag to skip the route watcher
    skipRouteWatcher.value = true
    
    // Reset all filters to default values
    filters.value = {
      cities: [],
      types: [],
      regions: [],
      minPrice: '',
      maxPrice: '',
      passengerCount: '',
      roomsCount: '',
      check_in: '',
      check_out: '',
      selectedRules: [],
      selectedAmenities: [],
      sortBy: '',
      priceRange: [0, 1000000],
      bedrooms: [],
      bathrooms: [],
      propertyTypes: [],
      amenities: [],
      moreFilters: {}
    }
    
    // Reset selected arrays
    selectedCities.value = []
    selectedTypes.value = []
    selectedRegions.value = []
    priceRange.value = [0, 1000000000]
    selectedAmenities.value = []
    
    // Reset page to 1
    currentPage.value = 1
    
    // Update URL to remove all filter parameters
    await router.push({ 
      query: { page: '1' }
    })
    
    // Reset the flag
    skipRouteWatcher.value = false
  }

  // Function to go to a specific page
  const goToPage = async (page) => {
    // Set the flag to skip the route watcher
    skipRouteWatcher.value = true
    
    // Scroll to top immediately
    scrollToTop()
    
    // Update current page
    currentPage.value = page
    
    // Update URL with new page number
    await router.push({
      query: { ...route.query, page: page.toString() }
    })
    
    // Reset the flag
    skipRouteWatcher.value = false
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
        sort: currentFilters.sortBy || route.query.sortBy,
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

  // Add hasActiveFilters computed property
  const hasActiveFilters = computed(() => {
    return (
      selectedCities.value.length > 0 ||
      selectedRegions.value.length > 0 ||
      selectedTypes.value.length > 0 ||
      priceRange.value[0] !== 0 ||
      priceRange.value[1] !== 1000000000 ||
      filters.value.passengerCount ||
      filters.value.roomsCount ||
      filters.value.check_in ||
      filters.value.check_out
    )
  })

  // Watch for changes in the route query page parameter
  watch(() => route.query.page, (newPage) => {
    const page = parseInt(newPage || '1')
    if (page > 0 && page !== currentPage.value) {
      currentPage.value = page
      fetchListings(page)
    }
  }, { immediate: true })

  // Watch for changes in filters.types and update selectedTypes
  watch(() => filters.value.types, (newTypes) => {
    if (newTypes && Array.isArray(newTypes) && newTypes.length > 0) {
      selectedTypes.value = newTypes
    } else {
      selectedTypes.value = []
    }
  }, { immediate: true })

  // Add clearFilters function
  const clearFilters = () => {
    handleClearFilters()
  }

  // Add the handleMobileSortSelect function
  const handleMobileSortSelect = async (value: string) => {
    // Update the sort value in filters
    filters.value.sortBy = value
    
    // Scroll to top immediately
    scrollToTop()
    
    // Update the URL with the correct parameter name 'sortBy'
    const query = { ...route.query, sortBy: value, page: '1' }
    await router.replace({ query })
    
    // Reset to page 1
    currentPage.value = 1
    
    // Apply filters to get the updated filters
    const appliedFilters = await applyFilters()
    
    // Call the callback if provided
    if (onFiltersChanged) {
      onFiltersChanged(appliedFilters)
    }
  }

  const handleSortChange = async () => {
    // Scroll to top immediately
    scrollToTop()
    
    // Apply filters to URL and get the updated filters
    const appliedFilters = await applyFilters()
    
    // Update the URL to include page=1
    const query = { ...route.query, page: '1' }
    await router.push({ query })
    
    // Reset to page 1
    currentPage.value = 1
    
    // Call the callback if provided
    if (onFiltersChanged) {
      onFiltersChanged(appliedFilters)
    }
  }

  return {
    filters,
    isApplyingFilters,
    currentPage,
    selectedCities,
    selectedRegions,
    selectedTypes,
    selectedAmenities,
    priceRange,
    showCityDropdown,
    showRegionDropdown,
    showTypeDropdown,
    citySearch,
    highlightedIndex,
    showDateModal,
    updateFilter,
    applyFilters,
    handleApplyFilters,
    handleClearFilters,
    hasActiveFilters,
    fetchListings,
    goToPage,
    validatePassengerCount,
    validateRoomCount,
    formatPrice,
    formatDate,
    filteredCities,
    isCitySelected,
    selectCity,
    removeCity,
    isRegionSelected,
    toggleRegion,
    removeRegion,
    isTypeSelected,
    toggleType,
    removeType,
    handlePriceChange,
    handleDateUpdate,
    clearFilters,
    handleMobileSortSelect,
    handleSortChange
  }
} 