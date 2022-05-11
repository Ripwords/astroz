<script lang="ts" setup>
import { mainStore } from './store'
import { toastController } from '@ionic/vue'
import { updateWeatherData } from './functions/utility';

const store = mainStore()
const interval = ref()
const locationInterval = ref()
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) { console.log('changed!!');})

// Provide basic info to first time users
const presentToast = async () => {
  const toast = await toastController
    .create({
      header: "GPS :",
      message: "If GPS data is unavailable, you can set your location manually.",
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
  await updateWeatherData(store)
})

// initializes the app
onMounted(() => {
  if (!store.manual) {
    startLocInterval()
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
  <ion-app class="noSelect">
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