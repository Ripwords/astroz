<script lang="ts" setup>
import { mainStore } from './store'
import { toastController } from '@ionic/vue'
import { getWeather } from 'vue-openweather';

const store = mainStore()
const interval = ref()
const locationInterval = ref()
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) { console.log('changed!!');})

// Provide basic info to first time users
const presentToast = async () => {
  const toast = await toastController
    .create({
      header: "GPS :",
      message: "If no GPS data is available, enter manually in the settings\n\nOtherwise Lat: 0, Long: 0 will be used",
      duration: 5000
    })
  await toast.present()
}

// Function to get user's current location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates = position.coords
      store.userLat = coordinates.latitude.toFixed(store.decimal)
      store.userLong = coordinates.longitude.toFixed(store.decimal)
    })
  }
}

// Starts a 5 second loop to update user location
const startLocInterval = () => {
  getLocation()
  locationInterval.value = setInterval(() => {
    getLocation()
  }, (store.locationInterval * 1000 * 60))
}

// Watches the manual input of latitude and longitude, if so stop update location loop
watch([() => store.manual, () => store.locationInterval], () => {
  if (store.manual) {
    clearInterval(locationInterval.value)
  } else {
    clearInterval(locationInterval.value)
    startLocInterval()
  }
})

watch([() => store.userLat, () => store.userLong], async () => {
  console.log('yo get new data')
  const wData = await getWeather("fcd7c46a039d1f8d59ef5c1ed18f9c6d", store.userLat, store.userLong)
  try {
    if (Object.keys(wData.coord).length > 0) {
      store.weatherData = wData
    }
  } catch (e) {
    console.log("Can't update weather data")
  }
})

// initializes the app
onMounted(async () => {
  if (!store.manual) {
    startLocInterval()
  }
  const wData = await getWeather("fcd7c46a039d1f8d59ef5c1ed18f9c6d", store.userLat, store.userLong)
  try {
    if (Object.keys(wData.coord).length > 0) {
      store.weatherData = wData
    }
  } catch (e) {
    console.log("Can't update weather data")
  }
  if (!store.toast) {
    store.toast = !store.toast
    interval.value = setInterval(() => {
      presentToast()
      clearInterval(interval.value)
    }, 2000)

  }
})
</script>

<template>
  <ion-app>
    <ReloadPrompt />
    <ion-router-outlet />
  </ion-app>
</template>

<style>
.noSelect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.noSelect:hover {
  color: var(--ion-color-primary);
}
</style>