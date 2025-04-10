<template>
  <div 
    v-if="modelValue"
    class="bg-white border-t transition-all duration-300"
  >
    <div class="container mx-auto px-4 py-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">Search</h3>
        <button 
          @click="$emit('update:modelValue', false)"
          class="text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-times w-6 h-6"></i>
        </button>
      </div>
      <div class="flex flex-wrap gap-4 items-end">
        <div class="w-[40%]">
          <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <select v-model="filters.city" class="w-full px-4 py-2 border rounded-lg">
            <option value="">Select City</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            <option value="Miami">Miami</option>
          </select>
        </div>
        <div class="flex-1 flex gap-4">
          <div class="w-24">
            <label class="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
            <input 
              v-model="filters.passengerCount"
              type="number" 
              min="0" 
              class="w-full px-4 py-2 border rounded-lg"
              placeholder="0"
            >
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <input 
              v-model="filters.checkinDate"
              type="date" 
              class="w-full px-4 py-2 border rounded-lg"
            >
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <input 
              v-model="filters.checkoutDate"
              type="date" 
              class="w-full px-4 py-2 border rounded-lg"
            >
          </div>
          <button @click="handleSearch" class="btn-primary px-8 mt-6 flex items-center">
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const filters = ref({
  city: '',
  passengerCount: '',
  checkinDate: '',
  checkoutDate: ''
})

const handleSearch = () => {
  const query = {}
  
  if (filters.value.city) query.city = filters.value.city
  if (filters.value.passengerCount) query.passengerCount = filters.value.passengerCount
  if (filters.value.checkinDate) query.checkinDate = filters.value.checkinDate
  if (filters.value.checkoutDate) query.checkoutDate = filters.value.checkoutDate
  
  router.push({
    path: '/listings',
    query
  })
  
  emit('update:modelValue', false)
}
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-[42px];
}
</style> 