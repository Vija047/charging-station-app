<template>
  <div class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
    <div class="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
    <div class="absolute bottom-20 right-20 w-48 h-48 bg-purple-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
    <div class="absolute top-1/2 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-25 animate-pulse delay-500"></div>
    
    <form 
      @submit.prevent="handleRegister" 
      class="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6 transform hover:scale-[1.02] transition-all duration-300"
    >
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="text-4xl mb-4">⚡</div>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Join the Network
        </h2>
        <p class="text-gray-600 mt-2">Create your charging station account</p>
      </div>

      <!-- Form Fields -->
      <div class="space-y-5">
        <div class="relative group">
          <input
            v-model="name"
            type="text"
            placeholder="Full Name"
            required
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
          />
        </div>

        <div class="relative group">
          <input
            v-model="email"
            type="email"
            placeholder="Email Address"
            required
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
          />
        </div>

        <div class="relative group">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        <span v-if="!isLoading" class="flex items-center justify-center space-x-2">
          <span>Create Account</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </span>
        <span v-else class="flex items-center justify-center space-x-2">
          <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Creating Account...</span>
        </span>
      </button>

      <!-- Login Link -->
      <div class="text-center pt-4 border-t border-gray-100">
        <p class="text-gray-600">
          Already have an account? 
          <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
            Sign in here
          </router-link>
        </p>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="message" :class="messageClass" class="p-4 rounded-xl text-sm font-medium mt-2">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const message = ref('')
const messageClass = ref('')

const showMessage = (text, type = 'success') => {
  message.value = text
  messageClass.value = type === 'success' 
    ? 'bg-green-50 text-green-700 border border-green-200'
    : 'bg-red-50 text-red-700 border border-red-200'

  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const handleRegister = async () => {
  isLoading.value = true
  message.value = ''

  try {
    const response = await fetch('https://charging-station-app-bay.vercel.app/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      showMessage(`Registration failed: ${data.message || response.statusText}`, 'error')
      return
    }

    showMessage('Registration successful! Please log in.')
    
    // Clear form
    name.value = ''
    email.value = ''
    password.value = ''
  } catch (error) {
    showMessage('An error occurred: ' + error.message, 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
