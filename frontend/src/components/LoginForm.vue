<template>
  <div class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50"></div>
    <div class="absolute top-20 right-20 w-72 h-72 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
    <div class="absolute bottom-20 left-20 w-48 h-48 bg-cyan-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
    <div class="absolute top-1/3 left-1/4 w-32 h-32 bg-purple-200 rounded-full opacity-25 animate-pulse delay-700"></div>
    
    <form 
      @submit.prevent="handleLogin" 
      class="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6 transform hover:scale-[1.02] transition-all duration-300"
    >
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="text-4xl mb-4">🔐</div>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p class="text-gray-600 mt-2">Sign in to your charging station account</p>
      </div>

      <!-- Form Fields -->
      <div class="space-y-5">
        <div class="relative group">
          <input
            v-model="email"
            type="email"
            placeholder="Email Address"
            required
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:bg-gray-50"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
            </svg>
          </div>
        </div>

        <div class="relative group">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            required
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:bg-gray-50"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
          >
            <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Remember me and Forgot password -->
      <div class="flex items-center justify-between">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input 
            v-model="rememberMe"
            type="checkbox" 
            class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
          />
          <span class="text-sm text-gray-600">Remember me</span>
        </label>
        <a href="#" class="text-sm text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
          Forgot password?
        </a>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        <span v-if="!isLoading" class="flex items-center justify-center space-x-2">
          <span @click="handleLogin">Sign In</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
        </span>
        <span v-else class="flex items-center justify-center space-x-2">
          <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Signing In...</span>
        </span>
      </button>

      <!-- Register Link -->
      <div class="text-center pt-4 border-t border-gray-100">
        <p class="text-gray-600">
          Don't have an account? 
          <span @click="handleRegister" class="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors">
            Create one here
          </span>
        </p>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="message" :class="messageClass" class="p-4 rounded-xl text-sm font-medium">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const message = ref('')
const messageClass = ref('')
const isAuthenticated = ref(false)

const handleRegister = () => {
  // Redirect to register page
  router.push('/register')
}

const showMessage = (text, type = 'success') => {
  message.value = text
  messageClass.value = type === 'success' 
    ? 'bg-green-50 text-green-700 border border-green-200' 
    : 'bg-red-50 text-red-700 border border-red-200'

  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const handleLogin = async () => {
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    // Store auth data
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.data))
    isAuthenticated.value = true

    showMessage('Login successful! Redirecting...', 'success')
    
    // Use router instead of window.location
    setTimeout(() => {
      router.push('/')
    }, 1000)

  } catch (error) {
    showMessage(error.message || 'Something went wrong', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
