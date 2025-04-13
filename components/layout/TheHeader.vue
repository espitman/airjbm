<template>
  <header :class="['bg-white shadow-md sticky top-0 z-50 transition-all duration-300', isScrolled ? 'py-2' : 'py-4']">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-10 h-auto" :class="{'md:h-10': isScrolled, 'md:h-16': !isScrolled}">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center gap-2">
            <img src="~/public/logo.svg" alt="Jabama" class="h-8 w-8">
            <span class="text-xl font-bold text-gray-900">Jabama</span>
          </NuxtLink>
          <!-- Navigation -->
          <Navigation class="mr-16" />
        </div>

        <!-- Right side content -->
        <div class="ml-auto flex items-center">
          <!-- User Actions -->
          <UserActions />
        </div>
      </div>

      <!-- Search Panel -->
      <SearchPanel :is-open="isSearchOpen" />
    </div>
  </header>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import Navigation from './header/Navigation.vue'
import UserActions from './header/UserActions.vue'
import SearchPanel from './header/SearchPanel.vue'

const isSearchOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
}

// Provide search state to child components
provide('isSearchOpen', isSearchOpen)
provide('toggleSearch', toggleSearch)
</script> 