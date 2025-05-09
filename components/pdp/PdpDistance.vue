<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <div class="flex flex-col space-y-4">
      <!-- Title -->
      <h2 class="text-xl md:text-2xl font-bold text-gray-900">
        فاصله از مراکز مهم
      </h2>
      <div class="w-32 h-px bg-gray-200 mb-8"></div>

      <!-- Content -->
      <div v-if="nearbyCenters.length > 0" class="w-full">
        <table class="w-full">
          <!-- Header Row -->
          <thead>
            <tr>
              <th class="text-left py-3 md:py-4 text-gray-700 text-sm md:text-base">فاصله از</th>
              <th class="text-left py-3 md:py-4 text-gray-700 text-sm md:text-base">پیاده روی</th>
              <th class="text-left py-3 md:py-4 text-gray-700 text-sm md:text-base">خودرو</th>
            </tr>
          </thead>
          <!-- Data Rows -->
          <tbody>
            <tr v-for="(item, index) in groupedItems" :key="index" class="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-200">
              <td class="py-3 md:py-4 text-left text-gray-700 font-medium text-sm md:text-base">{{ formatKey(item.key) }}</td>
              <td class="py-3 md:py-4 text-left text-gray-500 text-sm md:text-base">
                {{ $persianTranslations.convertToPersian(item.walk) }}
              </td>
              <td class="py-3 md:py-4 text-left text-gray-500 text-sm md:text-base">
                {{ $persianTranslations.convertToPersian(item.car) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Data Message -->
      <div v-else class="text-gray-500 text-base">
        اطلاعات فاصله در دسترس نیست
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  nearbyCenters: {
    type: Array,
    default: () => []
  }
});

const groupedItems = computed(() => {
  // Merge all items from both centers
  const allItems = props.nearbyCenters.flatMap(center => center.items || []);
  
  // Group by key
  const grouped = allItems.reduce((acc, item) => {
    if (!acc[item.key]) {
      acc[item.key] = {
        key: item.key,
        walk: null,
        car: null
      };
    }
    
    if (item.accessibleBy === 'walk') {
      acc[item.key].walk = item.value;
    } else if (item.accessibleBy === 'car') {
      acc[item.key].car = item.value;
    }
    
    return acc;
  }, {});
  
  // Convert to array
  return Object.values(grouped);
});

const formatKey = (key) => {
  return key.replace(/^فاصله از\s+/, '');
};
</script> 