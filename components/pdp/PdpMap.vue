<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">موقعیت اقامتگاه</h2>
    <p class="text-l text-gray-500 mb-8">موقعیت مکانی دقیق هاستل پس از رزرو کامل ارسال خواهد شد.</p>
    
    <!-- First divider -->
    <div class="w-32 h-px bg-gray-200 mb-8"></div>
    
    <!-- Map Container -->
    <div class="w-full h-[400px] rounded-xl overflow-hidden">
      <div id="map" class="w-full h-full"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  radius: {
    type: Number,
    default: 500 // Default radius in meters
  }
});

let map = null;
let marker = null;
let circle = null;

onMounted(() => {
  // Load Leaflet dynamically
  const loadLeaflet = async () => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    
    script.onload = () => {
      initMap();
    };
    
    document.head.appendChild(script);
  };

  loadLeaflet();
});

const initMap = () => {
  // Initialize map
  map = L.map('map').setView([props.latitude, props.longitude], 15);
  
  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Add marker
  marker = L.marker([props.latitude, props.longitude]).addTo(map);
  
  // Add circle to show approximate location
  circle = L.circle([props.latitude, props.longitude], {
    color: '#3b82f6',
    fillColor: '#3b82f6',
    fillOpacity: 0.2,
    radius: props.radius
  }).addTo(map);
  
  // Add popup
  marker.bindPopup(`
    <div class="text-center">
      <h3 class="font-bold text-gray-900">${props.title}</h3>
      <p class="text-gray-600">${props.address}</p>
    </div>
  `).openPopup();
};

// Watch for prop changes
watch(() => props.latitude, (newVal) => {
  if (map && marker && circle) {
    const newLatLng = L.latLng(newVal, props.longitude);
    marker.setLatLng(newLatLng);
    circle.setLatLng(newLatLng);
    map.setView(newLatLng, map.getZoom());
  }
});

watch(() => props.longitude, (newVal) => {
  if (map && marker && circle) {
    const newLatLng = L.latLng(props.latitude, newVal);
    marker.setLatLng(newLatLng);
    circle.setLatLng(newLatLng);
    map.setView(newLatLng, map.getZoom());
  }
});

watch(() => props.radius, (newVal) => {
  if (circle) {
    circle.setRadius(newVal);
  }
});
</script>

<style>
#map {
  z-index: 1;
}
</style> 