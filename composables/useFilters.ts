import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LocationQueryValue } from 'vue-router'

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
  
  // Add a flag to skip the route watcher
  const skipRouteWatcher = ref(false)
  
  // Initialize filters from URL or empty values
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
    sortBy: queryToString(route.query.sortBy)
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

  return {
    filters,
    updateFilter,
    applyFilters
  }
} 