<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">About Jabama</h3>
          <p class="mb-4">The best directory listing template for your business. Find the best places in your city.</p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/about" class="hover:text-white">About Us</NuxtLink></li>
            <li><NuxtLink to="/listings" class="hover:text-white">Listings</NuxtLink></li>
            <li><NuxtLink to="/news" class="hover:text-white">News</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Categories</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/listings?category=shops" class="hover:text-white">Shops</NuxtLink></li>
            <li><NuxtLink to="/listings?category=hotels" class="hover:text-white">Hotels</NuxtLink></li>
            <li><NuxtLink to="/listings?category=restaurants" class="hover:text-white">Restaurants</NuxtLink></li>
            <li><NuxtLink to="/listings?category=fitness" class="hover:text-white">Fitness</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Contact Info</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <i class="fas fa-map-marker-alt mt-1 mr-2"></i>
              <span>123 Business Street, New York, USA</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-phone mt-1 mr-2"></i>
              <span>+1 234 567 890</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-envelope mt-1 mr-2"></i>
              <span>info@jabama.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center">
        <p>&copy; {{ new Date().getFullYear() }} Jabama. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template> 