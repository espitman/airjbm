import { defineNuxtPlugin } from 'nuxt/app'
import moment from 'moment-jalaali'

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
        },

        // Convert Gregorian date to Jalali using moment-jalaali
        gregorianToJalali: (gy: number, gm: number, gd: number) => {
          const m = moment(`${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`, 'YYYY-MM-DD');
          return {
            jy: m.jYear(),
            jm: m.jMonth() + 1, // moment-jalaali months are 0-based
            jd: m.jDate()
          };
        },

        // Format a date string from Gregorian to Jalali
        formatDateToJalali: (dateString: string): string => {
          if (!dateString) return '';
          
          try {
            // Check if the date string is valid
            if (!dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
              return dateString;
            }
            
            const m = moment(dateString, 'YYYY-MM-DD');
            if (!m.isValid()) {
              return dateString;
            }
            
            // Format with leading zeros for month and day
            const jYear = m.jYear();
            const jMonth = (m.jMonth() + 1).toString().padStart(2, '0');
            const jDay = m.jDate().toString().padStart(2, '0');
            
            return `${jYear}/${jMonth}/${jDay}`;
          } catch (error) {
            console.error('Error converting date:', error);
            return dateString;
          }
        },

        // Convert Jalali to Gregorian
        jalaliToGregorian: (jy: number, jm: number, jd: number): string => {
          try {
            const m = moment(`${jy}/${jm}/${jd}`, 'jYYYY/jM/jD');
            return m.format('YYYY-MM-DD');
          } catch (error) {
            console.error('Error converting Jalali to Gregorian:', error);
            return '';
          }
        }
      }
    }
  }
}) 