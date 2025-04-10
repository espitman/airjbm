<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Directory Listings</h1>
      <p class="text-gray-600">Find the best places in your city</p>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input type="text" 
                 v-model="filters.search" 
                 placeholder="Search listings..." 
                 class="w-full px-4 py-2 border rounded-lg">
        </div>
        <div>
          <input type="text" 
                 v-model="filters.location" 
                 placeholder="Location..." 
                 class="w-full px-4 py-2 border rounded-lg">
        </div>
        <div>
          <select v-model="filters.category" 
                  class="w-full px-4 py-2 border rounded-lg">
            <option value="">All Categories</option>
            <option value="shops">Shops</option>
            <option value="hotels">Hotels</option>
            <option value="restaurants">Restaurants</option>
            <option value="fitness">Fitness</option>
            <option value="events">Events</option>
          </select>
        </div>
        <div>
          <select v-model="filters.sort" 
                  class="w-full px-4 py-2 border rounded-lg">
            <option value="rating">Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Listings Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ListingCard 
        v-for="listing in filteredListings" 
        :key="listing.id" 
        :listing="listing" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ListingCard from '~/components/ui/ListingCard.vue'

// Sample data - in a real app, this would come from an API
const listings = ref([
  {
    id: 1,
    title: 'Iconic Cafe',
    image: '/images/listings/1.jpg',
    location: '40 Journal Square Plaza, NJ, USA',
    price: '$299/night',
    categories: ['Restaurants', 'Cafe'],
    rating: 4.1,
    rooms: 2,
    capacity: { base: 4, extra: 2 },
    comments: 24
  },
  {
    id: 2,
    title: 'MontePlaza Hotel',
    image: '/images/listings/2.jpg',
    location: '70 Bright St New York, USA',
    price: '$199/night',
    categories: ['Hotels'],
    rating: 5.0,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 42
  },
  {
    id: 3,
    title: 'Rocko Band in Marquee Club',
    image: '/images/listings/3.jpg',
    location: '75 Prince St, NY, USA',
    price: '$49/event',
    categories: ['Events'],
    rating: 4.2,
    rooms: 1,
    capacity: { base: 100, extra: 50 },
    comments: 18
  },
  {
    id: 4,
    title: 'Premium Fitness Gym',
    image: '/images/listings/4.jpg',
    location: 'W 85th St, New York, USA',
    price: '$99/month',
    categories: ['Fitness', 'Gym'],
    rating: 5.0,
    rooms: 5,
    capacity: { base: 20, extra: 10 },
    comments: 56
  }
])

const filters = ref({
  search: '',
  location: '',
  category: '',
  sort: 'rating'
})

const filteredListings = computed(() => {
  let result = [...listings.value]

  // Apply search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    result = result.filter(listing => 
      listing.title.toLowerCase().includes(search) ||
      listing.categories.some(cat => cat.toLowerCase().includes(search))
    )
  }

  // Apply location filter
  if (filters.value.location) {
    const location = filters.value.location.toLowerCase()
    result = result.filter(listing => 
      listing.location.toLowerCase().includes(location)
    )
  }

  // Apply category filter
  if (filters.value.category) {
    result = result.filter(listing => 
      listing.categories.includes(filters.value.category)
    )
  }

  // Apply sorting
  switch (filters.value.sort) {
    case 'price-low':
      result.sort((a, b) => a.price.localeCompare(b.price))
      break
    case 'price-high':
      result.sort((a, b) => b.price.localeCompare(a.price))
      break
    case 'name':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'rating':
    default:
      result.sort((a, b) => b.rating - a.rating)
  }

  return result
})
</script> 