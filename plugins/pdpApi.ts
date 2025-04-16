import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { AccommodationData } from '../types/accommodation'
import { AmenitiesResponse } from '../types/amenities'

export interface PdpApi {
  fetchAccommodationByCode: (code: string) => Promise<AccommodationData>
  getAllAmenities: (accommodationId: string) => Promise<AmenitiesResponse>
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
  
  const getAllAmenities = async (accommodationId: string): Promise<AmenitiesResponse> => {
    try {
      const response = await fetch(
        `${baseURL}/accommodation/public/guest/accommodations/amenities/${accommodationId}`,
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
      console.error('Error fetching amenities data:', error)
      throw error
    }
  }
  
  return {
    provide: {
      pdpApi: {
        fetchAccommodationByCode,
        getAllAmenities
      } as PdpApi
    }
  }
}) 