<template>
  <div>
    <HeroSection />
    <PopularCategories :categories="categories" />
    <FeaturedListings :listings="featuredListings" />
  </div>
</template>

<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import PopularCategories from '~/components/home/PopularCategories.vue'
import FeaturedListings from '~/components/home/FeaturedListings.vue'

const categories = [
  {
    name: 'Restaurants',
    slug: 'restaurants',
    icon: 'fas fa-utensils',
    description: 'Find the best restaurants and cafes in your area.'
  },
  {
    name: 'Hotels',
    slug: 'hotels',
    icon: 'fas fa-hotel',
    description: 'Discover comfortable accommodations for your stay.'
  },
  {
    name: 'Shops',
    slug: 'shops',
    icon: 'fas fa-shopping-bag',
    description: 'Explore local shops and boutiques.'
  }
]

const featuredListings = [
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
    title: 'Premium Fitness Gym',
    image: '/images/listings/4.jpg',
    location: 'W 85th St, New York, USA',
    price: '$99/month',
    categories: ['Fitness', 'Gym'],
    rating: 5.0,
    rooms: 5,
    capacity: { base: 20, extra: 10 },
    comments: 56
  },
  {
    id: 4,
    title: 'Luxury Beach Resort',
    image: '/images/listings/5.jpg',
    location: 'Miami Beach, FL, USA',
    price: '$399/night',
    categories: ['Resorts', 'Beach'],
    rating: 4.8,
    rooms: 8,
    capacity: { base: 16, extra: 8 },
    comments: 78
  },
  {
    id: 5,
    title: 'Mountain View Cabin',
    image: '/images/listings/6.jpg',
    location: 'Aspen, CO, USA',
    price: '$249/night',
    categories: ['Houses', 'Mountain'],
    rating: 4.6,
    rooms: 4,
    capacity: { base: 8, extra: 4 },
    comments: 32
  },
  {
    id: 6,
    title: 'Downtown Loft',
    image: '/images/listings/7.jpg',
    location: 'Chicago Loop, IL, USA',
    price: '$179/night',
    categories: ['Apartments', 'Urban'],
    rating: 4.3,
    rooms: 2,
    capacity: { base: 4, extra: 2 },
    comments: 18
  }
]
</script>

<style scoped>
.listing-slider {
  padding: 20px 0;
}

:deep(.swiper-button-next-custom),
:deep(.swiper-button-prev-custom) {
  position: static;
  margin: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.swiper-button-next-custom:after),
:deep(.swiper-button-prev-custom:after) {
  display: none;
}

:deep(.swiper-slide) {
  height: auto;
  display: flex;
}

:deep(.swiper-slide > div) {
  width: 100%;
}
</style> 