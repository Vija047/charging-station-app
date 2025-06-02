<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 flex flex-col">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-100 p-4 sm:p-6 flex justify-between items-center sticky top-0 z-50">
      <h1 class="text-xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
        ⚡ Charging Station Manager
      </h1>
      <nav class="hidden sm:flex space-x-4 sm:space-x-8">
        <router-link
          to="/"
          class="relative px-2 sm:px-4 py-1 sm:py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold group"
          active-class="text-blue-600"
          exact
        >
          Dashboard
          <span class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </router-link>

        <!-- Show only when not authenticated -->
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="register-btn">Register</router-link>
        </template>

        <!-- Show only when authenticated -->
        <template v-else>
          <button @click="logout" class="logout-btn">Logout</button>
        </template>
      </nav>

      <!-- Mobile menu button -->
      <button class="sm:hidden p-2 rounded-md hover:bg-gray-100" @click="toggleMobileMenu">
        <svg class="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>

    <!-- Mobile nav -->
    <div v-if="mobileMenuOpen" class="sm:hidden bg-white/90 backdrop-blur-md shadow p-4 space-y-2">
      <router-link to="/" class="block text-gray-700 font-semibold">Dashboard</router-link>
      <template v-if="!isAuthenticated">
        <router-link to="/login" class="block text-gray-700 font-semibold">Login</router-link>
        <router-link to="/register" class="block text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-4 py-1 font-semibold">Register</router-link>
      </template>
      <template v-else>
        <button @click="logout" class="block w-full text-white bg-red-500 rounded-full px-4 py-1 font-semibold">Logout</button>
      </template>
    </div>

    <!-- Main -->
    <main class="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full relative">
      <div class="hidden sm:block absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
      <div class="hidden sm:block absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div class="hidden sm:block absolute bottom-20 left-1/3 w-16 h-16 bg-teal-100 rounded-full opacity-25 animate-pulse delay-500"></div>

      <div class="relative z-10">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white/70 backdrop-blur-sm border-t border-gray-100 text-center p-4 sm:p-6 text-gray-600 text-sm sm:text-base">
      <div class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
        <span class="text-xl sm:text-2xl">⚡</span>
        <span>&copy; 2025 Charging Station Manager - Powering the Future</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)
const isAuthenticated = ref(false)

// Check authentication on mount
onMounted(() => {
  checkAuth()
})

function checkAuth() {
  const token = localStorage.getItem('token')
  isAuthenticated.value = !!token
  
  if (!token && route.path !== '/login' && route.path !== '/register') {
    router.push('/login')
  }
}

// Simplified navigation
function handleClick(page) {
  mobileMenuOpen.value = false
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function logout() {
  localStorage.removeItem('token')
  isAuthenticated.value = false
  router.push('/login')
}

// Watch for token changes
watch(() => localStorage.getItem('token'), (newToken) => {
  isAuthenticated.value = !!newToken
})
</script>

<style>
.nav-link {
  position: relative;
  padding: 0.25rem 1rem;
  color: rgb(55, 65, 81);
  font-weight: 600;
  transition: all 0.3s;
}

.register-btn {
  padding: 0.25rem 1.5rem;
  background: linear-gradient(to right, #2563eb, #7c3aed);
  color: white;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s;
}

.logout-btn {
  padding: 0.25rem 1.5rem;
  background-color: #ef4444;
  color: white;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s;
}
</style>
