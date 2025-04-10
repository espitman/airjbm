<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="relative">
      <img :src="listing.image" :alt="listing.title" class="w-full h-48 object-cover">
      <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
        {{ listing.price }}
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ listing.title }}</h3>
      <div class="flex items-center text-gray-600 mb-2">
        <i class="fas fa-map-marker-alt mr-2"></i>
        <span>{{ listing.location }}</span>
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="category in listing.categories" :key="category" 
              class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
          {{ category }}
        </span>
      </div>
      <div class="flex items-center gap-4 mb-4 text-gray-600">
        <div class="flex items-center">
          <i class="fas fa-bed mr-2"></i>
          <span>{{ listing.rooms }} {{ listing.rooms === 1 ? 'Room' : 'Rooms' }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-users mr-2"></i>
          <span>{{ listing.capacity.base }}+{{ listing.capacity.extra }} Guests</span>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <i class="fas fa-star text-yellow-400 mr-1"></i>
            <span class="font-semibold">{{ listing.rating }}</span>
          </div>
          <div class="flex items-center text-gray-500">
            <i class="fas fa-comment-alt mr-1"></i>
            <span>{{ listing.comments }}</span>
          </div>
        </div>
        <NuxtLink :to="`/listings/${listing.id}`" 
                  class="btn-primary">
          View Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  listing: {
    type: Object,
    required: true,
    validator: (listing) => {
      return listing.title && listing.image && listing.location && listing.price
    }
  }
})
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}
</style> 