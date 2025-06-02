<template>
  <div class="relative w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
    <!-- Enhanced Map Header with Glassmorphism -->
    <div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white relative overflow-hidden">
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div class="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div class="absolute bottom-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div class="relative z-10 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Station Network
            </h3>
            <p class="text-white/90 text-base font-medium">{{ stationCount }} charging stations monitored</p>
          </div>
        </div>
        
        <!-- Enhanced Map Controls -->
        <div class="flex items-center space-x-3">
          <button 
            @click="centerMap"
            class="group p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105"
            title="Center Map"
          >
            <svg class="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
          <button 
            @click="toggleFullscreen"
            class="group p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105"
            title="Toggle Fullscreen"
          >
            <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Enhanced Status Legend with Cards -->
      <div class="relative z-10 flex items-center justify-between mt-6">
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-3 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <div class="relative">
              <div class="w-4 h-4 bg-emerald-400 rounded-full shadow-lg animate-pulse"></div>
              <div class="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <span class="text-white font-semibold">Active</span>
            <span class="bg-emerald-400 text-emerald-900 px-2 py-1 rounded-full text-sm font-bold">{{ activeCount }}</span>
          </div>
          <div class="flex items-center space-x-3 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <div class="w-4 h-4 bg-red-400 rounded-full shadow-lg opacity-75"></div>
            <span class="text-white font-semibold">Inactive</span>
            <span class="bg-red-400 text-red-900 px-2 py-1 rounded-full text-sm font-bold">{{ inactiveCount }}</span>
          </div>
        </div>
        
        <!-- Power Indicator -->
        <div class="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
          </svg>
          <span class="text-white font-semibold">{{ totalPower }}kW</span>
        </div>
      </div>
    </div>

    <!-- Enhanced Map Container -->
    <div class="relative">
      <div 
        id="map" 
        :class="isFullscreen ? 'fixed inset-0 z-50' : 'h-[500px]'"
        class="w-full transition-all duration-500 ease-out relative overflow-hidden"
      ></div>
      
      <!-- Modern Loading Overlay -->
      <div v-if="isLoading" class="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-md flex items-center justify-center">
        <div class="text-center">
          <div class="relative mb-6">
            <div class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div class="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-700 mb-2">Loading Station Network</h3>
          <p class="text-gray-500">Discovering charging stations...</p>
          <div class="flex justify-center space-x-1 mt-4">
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-purple-600 rounded-full animate-bounce animation-delay-100"></div>
            <div class="w-2 h-2 bg-pink-600 rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>
      </div>

      <!-- Enhanced No Data State -->
      <div v-if="!isLoading && stationCount === 0" class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="text-center py-16 px-8">
          <div class="text-8xl mb-6 animate-bounce">⚡</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-3">No Stations Available</h3>
          <p class="text-gray-600 text-lg mb-6 max-w-md">Your charging network is ready to grow. Add your first station to begin monitoring.</p>
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-block cursor-pointer">
            Add First Station
          </div>
        </div>
      </div>

      <!-- Floating Station Counter -->
      <div v-if="!isLoading && stationCount > 0" class="absolute top-4 left-4 z-10">
        <div class="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-gray-800">{{ stationCount }} stations</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Map Stats Footer -->
    <div class="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-8 text-gray-700">
          <div class="flex items-center space-x-2">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Center Location</p>
              <p class="font-semibold">Bengaluru, Karnataka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const props = defineProps({
  stations: {
    type: Array,
    default: () => []
  }
})

let map = null
const isLoading = ref(true)
const isFullscreen = ref(false)

// Computed properties
const stationCount = computed(() => props.stations.length)
const activeCount = computed(() => props.stations.filter(s => s.status === 'Active').length)
const inactiveCount = computed(() => props.stations.filter(s => s.status === 'Inactive').length)
const totalPower = computed(() => props.stations.reduce((sum, s) => sum + (Number(s.powerOutput) || 0), 0))

const initializeMap = () => {
  if (typeof window === 'undefined') return
  
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView([12.9716, 77.5946], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  L.control.zoom({ position: 'bottomright' }).addTo(map)
  
  updateMarkers()
  isLoading.value = false
}

const updateMarkers = () => {
  if (!map) return

  // Clear existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer)
    }
  })

  // Add markers for each station
  props.stations.forEach(station => {
    if (station.location && station.location.latitude && station.location.longitude) {
      const marker = L.marker([station.location.latitude, station.location.longitude])
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${station.name}</h3>
            <p>Status: ${station.status}</p>
            <p>Power: ${station.powerOutput}kW</p>
          </div>
        `)
    }
  })

  // Fit bounds if there are stations
  if (props.stations.length > 0) {
    const bounds = L.latLngBounds(props.stations
      .filter(s => s.location && s.location.latitude && s.location.longitude)
      .map(s => [s.location.latitude, s.location.longitude]))
    map.fitBounds(bounds, { padding: [50, 50] })
  }
}

// Watch for changes in stations prop
watch(() => props.stations, updateMarkers, { deep: true })

onMounted(() => {
  initializeMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

// Map controls
const centerMap = () => {
  if (map) map.setView([12.9716, 77.5946], 12)
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  setTimeout(() => map?.invalidateSize(), 100)
}

defineExpose({
  centerMap,
  toggleFullscreen
})
</script>

<style scoped>
.modern-popup .leaflet-popup-content-wrapper {
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
}
.modern-popup .leaflet-popup-tip {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
.custom-div-icon {
  background: none;
  border: none;
}
.leaflet-control-zoom a {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #374151;
  font-weight: bold;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  line-height: 38px;
  margin: 2px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}
.leaflet-control-zoom a:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.2);
}
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>