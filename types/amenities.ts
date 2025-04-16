export interface AmenityItem {
  title: {
    fa: string
    en: string
  }
  icon: {
    url: string
  }
  state: boolean
  items: string[]
}

export interface AmenityCategory {
  title: {
    en: string
    fa: string
  }
  items: AmenityItem[]
}

export interface AmenitiesResponse {
  result: {
    amenities: AmenityCategory[]
  }
  targetUrl: string | null
  success: boolean
  error: string | null
  unauthorizedRequest: boolean
  __wrapped: boolean
  __traceId: string | null
} 