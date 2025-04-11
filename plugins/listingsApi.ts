import { ref } from 'vue'
import { defineNuxtPlugin } from 'nuxt/app'

export interface Listing {
  id: number
  title: string
  image: string
  location: string
  city: string
  type: string
  price: number
  categories: string[]
  rating: number
  rooms: number
  capacity: {
    base: number
    extra: number
  }
  comments: number
  locationType: string
  rules: string[]
  amenities: string[]
  checkinDate: string
  checkoutDate: string
}

interface City {
  city_name_fa: string
  city_name_en: string
  province_name_fa: string
  province_name_en: string
  count: number
}

interface UserFilters {
  cities: City[]
  provinces: string[]
  regions: string[]
  types: string[]
}

interface ListingsResponse {
  items: Listing[]
  total: number
  userFilters: UserFilters
}

interface FetchListingsParams {
  page: number
  size: number
  keyword: string
  cities?: string[]
  type?: string
  region?: string
}

export default defineNuxtPlugin(() => {
  const state = {
    listings: ref<Listing[]>([]),
    loading: ref(true),
    error: ref<string | null>(null),
    total: ref(0),
    userFilters: ref<UserFilters>({
      cities: [],
      provinces: [],
      regions: [],
      types: []
    })
  }

  const fetchListings = async ({ page, size, keyword, cities = [], type = '', region = '' }: FetchListingsParams) => {
    try {
      state.loading.value = true
      state.error.value = null

      const url = `https://jayaber.liara.run/search/${keyword}`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({ page, size, cities, type, region })
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch listings: ${response.status} ${response.statusText}`)
      }

      const data: ListingsResponse = await response.json()
      
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid response format: items array not found')
      }

      state.listings.value = data.items
      state.total.value = data.total
      
      // Set userFilters from the API response
      if (data.userFilters) {
        state.userFilters.value = data.userFilters
      }
    } catch (err) {
      console.error('Error fetching listings:', err)
      state.error.value = err instanceof Error ? err.message : 'An error occurred while fetching listings'
    } finally {
      state.loading.value = false
    }
  }

  return {
    provide: {
      listingsApi: {
        ...state,
        fetchListings
      }
    }
  }
}) 