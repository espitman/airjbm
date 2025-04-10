<template>
  <div class="hidden lg:flex items-center space-x-4">
    <button 
      @click="$emit('toggle-search')"
      class="btn-outline flex items-center"
    >
      <i class="fas fa-search mr-2"></i>
      Search
    </button>
    <button class="btn-outline">Sign In</button>
    <button class="btn-primary">Sign Up</button>
  </div>
</template>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}

.btn-outline {
  @apply border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors;
}
</style> 