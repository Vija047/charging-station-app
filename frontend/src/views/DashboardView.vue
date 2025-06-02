<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Charging Stations
            </h1>
            <p class="text-slate-600 text-lg">Manage and monitor your EV charging network</p>
          </div>
          
          <!-- Add Station Button -->
          <button
            @click="toggleForm"
            class="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-out"
          >
            <svg class="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New Station
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-green-100 rounded-xl">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-slate-800">{{ stations.length }}</p>
                <p class="text-slate-600">Total Stations</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-blue-100 rounded-xl">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-slate-800">{{ Math.floor(stations.length * 0.8) }}</p>
                <p class="text-slate-600">Active Stations</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-purple-100 rounded-xl">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold text-slate-800">{{ stations.length }}</p>
                <p class="text-slate-600">Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div 
        v-if="showForm" 
        class="mb-8 transform transition-all duration-300 ease-out"
        :class="showForm ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'"
      >
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-slate-800">
              {{ editingStation ? 'Edit Station' : 'Add New Station' }}
            </h3>
            <button
              @click="closeForm"
              class="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <StationForm
            :modelValue="editingStation"
            @update:modelValue="val => editingStation = val"
            @submit="handleSave"
            @cancel="closeForm"
          />
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Stations List -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-slate-800">Station List</h3>
            <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search stations..."
                class="bg-transparent outline-none text-slate-700 placeholder-slate-500"
              >
            </div>
          </div>

          <div class="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            <div
              v-for="station in filteredStations"
              :key="station._id"
              class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl text-white shadow-lg">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {{ station.name }}
                    </h4>
                    <p class="text-slate-600 flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {{ station.locationName }}
                    </p>
                  </div>
                </div>
                
                <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    @click="editStation(station)"
                    class="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteStation(station._id)"
                    class="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
          <h3 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            Station Map
          </h3>
          <div class="h-96 rounded-xl overflow-hidden">
            <MapView :stations="stations" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import StationForm from '../components/StationForm.vue'
import StationCard from '../components/StationCard.vue'
import MapView from '../components/MapView.vue'

const stations = ref([])
const editingStation = ref(null)
const showForm = ref(false)
const searchQuery = ref('')
const isLoading = ref(true)
const error = ref(null)

// Computed properties
const filteredStations = computed(() => {
  if (!searchQuery.value) return stations.value
  return stations.value.filter(station => 
    station.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const activeStations = computed(() => 
  stations.value.filter(station => station.status === 'Active')
)

// API Functions
const fetchStations = async () => {
  try {
    isLoading.value = true
    const response = await fetch('http://localhost:5000/api/stations')
    if (!response.ok) throw new Error('Failed to fetch stations')
    const data = await response.json()
    
    // Add location names to each station
    const stationsWithLocation = await Promise.all(
      data.map(async station => ({
        ...station,
        locationName: await getLocationName(
          station.location.latitude,
          station.location.longitude
        )
      }))
    )
    
    stations.value = stationsWithLocation
  } catch (err) {
    error.value = err.message
    console.error('Fetch error:', err)
  } finally {
    isLoading.value = false
  }
}

const saveStation = async (station) => {
  try {
    const url = station._id 
      ? `http://localhost:5000/api/stations/${station._id}`
      : 'http://localhost:5000/api/stations'
    
    const response = await fetch(url, {
      method: station._id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(station)
    })

    if (!response.ok) throw new Error('Failed to save station')
    await fetchStations() // Refresh the list
    showForm.value = false
    editingStation.value = null
  } catch (err) {
    console.error('Save error:', err)
    error.value = err.message
  }
}

const deleteStation = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/stations/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete station')
    await fetchStations() // Refresh the list
  } catch (err) {
    console.error('Delete error:', err)
    error.value = err.message
  }
}

// UI Functions
const toggleForm = () => {
  showForm.value = !showForm.value
  if (showForm.value) editingStation.value = null
}

const closeForm = () => {
  showForm.value = false
  editingStation.value = null
}

const editStation = (station) => {
  editingStation.value = { ...station }
  showForm.value = true
}

// Add geocoding function to get location name
const getLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    )
    const data = await response.json()
    return data.display_name.split(',').slice(0, 2).join(',')
  } catch (err) {
    console.error('Geocoding error:', err)
    return 'Location unavailable'
  }
}

onMounted(fetchStations)
</script>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-slate-300::-webkit-scrollbar-thumb {
  background-color: rgb(203 213 225);
  border-radius: 8px;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background-color: transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

/* Animation for form appearance */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stations {
  margin-top: 20px;
}

/* Glass morphism effect enhancement */
.bg-white\/80 {
  background-color: rgba(255, 255, 255, 0.8);
}

.bg-white\/90 {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>