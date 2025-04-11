import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LocationQueryValue } from 'vue-router'

export interface Filters {
  cities: string[]
  types: string[]
  regions: string[]
}

// Helper function to safely convert query values to string array
function queryToArray(value: LocationQueryValue | LocationQueryValue[] | null | undefined): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string')
  }
  return [value]
}

export function useFilters() {
  const route = useRoute()
  const router = useRouter()
  
  // Initialize filters from URL or empty arrays
  const filters = ref<Filters>({
    cities: queryToArray(route.query.cities),
    types: queryToArray(route.query.types),
    regions: queryToArray(route.query.regions)
  })

  // Function to update a single filter
  const updateFilter = (key: keyof Filters, value: string[]) => {
    // Create a new filters object with all existing values
    const updatedFilters = { ...filters.value }
    // Update only the specified key
    updatedFilters[key] = value
    // Assign the entire object back to filters.value
    filters.value = updatedFilters
  }

  // Function to apply all filters (update URL and return filters for API)
  const applyFilters = () => {
    // Update URL with current filters
    const query = { ...route.query }
    
    // Only include non-empty arrays in the URL
    if (filters.value.cities.length > 0) {
      query.cities = filters.value.cities
    } else {
      delete query.cities
    }
    
    if (filters.value.types.length > 0) {
      query.types = filters.value.types
    } else {
      delete query.types
    }
    
    if (filters.value.regions.length > 0) {
      query.regions = filters.value.regions
    } else {
      delete query.regions
    }
    
    // Update URL without triggering navigation
    router.replace({ query })
    
    // Return filters for API call
    return filters.value
  }

  // Watch for URL changes to update filters
  watch(() => route.query, (newQuery) => {
    // Create a new filters object with all existing values
    const updatedFilters = { ...filters.value }
    
    // Update only the specified keys
    updatedFilters.cities = queryToArray(newQuery.cities)
    updatedFilters.types = queryToArray(newQuery.types)
    updatedFilters.regions = queryToArray(newQuery.regions)
    
    // Assign the entire object back to filters.value
    filters.value = updatedFilters
  }, { immediate: true })

  return {
    filters,
    updateFilter,
    applyFilters
  }
} 