<template>
  <div v-if="stations.length" class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6">
    <div
      v-for="station in stations"
      :key="station._id"
      class="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50/30 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
    >
      <!-- Animated background gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <!-- Status indicator glow -->
      <div 
        :class="station.status === 'Active' 
          ? 'absolute top-3 right-3 sm:top-4 sm:right-4 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse' 
          : 'absolute top-3 right-3 sm:top-4 sm:right-4 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50'"
      ></div>
      
      <div class="relative p-4 sm:p-6">
        <!-- Header section -->
        <div class="mb-4 sm:mb-6">
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 pr-6">
            {{ station.name }}
          </h3>
          <div class="flex items-center space-x-2">
            <div 
              :class="station.status === 'Active' 
                ? 'px-2.5 py-1 sm:px-3 sm:py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-medium border border-emerald-200' 
                : 'px-2.5 py-1 sm:px-3 sm:py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-medium border border-red-200'"
            >
              {{ station.status }}
            </div>
          </div>
        </div>
        
        <!-- Stats grid -->
        <div class="space-y-3 sm:space-y-4">
          <div class="flex items-center justify-between p-2.5 sm:p-3 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-100">
            <div class="flex items-center space-x-2 sm:space-x-3">
              <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-md sm:rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                </svg>
              </div>
              <span class="text-gray-600 font-medium text-sm sm:text-base">Power</span>
            </div>
            <span class="font-bold text-gray-900 text-sm sm:text-base">{{ station.powerOutput }} kW</span>
          </div>
          
          <div class="flex items-center justify-between p-2.5 sm:p-3 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-100">
            <div class="flex items-center space-x-2 sm:space-x-3">
              <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-md sm:rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"/>
                </svg>
              </div>
              <span class="text-gray-600 font-medium text-sm sm:text-base">Connector</span>
            </div>
            <span class="font-bold text-gray-900 text-sm sm:text-base">{{ station.connectorType }}</span>
          </div>
          
          <div class="p-2.5 sm:p-3 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-100">
            <div class="flex items-center space-x-2 sm:space-x-3 mb-2">
              <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-md sm:rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </div>
              <span class="text-gray-600 font-medium text-sm sm:text-base">Location</span>
            </div>
            <div class="text-xs sm:text-sm font-mono text-gray-700 bg-gray-50 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg break-all">
              {{ station.location.latitude.toFixed(5) }}, {{ station.location.longitude.toFixed(5) }}
            </div>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            @click="$emit('edit', station)"
            class="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:from-amber-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            <span>Edit</span>
          </button>
          <button
            @click="handleDelete(station._id)"
            class="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:from-red-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z"/>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Empty state -->
  <div v-else class="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] p-6 sm:p-8">
    <div class="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 sm:mb-6">
      <svg class="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
      </svg>
    </div>
    <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Charging Stations</h3>
    <p class="text-gray-500 text-center max-w-md text-sm sm:text-base px-4">
      No charging stations found. Start by adding your first station to see it appear here.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stations = ref([])
const error = ref(null)

const fetchStations = async () => {
  try {
    const response = await fetch('https://charging-station-app-git-main-vijays-projects-f149edb1.vercel.app/api/stations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!response.ok) throw new Error('Failed to fetch stations')
    const data = await response.json()
    stations.value = data
  } catch (err) {
    error.value = err.message
    console.error('Fetch error:', err)
  }
}

const handleDelete = async (id) => {
  try {
    const response = await fetch(`https://charging-station-app-git-main-vijays-projects-f149edb1.vercel.app/api/stations/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!response.ok) throw new Error('Failed to delete station')
    await fetchStations() // Refresh the list after deletion
  } catch (err) {
    error.value = err.message
    console.error('Delete error:', err)
  }
}

onMounted(fetchStations)
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.card-float {
  animation: float 6s ease-in-out infinite;
}

/* Custom scrollbar for any overflow areas */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>