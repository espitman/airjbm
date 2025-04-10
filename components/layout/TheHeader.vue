<template>
  <header 
    :class="[
      'bg-white shadow-md sticky top-0 z-50 transition-all duration-300',
      { 'py-6': !isScrolled, 'py-2': isScrolled }
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <Logo />

        <!-- Search Button (Mobile) -->
        <button 
          @click="showSearch = !showSearch"
          class="lg:hidden p-2 rounded-full hover:bg-gray-100"
        >
          <i class="fas fa-search w-6 h-6"></i>
        </button>

        <!-- Desktop Navigation -->
        <Navigation />

        <!-- User Actions -->
        <UserActions @toggle-search="showSearch = !showSearch" />
      </div>
    </div>

    <!-- Search Panel -->
    <SearchPanel v-model="showSearch" />
  </header>
</template>

<script setup>
import Logo from './header/Logo.vue'
import Navigation from './header/Navigation.vue'
import UserActions from './header/UserActions.vue'
import SearchPanel from './header/SearchPanel.vue'

const showSearch = ref(false)
const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script> 