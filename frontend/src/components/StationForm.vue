<template>
  <div class="min-h-screen p-6 bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
    <div class="absolute top-10 left-10 w-56 h-56 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
    <div class="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
    <div class="absolute top-1/2 right-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-25 animate-pulse"></div>

    <form @submit.prevent="handleSubmit" class="relative z-10 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 space-y-6 w-full max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
      <div class="text-center mb-8">
        <div class="text-4xl mb-4">⚡</div>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Add New Charging Station
        </h2>
        <p class="text-gray-600 mt-2">Configure your charging station details</p>
      </div>

      <div class="space-y-5">
        <div class="relative group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Station Name</label>
          <input
            v-model="station.name"
            type="text"
            placeholder="Enter station name"
            required
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:bg-gray-50"
          />
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-semibold text-gray-700">Choose Location</label>
            <button
              type="button"
              @click="getCurrentLocation"
              class="flex items-center space-x-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Use Current Location</span>
            </button>
          </div>

          <div class="relative">
            <div
              ref="mapRef"
              class="h-80 w-full rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg"
            ></div>
            <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-gray-700 shadow-lg">
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span class="font-medium">Click on map to select location</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Power Output Field -->
        <div class="relative group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Power Output (kW)</label>
          <input
            v-model="station.powerOutput"
            type="number"
            min="0"
            step="0.1"
            required
            placeholder="Enter power output"
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <!-- Connector Type Field -->
        <div class="relative group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Connector Type</label>
          <select
            v-model="station.connectorType"
            required
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select connector type</option>
            <option value="Type 2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
          </select>
        </div>

        <!-- Status Field -->
        <div class="relative group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            v-model="station.status"
            required
            class="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="text-center">
        <button
          :disabled="isLoading"
          type="submit"
          class="inline-flex justify-center items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition duration-200"
        >
          <span v-if="!isLoading">Save Station</span>
          <span v-else>Saving...</span>
        </button>
      </div>

      <p v-if="message" :class="['text-center font-semibold', messageType === 'error' ? 'text-red-600' : 'text-emerald-600']">
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'ChargingStationForm',
  setup() {
    const station = reactive({
      name: '',
      latitude: null,
      longitude: null,
      powerOutput: '',
      connectorType: '',
      status: 'Active'
    });

    const isLoading = ref(false);
    const message = ref('');
    const messageType = ref('success');
    const mapRef = ref(null);
    let mapInstance = null;
    let marker = null;

    const showMessage = (text, type = 'success') => {
      message.value = text;
      messageType.value = type;
      setTimeout(() => (message.value = ''), 5000);
    };

    const handleSubmit = async () => {
      if (!station.latitude || !station.longitude) {
        showMessage('Please select a location on the map', 'error');
        return;
      }

      isLoading.value = true;
      message.value = '';

      try {
        const response = await fetch('http://localhost:5000/api/stations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: station.name,
            location: {
              latitude: station.latitude,
              longitude: station.longitude
            },
            status: station.status,
            powerOutput: parseFloat(station.powerOutput),
            connectorType: station.connectorType
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to create station');
        }

        showMessage('Station added successfully!', 'success');
        resetForm();
      } catch (err) {
        console.error('Error:', err);
        showMessage(err.message || 'Failed to save station', 'error');
      } finally {
        isLoading.value = false;
      }
    };

    const resetForm = () => {
      Object.assign(station, {
        name: '',
        latitude: null,
        longitude: null,
        powerOutput: '',
        connectorType: '',
        status: 'Active'
      });

      if (marker && mapInstance) {
        mapInstance.removeLayer(marker);
        marker = null;
      }
    };

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const { latitude, longitude } = coords;
            if (mapInstance) {
              mapInstance.setView([latitude, longitude], 15);
              if (marker) mapInstance.removeLayer(marker);
              marker = window.L.marker([latitude, longitude])
                .addTo(mapInstance)
                .bindPopup(`📍 Current Location<br>Lat: ${latitude.toFixed(6)}<br>Lng: ${longitude.toFixed(6)}`)
                .openPopup();
              station.latitude = parseFloat(latitude.toFixed(6));
              station.longitude = parseFloat(longitude.toFixed(6));
            }
          },
          () => showMessage('Unable to get your location. Please select manually on the map.', 'error')
        );
      } else {
        showMessage('Geolocation is not supported by this browser.', 'error');
      }
    };

    onMounted(() => {
      if (!window.L) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    });

    const initMap = () => {
      const defaultLat = 12.9716;
      const defaultLng = 77.5946;

      mapInstance = window.L.map(mapRef.value).setView([defaultLat, defaultLng], 13);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      mapInstance.on('click', (e) => {
        const { lat, lng } = e.latlng;
        if (marker) mapInstance.removeLayer(marker);
        marker = window.L.marker([lat, lng])
          .addTo(mapInstance)
          .bindPopup(`📍 Selected Location<br>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`)
          .openPopup();

        station.latitude = parseFloat(lat.toFixed(6));
        station.longitude = parseFloat(lng.toFixed(6));
      });
    };

    return {
      station,
      mapRef,
      handleSubmit,
      isLoading,
      getCurrentLocation,
      message,
      messageType,
    };
  }
};
</script>
