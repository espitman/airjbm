import { ref } from 'vue'
import { defineNuxtPlugin } from 'nuxt/app'

export interface Listing {
  code: number
  id: string
  title: string
  images: string[]
  rate_score: number
  rate_count: number
  rooms_count: number
  capacity: {
    base: number
    extra: number
  }
  city: string
  city_fa: string
  province: string
  province_fa: string
  region: string
  reservation_type: string
  badges: any
  unit_count: number
  type: string
  place_type: string
  price_not_checkin_based: {
    min_price: number
    max_price: number
    max_discount_percentage: number
  }
  price_checkin_based: any
  tags: string[]
  min_night: number
}

export interface ListingsResponse {
  items: Listing[]
  userFilters: {
    cities: Array<{
      city_name_fa: string
      city_name_en: string
      province_name_fa: string
      province_name_en: string
      count: number
    }>
    provinces: string[]
    regions: string[]
    types: string[]
  }
  userFiltersPrices: {
    days_min_price: number
    days_max_price: number
    days_avg_price: number
    total_min_price: number | null
    total_max_price: number | null
  }
  total: number
  countDefault: number
  responseTime: number
}

interface FetchListingsParams {
  page: number
  size: number
  keyword: string
}

export default defineNuxtPlugin(() => {
  const listings = ref<Listing[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const total = ref(0)

  const fetchListings = async ({ page, size, keyword }: FetchListingsParams) => {
    try {
      loading.value = true
      error.value = null

      const url = `https://jayaber.liara.run/search/${keyword}`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({ page, size })
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch listings: ${response.status} ${response.statusText}`)
      }

      const data: ListingsResponse = await response.json()
      
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid response format: items array not found')
      }

      listings.value = data.items
      total.value = data.total
    } catch (err) {
      console.error('Error fetching listings:', err)
      error.value = err instanceof Error ? err.message : 'An error occurred while fetching listings'
    } finally {
      loading.value = false
    }
  }

  return {
    provide: {
      listingsApi: () => ({
        listings,
        loading,
        error,
        total,
        fetchListings
      })
    }
  }
}) 