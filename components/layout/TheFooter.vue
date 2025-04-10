<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">درباره جاباما</h3>
          <p class="mb-4">بهترین قالب دایرکتوری برای کسب و کار شما. بهترین مکان‌ها را در شهر خود پیدا کنید.</p>
          <div class="flex space-x-4 space-x-reverse">
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
          <h3 class="text-white text-lg font-semibold mb-4">دسترسی سریع</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/about" class="hover:text-white">درباره ما</NuxtLink></li>
            <li><NuxtLink to="/listings" class="hover:text-white">اقامتگاه‌ها</NuxtLink></li>
            <li><NuxtLink to="/news" class="hover:text-white">اخبار</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white">تماس با ما</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">دسته‌بندی‌ها</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/listings?category=shops" class="hover:text-white">فروشگاه‌ها</NuxtLink></li>
            <li><NuxtLink to="/listings?category=hotels" class="hover:text-white">هتل‌ها</NuxtLink></li>
            <li><NuxtLink to="/listings?category=restaurants" class="hover:text-white">رستوران‌ها</NuxtLink></li>
            <li><NuxtLink to="/listings?category=fitness" class="hover:text-white">باشگاه‌های ورزشی</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">اطلاعات تماس</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <i class="fas fa-map-marker-alt mt-1 ml-2"></i>
              <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-phone mt-1 ml-2"></i>
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-envelope mt-1 ml-2"></i>
              <span>info@jabama.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center">
        <p>&copy; {{ new Date().getFullYear() }} جاباما. تمامی حقوق محفوظ است.</p>
      </div>
    </div>
  </footer>
</template> 