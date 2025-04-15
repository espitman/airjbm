import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export interface AccommodationData {
  id: number
  code: string
  title: string
  description: string
  images: string[]
  price: number
  location: string
  city_fa: string
  province_fa: string
  capacity: {
    base: number
    extra: number
  }
  rooms: number
  rate_score: number
  rate_count: number
  type: string
  categories: string[]
  tags: string[]
  amenities: string[]
  rules: string[]
  panoramic: any[]
  periods: any[]
  // Add more properties as needed based on the API response
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const baseURL = 'https://jayaber.liara.run/gw.jabama.com/api/v1'
  
  const fetchAccommodationByCode = async (code: string): Promise<AccommodationData> => {
    try {
      const response = await fetch(
        `${baseURL}/accommodations/${code}?reversePeriods=true&withPanoramic=true`,
        {
          headers: {
            'Accept': 'application/json, text/plain, */*'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching accommodation data:', error)
      throw error
    }
  }
  
  return {
    provide: {
      pdpApi: {
        fetchAccommodationByCode
      }
    }
  }
}) 