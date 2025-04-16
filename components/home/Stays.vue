<template>
  <div class="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
    <div class="flex flex-col lg:flex-row gap-10">
      <!-- Left side: Title and description -->
      <div class="lg:w-80 pt-5">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          اقامتگاه‌های خصوصی مناسب شما را پیدا کنید
        </h1>
        <p class="text-gray-700 leading-relaxed">
          با مادربزرگ و بچه‌ها یا حیوانات خانگی سفر می‌کنید؟ اقامتگاه‌های تعطیلاتی را که برای هر نیاز شما مناسب هستند، کشف کنید.
        </p>
      </div>

      <!-- Right side: Scrollable categories -->
      <div class="relative flex-1 overflow-hidden">
        <div 
          ref="categoriesRef" 
          class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
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
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg z-10"
          aria-label="اسکرول به چپ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button 
          @click="scrollRight" 
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg z-10"
          aria-label="اسکرول به راست"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Reference to the scrollable container
const categoriesRef = ref(null);

// Sample data for categories
const categories = ref([
  {
    title: 'کنار ساحل',
    image: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6ff92caffcdd63681a35134a6770ed3b&auto=format&fit=crop&w=1951&q=80'
  },
  {
    title: 'میزبان حیوانات خانگی',
    image: 'https://images.unsplash.com/photo-1522205408450-add114ad53fe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=368f45b0888aeb0b7b08e3a1084d3ede&auto=format&fit=crop&w=1950&q=80'
  },
  {
    title: 'استخر شنا',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=94a1e718d89ca60a6337a6008341ca50&auto=format&fit=crop&w=1950&q=80'
  },
  {
    title: 'بیش از سه خوابگاه',
    image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=89719a0d55dd05e2deae4120227e6efc&auto=format&fit=crop&w=1953&q=80'
  },
  {
    title: 'جکوزی',
    image: 'https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c6e5e3aba713b17aa1fe71ab4f0ae5b&auto=format&fit=crop&w=1352&q=80'
  },
  {
    title: 'چشم‌انداز کوه',
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a0c8d632e977f94e5d312d9893258f59&auto=format&fit=crop&w=1355&q=80'
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

// Add touch swipe functionality
onMounted(() => {
  if (categoriesRef.value) {
    let startX = 0;
    let scrollLeft = 0;
    
    categoriesRef.value.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = categoriesRef.value.scrollLeft;
    });
    
    categoriesRef.value.addEventListener('touchmove', (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 2;
      categoriesRef.value.scrollLeft = scrollLeft - walk;
    });
    
    categoriesRef.value.addEventListener('touchend', () => {
      startX = 0;
    });
  }
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style> 