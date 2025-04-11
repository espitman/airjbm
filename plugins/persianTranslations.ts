import { defineNuxtPlugin } from 'nuxt/app'

// Map of English type names to Persian
const typeMap = {
  'apartment': 'آپارتمان',
  'villa': 'ویلا',
  'carvansara': 'کاروانسرا',
  'cottage': 'کلبه',
  'hostel': 'هاستل',
  'complex': 'مجتمع اقامتگاهی',
  'suite': 'سوئیت',
  'traditional': 'سنتی',
  'ecotourism': 'بوم گردی',
  'inn': 'مسافرخانه'
}

// Map of English region names to Persian
const regionMap = {
  'coastal': 'ساحلی',
  'rustic': 'روستایی',
  'urban': 'شهری',
  'forest': 'جنگلی',
  'mountainous': 'کوهستانی',
  'desert': 'بیابانی',
  'jungle': 'جنگلی',
  'city': 'شهری'
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      persianTranslations: {
        // Get Persian name for a type
        getPersianTypeName: (type: string | null | undefined, categories?: string[], tags?: string[]): string => {
          // First check if we have a direct type match
          if (type && typeMap[type.toLowerCase()]) {
            return typeMap[type.toLowerCase()]
          }
          
          // Then check if type is in categories
          if (categories && categories.length > 0) {
            for (const category of categories) {
              const lowerCategory = category.toLowerCase()
              if (typeMap[lowerCategory]) {
                return typeMap[lowerCategory]
              }
            }
          }
          
          // Then check if type is in tags
          if (tags && tags.length > 0) {
            for (const tag of tags) {
              const lowerTag = tag.toLowerCase()
              if (typeMap[lowerTag]) {
                return typeMap[lowerTag]
              }
            }
          }
          
          // Fallback
          return 'اقامتگاه'
        },
        
        // Get Persian name for a region
        getPersianRegionName: (region: string | null | undefined): string => {
          if (region && regionMap[region.toLowerCase()]) {
            return regionMap[region.toLowerCase()]
          }
          return region || 'نامشخص'
        },
        
        // Get all available types
        getAllTypes: (): { value: string, label: string }[] => {
          return Object.entries(typeMap).map(([value, label]) => ({
            value,
            label
          }))
        },
        
        // Get all available regions
        getAllRegions: (): { value: string, label: string }[] => {
          return Object.entries(regionMap).map(([value, label]) => ({
            value,
            label
          }))
        }
      }
    }
  }
}) 