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

// Map of rule keys to their Persian translations
const ruleMap = {
  'children': 'کودکان',
  'events': 'مراسم',
  'pets': 'حیوانات خانگی',
  'smoke': 'سیگار',
  '24h_reception': 'پذیرش ۲۴ ساعته',
  'single_persons': 'گروه‌های مجردی',
  'melli_card': 'کارت ملی',
  'ceremony': 'میهمانی'
}

// Persian numbers mapping
const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

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
          const m = moment(dateString);
          return m.format('jYYYY/jMM/jDD');
        },

        // Convert numbers to Persian
        convertToPersian: (value: string | null | undefined): string => {
          if (!value) return '-';
          return value.replace(/[0-9]/g, d => persianNumbers[parseInt(d)]);
        },

        // Get Persian name for a rule
        getPersianRuleName: (rule: { name: string } | null | undefined): string => {
          if (rule?.name && ruleMap[rule.name]) {
            return ruleMap[rule.name]
          }
          return rule?.name || 'نامشخص'
        }
      }
    }
  }
}) 