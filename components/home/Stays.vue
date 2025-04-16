<template>
  <div class="container mx-auto px-4 mt-4 mb-12">
    <div class="max-w-7xl mx-auto p-4 lg:p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left side: Title and description -->
        <div class="lg:w-80 pt-2 lg:pt-3 text-center lg:text-right">
          <h1 class="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            اقامتگاه‌های خصوصی مناسب خود را پیدا کنید
          </h1>
          <p class="text-gray-700 leading-relaxed text-justify">
            با مادربزرگ و بچه‌ها یا حیوانات خانگی سفر می‌کنید؟ اقامتگاه‌های تعطیلاتی را که برای هر نیاز شما مناسب هستند، کشف کنید.
          </p>
        </div>

        <!-- Right side: Scrollable categories -->
        <div class="relative flex-1 overflow-hidden">
          <div 
            ref="categoriesRef" 
            class="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory"
          >
            <div 
              v-for="(category, index) in categories" 
              :key="index" 
              class="flex-shrink-0 w-[220px] h-[300px] relative rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02] snap-center"
            >
              <img 
                :src="category.image" 
                :alt="category.title" 
                class="w-full h-full object-cover"
              />
              <div class="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/50 via-black/30 to-transparent flex items-end p-4">
                <h3 class="text-white text-lg font-semibold drop-shadow">{{ category.title }}</h3>
              </div>
            </div>
          </div>

          <!-- Scroll buttons -->
          <button 
            @click="scrollLeft" 
            class="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 items-center justify-center shadow-md hover:shadow-lg z-10"
            aria-label="اسکرول به چپ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            @click="scrollRight" 
            class="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 items-center justify-center shadow-md hover:shadow-lg z-10"
            aria-label="اسکرول به راست"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Reference to the scrollable container
const categoriesRef = ref(null);

// Sample data for categories
const categories = ref([
  {
    title: 'کنار ساحل',
    image: '/images/stays/beach.jpg'
  },
  {
    title: 'میزبان حیوانات خانگی',
    image: '/images/stays/pets.jpg'
  },
  {
    title: 'استخر شنا',
    image: '/images/stays/pool.jpg'
  },
  {
    title: 'بیش از سه خوابگاه',
    image: '/images/stays/bedrooms.jpg'
  },
  {
    title: 'جکوزی',
    image: '/images/stays/hot-tub.jpg'
  },
  {
    title: 'چشم‌انداز کوه',
    image: '/images/stays/mountain.jpg'
  }
]);

// Function to scroll the categories to the right
const scrollRight = () => {
  if (categoriesRef.value) {
    categoriesRef.value.scrollBy({
      left: 240, // Scroll approximately one card width + gap
      behavior: 'smooth'
    });
  }
};

// Function to scroll the categories to the left
const scrollLeft = () => {
  if (categoriesRef.value) {
    categoriesRef.value.scrollBy({
      left: -240, // Scroll approximately one card width + gap
      behavior: 'smooth'
    });
  }
};

// Touch event variables
let touchStartX = 0;
let initialScrollLeft = 0;
let isScrolling = false;
let scrollTimeout = null;

// Add touch swipe functionality with improved performance
onMounted(() => {
  if (categoriesRef.value) {
    // Touch start event
    categoriesRef.value.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      initialScrollLeft = categoriesRef.value.scrollLeft;
      isScrolling = true;
      
      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    }, { passive: true });
    
    // Touch move event with throttling
    categoriesRef.value.addEventListener('touchmove', (e) => {
      if (!touchStartX || !isScrolling) return;
      
      e.preventDefault(); // Prevent default scrolling behavior
      
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1.5; // Reduced multiplier for smoother scrolling
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        categoriesRef.value.scrollLeft = initialScrollLeft - walk;
      });
    }, { passive: false });
    
    // Touch end event
    categoriesRef.value.addEventListener('touchend', () => {
      isScrolling = false;
      touchStartX = 0;
      
      // Add a small delay before allowing new scroll events
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    }, { passive: true });
    
    // Touch cancel event
    categoriesRef.value.addEventListener('touchcancel', () => {
      isScrolling = false;
      touchStartX = 0;
    }, { passive: true });
  }
});

// Clean up event listeners
onUnmounted(() => {
  if (categoriesRef.value) {
    categoriesRef.value.removeEventListener('touchstart', () => {});
    categoriesRef.value.removeEventListener('touchmove', () => {});
    categoriesRef.value.removeEventListener('touchend', () => {});
    categoriesRef.value.removeEventListener('touchcancel', () => {});
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  }
});
</script> 