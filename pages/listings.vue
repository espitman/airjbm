<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Toggle Button (Mobile) -->
        <button 
          @click="toggleFilters"
          class="lg:hidden w-full mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
        </button>

        <!-- Filters Sidebar -->
        <div 
          v-if="showFilters || windowWidth >= 1024"
          class="lg:w-1/4 transition-all duration-300 lg:sticky lg:top-36 lg:self-start"
        >
          <Filters 
            v-model:filters="filters"
            :show-rules-modal="showRulesModal"
            :show-amenities-modal="showAmenitiesModal"
            @close="hideFilters"
            @apply-filters="updateFiltersInUrl"
            @open-rules-modal="showRulesModal = true"
            @open-amenities-modal="showAmenitiesModal = true"
            @show-modal="showModal = true"
          />
        </div>

        <!-- Listings Grid -->
        <div :class="['lg:w-3/4', {'w-full': !showFilters && windowWidth < 1024}]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListingCard 
              v-for="listing in paginatedListings" 
              :key="listing.id" 
              :listing="listing" 
            />
          </div>
          
          <!-- Pagination -->
          <div class="mt-8 flex justify-center">
            <div class="flex space-x-2">
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 rounded-lg',
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ page }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Modals -->
    <FilterModals
      :show-rules-modal="showRulesModal"
      :show-amenities-modal="showAmenitiesModal"
      :selected-rules="filters.selectedRules"
      :selected-amenities="filters.selectedAmenities"
      @close-rules-modal="showRulesModal = false"
      @close-amenities-modal="showAmenitiesModal = false"
      @update:selected-rules="updateSelectedRules"
      @update:selected-amenities="updateSelectedAmenities"
      @apply-filters="handleModalApplyFilters"
    />

    <!-- Rules & Amenities Modal -->
    <RulesAmenitiesModal 
      :show="showModal"
      :filters="filters"
      @close="showModal = false"
      @update:filters="handleModalFilters"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Filters from '~/components/ui/Filters.vue'
import FilterModals from '~/components/ui/FilterModals.vue'
import ListingCard from '~/components/ui/ListingCard.vue'
import RulesAmenitiesModal from '~/components/ui/RulesAmenitiesModal.vue'

const route = useRoute()
const router = useRouter()

const showFilters = ref(true)
const showModal = ref(false)
const windowWidth = ref(0)
const currentPage = computed({
  get: () => {
    const page = parseInt(route.query.page) || 1
    return page > 0 ? page : 1
  },
  set: (value) => {
    updatePageQuery(value)
  }
})
const itemsPerPage = 16

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const toggleFilters = () => {
  showFilters.value = !showFilters.value
  console.log('Toggling filters:', showFilters.value)
}

const hideFilters = () => {
  console.log('Hiding filters')
  showFilters.value = false
}

const filters = ref({
  search: '',
  city: '',
  type: '',
  minPrice: '',
  maxPrice: '',
  passengerCount: '',
  roomsCount: '',
  locationType: '',
  checkinDate: '',
  checkoutDate: '',
  selectedRules: [],
  selectedAmenities: [],
  sortBy: 'price-asc'
})

const showRulesModal = ref(false)
const showAmenitiesModal = ref(false)

const updateSelectedRules = (rules) => {
  filters.value.selectedRules = rules
}

const updateSelectedAmenities = (amenities) => {
  filters.value.selectedAmenities = amenities
}

const handleModalApplyFilters = (modalFilters) => {
  // Update the filters with the modal values
  if (modalFilters.selectedRules) {
    filters.value.selectedRules = modalFilters.selectedRules
  }
  if (modalFilters.selectedAmenities) {
    filters.value.selectedAmenities = modalFilters.selectedAmenities
  }
  
  // Update the URL with the new filter values
  updateFiltersInUrl(filters.value)
}

const handleModalFilters = (newFilters) => {
  filters.value = {
    ...filters.value,
    selectedRules: newFilters.selectedRules,
    selectedAmenities: newFilters.selectedAmenities
  }
  updateFiltersInUrl(filters.value)
}

// Sample listings data with 32 items
const listings = ref([
  {
    id: 1,
    title: 'Iconic Cafe',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: '40 Journal Square Plaza, NJ, USA',
    city: 'New York',
    type: 'Restaurant',
    price: 299,
    categories: ['Restaurants', 'Cafe'],
    rating: 4.1,
    rooms: 2,
    capacity: { base: 4, extra: 2 },
    comments: 24,
    locationType: 'City Center',
    rules: ['No Smoking', 'Quiet Hours'],
    amenities: ['WiFi', 'Restaurant'],
    checkinDate: '2024-03-20',
    checkoutDate: '2024-03-25'
  },
  {
    id: 2,
    title: 'MontePlaza Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: '70 Bright St New York, USA',
    city: 'New York',
    type: 'Hotel',
    price: 199,
    categories: ['Hotels'],
    rating: 5.0,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 42,
    locationType: 'City Center',
    rules: ['No Smoking', 'No Parties', 'Quiet Hours'],
    amenities: ['WiFi', 'Pool', 'Parking', 'Gym', 'Restaurant', 'Spa', 'Room Service'],
    checkinDate: '2024-03-21',
    checkoutDate: '2024-03-26'
  },
  {
    id: 3,
    title: 'Premium Fitness Gym',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'W 85th St, New York, USA',
    city: 'New York',
    type: 'Gym',
    price: 99,
    categories: ['Fitness', 'Gym'],
    rating: 5.0,
    rooms: 5,
    capacity: { base: 20, extra: 10 },
    comments: 56,
    locationType: 'City Center',
    rules: ['No Smoking'],
    amenities: ['WiFi', 'Parking', 'Gym'],
    checkinDate: '2024-03-22',
    checkoutDate: '2024-03-27'
  },
  {
    id: 4,
    title: 'Luxury Beach Resort',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Miami Beach, FL, USA',
    city: 'Miami',
    type: 'Resort',
    price: 399,
    categories: ['Resorts', 'Beach'],
    rating: 4.8,
    rooms: 8,
    capacity: { base: 16, extra: 8 },
    comments: 78,
    locationType: 'Beach',
    rules: ['No Smoking', 'No Pets'],
    amenities: ['WiFi', 'Pool', 'Parking', 'Gym', 'Restaurant', 'Spa', 'Room Service', 'Beach Access'],
    checkinDate: '2024-03-23',
    checkoutDate: '2024-03-28'
  },
  {
    id: 5,
    title: 'Mountain View Cabin',
    image: 'https://images.unsplash.com/photo-1542718610-a1d39d1cf300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Aspen, CO, USA',
    city: 'Aspen',
    type: 'House',
    price: 249,
    categories: ['Houses', 'Mountain'],
    rating: 4.6,
    rooms: 4,
    capacity: { base: 8, extra: 4 },
    comments: 32,
    locationType: 'Mountain',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Parking', 'Fireplace', 'Kitchen'],
    checkinDate: '2024-03-24',
    checkoutDate: '2024-03-29'
  },
  {
    id: 6,
    title: 'Downtown Loft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Chicago Loop, IL, USA',
    city: 'Chicago',
    type: 'Apartment',
    price: 179,
    categories: ['Apartments', 'Urban'],
    rating: 4.3,
    rooms: 2,
    capacity: { base: 4, extra: 2 },
    comments: 18,
    locationType: 'City Center',
    rules: ['No Smoking', 'No Pets'],
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Washer/Dryer'],
    checkinDate: '2024-03-25',
    checkoutDate: '2024-03-30'
  },
  {
    id: 7,
    title: 'Seaside Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Malibu, CA, USA',
    city: 'Los Angeles',
    type: 'Villa',
    price: 599,
    categories: ['Villas', 'Beach'],
    rating: 4.9,
    rooms: 6,
    capacity: { base: 12, extra: 6 },
    comments: 45,
    locationType: 'Beach',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Pool', 'Parking', 'Gym', 'Restaurant', 'Spa', 'Beach Access'],
    checkinDate: '2024-03-26',
    checkoutDate: '2024-03-31'
  },
  {
    id: 8,
    title: 'Urban Boutique Hotel',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Houston Downtown, TX, USA',
    city: 'Houston',
    type: 'Hotel',
    price: 159,
    categories: ['Hotels', 'Urban'],
    rating: 4.4,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 29,
    locationType: 'City Center',
    rules: ['No Smoking', 'Quiet Hours'],
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Room Service'],
    checkinDate: '2024-03-27',
    checkoutDate: '2024-04-01'
  },
  {
    id: 9,
    title: 'Cozy Bistro',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'French Quarter, New Orleans, LA, USA',
    city: 'New Orleans',
    type: 'Restaurant',
    price: 129,
    categories: ['Restaurants', 'Bistro'],
    rating: 4.7,
    rooms: 1,
    capacity: { base: 2, extra: 1 },
    comments: 36,
    locationType: 'City Center',
    rules: ['No Smoking'],
    amenities: ['WiFi', 'Restaurant'],
    checkinDate: '2024-03-28',
    checkoutDate: '2024-04-02'
  },
  {
    id: 10,
    title: 'Lakeside Cottage',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Lake Tahoe, CA, USA',
    city: 'Lake Tahoe',
    type: 'House',
    price: 279,
    categories: ['Houses', 'Lake'],
    rating: 4.5,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 22,
    locationType: 'Countryside',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Fireplace'],
    checkinDate: '2024-03-29',
    checkoutDate: '2024-04-03'
  },
  {
    id: 11,
    title: 'Tech Hub Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Silicon Valley, CA, USA',
    city: 'San Francisco',
    type: 'Office',
    price: 349,
    categories: ['Offices', 'Tech'],
    rating: 4.2,
    rooms: 5,
    capacity: { base: 10, extra: 5 },
    comments: 15,
    locationType: 'Suburb',
    rules: ['No Smoking', 'Quiet Hours'],
    amenities: ['WiFi', 'Parking', 'Conference Room', 'Kitchen'],
    checkinDate: '2024-03-30',
    checkoutDate: '2024-04-04'
  },
  {
    id: 12,
    title: 'Historic Mansion',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Charleston, SC, USA',
    city: 'Charleston',
    type: 'House',
    price: 499,
    categories: ['Houses', 'Historic'],
    rating: 4.8,
    rooms: 8,
    capacity: { base: 16, extra: 8 },
    comments: 41,
    locationType: 'City Center',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Parking', 'Pool', 'Garden'],
    checkinDate: '2024-03-31',
    checkoutDate: '2024-04-05'
  },
  {
    id: 13,
    title: 'Rooftop Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Downtown LA, CA, USA',
    city: 'Los Angeles',
    type: 'Restaurant',
    price: 199,
    categories: ['Restaurants', 'Rooftop'],
    rating: 4.6,
    rooms: 1,
    capacity: { base: 2, extra: 1 },
    comments: 33,
    locationType: 'City Center',
    rules: ['No Smoking'],
    amenities: ['WiFi', 'Restaurant', 'Bar'],
    checkinDate: '2024-04-01',
    checkoutDate: '2024-04-06'
  },
  {
    id: 14,
    title: 'Ski Lodge',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Vail, CO, USA',
    city: 'Vail',
    type: 'Resort',
    price: 449,
    categories: ['Resorts', 'Ski'],
    rating: 4.7,
    rooms: 6,
    capacity: { base: 12, extra: 6 },
    comments: 52,
    locationType: 'Mountain',
    rules: ['No Smoking', 'No Pets'],
    amenities: ['WiFi', 'Pool', 'Parking', 'Gym', 'Restaurant', 'Spa', 'Ski Storage'],
    checkinDate: '2024-04-02',
    checkoutDate: '2024-04-07'
  },
  {
    id: 15,
    title: 'Beachfront Apartment',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Venice Beach, CA, USA',
    city: 'Los Angeles',
    type: 'Apartment',
    price: 229,
    categories: ['Apartments', 'Beach'],
    rating: 4.4,
    rooms: 2,
    capacity: { base: 4, extra: 2 },
    comments: 27,
    locationType: 'Beach',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Beach Access'],
    checkinDate: '2024-04-03',
    checkoutDate: '2024-04-08'
  },
  {
    id: 16,
    title: 'Business Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Chicago Loop, IL, USA',
    city: 'Chicago',
    type: 'Hotel',
    price: 189,
    categories: ['Hotels', 'Business'],
    rating: 4.3,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 31,
    locationType: 'City Center',
    rules: ['No Smoking', 'Quiet Hours'],
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Business Center'],
    checkinDate: '2024-04-04',
    checkoutDate: '2024-04-09'
  },
  {
    id: 17,
    title: 'Mountain Retreat',
    image: 'https://images.unsplash.com/photo-1542718610-a1d39d1cf300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Denver, CO, USA',
    city: 'Denver',
    type: 'House',
    price: 259,
    categories: ['Houses', 'Mountain'],
    rating: 4.5,
    rooms: 4,
    capacity: { base: 8, extra: 4 },
    comments: 23,
    locationType: 'Mountain',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Parking', 'Fireplace', 'Kitchen'],
    checkinDate: '2024-04-05',
    checkoutDate: '2024-04-10'
  },
  {
    id: 18,
    title: 'Urban Loft',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Seattle, WA, USA',
    city: 'Seattle',
    type: 'Apartment',
    price: 199,
    categories: ['Apartments', 'Urban'],
    rating: 4.2,
    rooms: 2,
    capacity: { base: 4, extra: 2 },
    comments: 19,
    locationType: 'City Center',
    rules: ['No Smoking', 'No Pets'],
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Washer/Dryer'],
    checkinDate: '2024-04-06',
    checkoutDate: '2024-04-11'
  },
  {
    id: 19,
    title: 'Luxury Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Beverly Hills, CA, USA',
    city: 'Los Angeles',
    type: 'Villa',
    price: 699,
    categories: ['Villas', 'Luxury'],
    rating: 4.9,
    rooms: 7,
    capacity: { base: 14, extra: 7 },
    comments: 48,
    locationType: 'Suburb',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Pool', 'Parking', 'Gym', 'Restaurant', 'Spa', 'Tennis Court'],
    checkinDate: '2024-04-07',
    checkoutDate: '2024-04-12'
  },
  {
    id: 20,
    title: 'Boutique Hotel',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Austin, TX, USA',
    city: 'Austin',
    type: 'Hotel',
    price: 169,
    categories: ['Hotels', 'Boutique'],
    rating: 4.6,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 35,
    locationType: 'City Center',
    rules: ['No Smoking', 'Quiet Hours'],
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Bar'],
    checkinDate: '2024-04-08',
    checkoutDate: '2024-04-13'
  },
  {
    id: 21,
    title: 'Italian Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Little Italy, NY, USA',
    city: 'New York',
    type: 'Restaurant',
    price: 149,
    categories: ['Restaurants', 'Italian'],
    rating: 4.7,
    rooms: 1,
    capacity: { base: 2, extra: 1 },
    comments: 42,
    locationType: 'City Center',
    rules: ['No Smoking'],
    amenities: ['WiFi', 'Restaurant', 'Bar'],
    checkinDate: '2024-04-09',
    checkoutDate: '2024-04-14'
  },
  {
    id: 22,
    title: 'Lake House',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Minneapolis, MN, USA',
    city: 'Minneapolis',
    type: 'House',
    price: 239,
    categories: ['Houses', 'Lake'],
    rating: 4.4,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 21,
    locationType: 'Countryside',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Fireplace'],
    checkinDate: '2024-04-10',
    checkoutDate: '2024-04-15'
  },
  {
    id: 23,
    title: 'Tech Startup Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Boston, MA, USA',
    city: 'Boston',
    type: 'Office',
    price: 329,
    categories: ['Offices', 'Tech'],
    rating: 4.3,
    rooms: 4,
    capacity: { base: 8, extra: 4 },
    comments: 17,
    locationType: 'City Center',
    rules: ['No Smoking', 'Quiet Hours'],
    amenities: ['WiFi', 'Parking', 'Conference Room', 'Kitchen'],
    checkinDate: '2024-04-11',
    checkoutDate: '2024-04-16'
  },
  {
    id: 24,
    title: 'Historic Inn',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Savannah, GA, USA',
    city: 'Savannah',
    type: 'Hotel',
    price: 189,
    categories: ['Hotels', 'Historic'],
    rating: 4.5,
    rooms: 4,
    capacity: { base: 8, extra: 4 },
    comments: 33,
    locationType: 'City Center',
    rules: ['No Smoking', 'No Pets'],
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Garden'],
    checkinDate: '2024-04-12',
    checkoutDate: '2024-04-17'
  },
  {
    id: 25,
    title: 'Sushi Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Downtown Seattle, WA, USA',
    city: 'Seattle',
    type: 'Restaurant',
    price: 169,
    categories: ['Restaurants', 'Japanese'],
    rating: 4.8,
    rooms: 1,
    capacity: { base: 2, extra: 1 },
    comments: 39,
    locationType: 'City Center',
    rules: ['No Smoking'],
    amenities: ['WiFi', 'Restaurant', 'Bar'],
    checkinDate: '2024-04-13',
    checkoutDate: '2024-04-18'
  },
  {
    id: 26,
    title: 'Ski Resort',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Park City, UT, USA',
    city: 'Park City',
    type: 'Resort',
    price: 479,
    categories: ['Resorts', 'Ski'],
    rating: 4.7,
    rooms: 7,
    capacity: { base: 14, extra: 7 },
    comments: 58,
    locationType: 'Mountain',
    rules: ['No Smoking', 'No Pets'],
    amenities: ['WiFi', 'Pool', 'Parking', 'Gym', 'Restaurant', 'Spa', 'Ski Storage'],
    checkinDate: '2024-04-14',
    checkoutDate: '2024-04-19'
  },
  {
    id: 27,
    title: 'Beachfront Condo',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'San Diego, CA, USA',
    city: 'San Diego',
    type: 'Apartment',
    price: 249,
    categories: ['Apartments', 'Beach'],
    rating: 4.5,
    rooms: 2,
    capacity: { base: 4, extra: 2 },
    comments: 29,
    locationType: 'Beach',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Beach Access'],
    checkinDate: '2024-04-15',
    checkoutDate: '2024-04-20'
  },
  {
    id: 28,
    title: 'Business Center Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Dallas, TX, USA',
    city: 'Dallas',
    type: 'Hotel',
    price: 199,
    categories: ['Hotels', 'Business'],
    rating: 4.4,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 36,
    locationType: 'City Center',
    rules: ['No Smoking', 'Quiet Hours'],
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Business Center'],
    checkinDate: '2024-04-16',
    checkoutDate: '2024-04-21'
  },
  {
    id: 29,
    title: 'Mountain Cabin',
    image: 'https://images.unsplash.com/photo-1542718610-a1d39d1cf300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Boulder, CO, USA',
    city: 'Boulder',
    type: 'House',
    price: 229,
    categories: ['Houses', 'Mountain'],
    rating: 4.6,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 25,
    locationType: 'Mountain',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Parking', 'Fireplace', 'Kitchen'],
    checkinDate: '2024-04-17',
    checkoutDate: '2024-04-22'
  },
  {
    id: 30,
    title: 'Urban Studio',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Portland, OR, USA',
    city: 'Portland',
    type: 'Apartment',
    price: 159,
    categories: ['Apartments', 'Urban'],
    rating: 4.2,
    rooms: 1,
    capacity: { base: 2, extra: 1 },
    comments: 16,
    locationType: 'City Center',
    rules: ['No Smoking', 'No Pets'],
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Washer/Dryer'],
    checkinDate: '2024-04-18',
    checkoutDate: '2024-04-23'
  },
  {
    id: 31,
    title: 'Luxury Mansion',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Newport, RI, USA',
    city: 'Newport',
    type: 'House',
    price: 799,
    categories: ['Houses', 'Luxury'],
    rating: 4.9,
    rooms: 10,
    capacity: { base: 20, extra: 10 },
    comments: 52,
    locationType: 'Suburb',
    rules: ['No Smoking', 'No Parties'],
    amenities: ['WiFi', 'Pool', 'Parking', 'Gym', 'Restaurant', 'Spa', 'Tennis Court', 'Garden'],
    checkinDate: '2024-04-19',
    checkoutDate: '2024-04-24'
  },
  {
    id: 32,
    title: 'Boutique Inn',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Nashville, TN, USA',
    city: 'Nashville',
    type: 'Hotel',
    price: 179,
    categories: ['Hotels', 'Boutique'],
    rating: 4.5,
    rooms: 3,
    capacity: { base: 6, extra: 3 },
    comments: 38,
    locationType: 'City Center',
    rules: ['No Smoking', 'Quiet Hours'],
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Bar'],
    checkinDate: '2024-04-20',
    checkoutDate: '2024-04-25'
  }
])

const filteredListings = computed(() => {
  let result = [...listings.value]

  // Apply search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    result = result.filter(listing => 
      listing.title.toLowerCase().includes(searchTerm) ||
      listing.location.toLowerCase().includes(searchTerm)
    )
  }

  // Apply city filter
  if (filters.value.city) {
    result = result.filter(listing => listing.city === filters.value.city)
  }

  // Apply type filter
  if (filters.value.type) {
    result = result.filter(listing => listing.type === filters.value.type)
  }

  // Apply price range filter
  if (filters.value.minPrice) {
    result = result.filter(listing => listing.price >= Number(filters.value.minPrice))
  }
  if (filters.value.maxPrice) {
    result = result.filter(listing => listing.price <= Number(filters.value.maxPrice))
  }

  // Apply passenger count filter
  if (filters.value.passengerCount) {
    result = result.filter(listing => 
      listing.capacity.base + listing.capacity.extra >= Number(filters.value.passengerCount)
    )
  }

  // Apply rooms count filter
  if (filters.value.roomsCount) {
    result = result.filter(listing => listing.rooms >= Number(filters.value.roomsCount))
  }

  // Apply location type filter
  if (filters.value.locationType) {
    result = result.filter(listing => listing.locationType === filters.value.locationType)
  }

  // Apply check-in date filter
  if (filters.value.checkinDate) {
    result = result.filter(listing => listing.checkinDate >= filters.value.checkinDate)
  }

  // Apply check-out date filter
  if (filters.value.checkoutDate) {
    result = result.filter(listing => listing.checkoutDate <= filters.value.checkoutDate)
  }

  // Apply rules filter
  if (filters.value.selectedRules.length > 0) {
    result = result.filter(listing => 
      filters.value.selectedRules.every(rule => listing.rules.includes(rule))
    )
  }

  // Apply amenities filter
  if (filters.value.selectedAmenities.length > 0) {
    result = result.filter(listing => 
      filters.value.selectedAmenities.every(amenity => listing.amenities.includes(amenity))
    )
  }

  // Apply sorting
  switch (filters.value.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'rating-asc':
      result.sort((a, b) => a.rating - b.rating)
      break
  }

  return result
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredListings.value.length / itemsPerPage)
})

const paginatedListings = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredListings.value.slice(startIndex, endIndex)
})

// Reset to first page when filters change
watch(filters, () => {
  currentPage.value = 1
}, { deep: true })

// Function to update page in URL
const updatePageQuery = (page) => {
  setTimeout(() => {
    console.log('Updating page in URL:', page)
    router.push({
      query: {
      ...route.query,
      page: page > 1 ? page : undefined
      }
    })
  }, 10)
}

// Watch for route changes to update currentPage
watch(() => route.query.page, (newPage) => {
  if (newPage) {
    const page = parseInt(newPage)
    if (page > 0 && page <= totalPages.value) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
})

// Update pagination navigation to use the new currentPage setter
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Function to update filters in URL
const updateFiltersInUrl = (newFilters) => {
  console.log('Updating filters in URL:', newFilters)
  
  // Create a new query object
  const query = { ...route.query }
  
  // Update or remove query parameters based on filter values
  Object.entries(newFilters).forEach(([key, value]) => {
    if (value && (typeof value === 'string' || typeof value === 'number')) {
      query[key] = value.toString()
    } else if (Array.isArray(value) && value.length > 0) {
      query[key] = value.join(',')
    } else {
      delete query[key]
    }
  })
  
  // Reset to page 1 when filters change
  delete query.page
  
  // Update URL with new query parameters
  console.log('New query parameters:', query)
  router.push({
    query: {
      ...query,
      page: 1
    }
  })
  
  // Update the main filters object
  filters.value = { ...newFilters }
}

// Initialize filters from URL on page load
onMounted(() => {
  const query = route.query
  
  if (query.search) filters.value.search = query.search
  if (query.city) filters.value.city = query.city
  if (query.type) filters.value.type = query.type
  if (query.minPrice) filters.value.minPrice = query.minPrice
  if (query.maxPrice) filters.value.maxPrice = query.maxPrice
  if (query.passengerCount) filters.value.passengerCount = query.passengerCount
  if (query.roomsCount) filters.value.roomsCount = query.roomsCount
  if (query.locationType) filters.value.locationType = query.locationType
  if (query.checkinDate) filters.value.checkinDate = query.checkinDate
  if (query.checkoutDate) filters.value.checkoutDate = query.checkoutDate
  if (query.selectedRules) filters.value.selectedRules = query.selectedRules.split(',')
  if (query.selectedAmenities) filters.value.selectedAmenities = query.selectedAmenities.split(',')
  if (query.sortBy) filters.value.sortBy = query.sortBy
})

// Watch for route query changes to update filters
watch(() => route.query, (newQuery) => {
  if (newQuery.search !== undefined) filters.value.search = newQuery.search
  if (newQuery.city !== undefined) filters.value.city = newQuery.city
  if (newQuery.type !== undefined) filters.value.type = newQuery.type
  if (newQuery.minPrice !== undefined) filters.value.minPrice = newQuery.minPrice
  if (newQuery.maxPrice !== undefined) filters.value.maxPrice = newQuery.maxPrice
  if (newQuery.passengerCount !== undefined) filters.value.passengerCount = newQuery.passengerCount
  if (newQuery.roomsCount !== undefined) filters.value.roomsCount = newQuery.roomsCount
  if (newQuery.locationType !== undefined) filters.value.locationType = newQuery.locationType
  if (newQuery.checkinDate !== undefined) filters.value.checkinDate = newQuery.checkinDate
  if (newQuery.checkoutDate !== undefined) filters.value.checkoutDate = newQuery.checkoutDate
  if (newQuery.selectedRules !== undefined) filters.value.selectedRules = newQuery.selectedRules.split(',')
  if (newQuery.selectedAmenities !== undefined) filters.value.selectedAmenities = newQuery.selectedAmenities.split(',')
  if (newQuery.sortBy !== undefined) filters.value.sortBy = newQuery.sortBy
}, { deep: true })
</script> 