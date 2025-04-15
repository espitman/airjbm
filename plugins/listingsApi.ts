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

interface UserFiltersPrices {
  days_min_price: number
  days_max_price: number
  days_avg_price: number
  total_min_price: number | null
  total_max_price: number | null
}

interface ListingsResponse {
  items: Listing[]
  total: number
  userFilters: UserFilters
  userFiltersPrices: UserFiltersPrices
}

interface FetchListingsParams {
  page?: number
  size?: number
  keyword: string
  cities?: string[]
  types?: string[]
  regions?: string[]
  passengerCount?: number
  rooms?: number
  check_in?: string
  check_out?: string
  min_price?: number
  max_price?: number
  sort?: string
  rules?: string[]
  selectedAmenities?: string[]
}

const convertPriceToRials = (price: number) => price * 10

export default defineNuxtPlugin(() => {
  const fetchListings = async ({ 
    page = 1, 
    size = 10, 
    keyword, 
    cities = [], 
    types = [], 
    regions = [], 
    passengerCount, 
    rooms,
    check_in,
    check_out,
    min_price,
    max_price,
    sort,
    rules = [],
    selectedAmenities = []
  }: FetchListingsParams): Promise<ListingsResponse> => {
    const url = `https://jayaber.liara.run/gw.jabama.com/api/taraaz/v1/search/merchandising/plp/${keyword}`

    const [sortParam, orderParam = 'desc'] = sort?.includes('-') ? sort.split('-') : [sort, 'desc']

    const requestBody = {
      page,
      size,
      keyword,
      cities,
      types,
      regions,
      ...(passengerCount && { capacity: passengerCount }),
      ...(rooms && { rooms }),
      ...(check_in && { check_in }),
      ...(check_out && { check_out }),
      ...(min_price && { min_price: convertPriceToRials(min_price) }),
      ...(max_price && { max_price: convertPriceToRials(max_price) }),
      ...(sortParam && { sort: sortParam }),
      ...(orderParam && { order: orderParam }),
      ...(rules.length > 0 && { rules }),
      ...(selectedAmenities.length > 0 && { amenities: selectedAmenities })
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid response format: items array not found')
    }
    return data
  }

  return {
    provide: {
      listingsApi: {
        fetchListings
      }
    }
  }
}) 