<script lang="ts" setup>
import { IonApp, IonRouterOutlet, toastController } from "@ionic/vue";
import { ref, onMounted, watch, computed } from "vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";
import { useMainStore } from "./store/pinia";

const store = useMainStore()
const decimal = store.decimal
const interval = ref()
const locInterval = ref()

const getLoc = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      store.userLat = pos.coords.latitude.toFixed(decimal)
      store.userLong = pos.coords.longitude.toFixed(decimal)
    })
  } else {
    console.log("Geolocation information is not available")
  }
}

const presentToast = async () => {
  const toast = await toastController
    .create({
      header: "GPS :",
      message: "If no GPS data is available, you may enter manually in the settings\n\nOtherwise Lat: 0, Long: 0 will be used",
      duration: 5000
    })
  await toast.present()
}

const startLocInterval = () => {
  locInterval.value = setInterval(() => {
    getLoc()
  }, 5000)
}

watch(computed(() => store.manual), () => {
  if (store.manual) {
    clearInterval(locInterval.value)
  } else {
    clearInterval(locInterval.value)
    startLocInterval()
  }
})

onMounted(() => {
  if (!store.manual) {
    getLoc()
  }
  if (!store.toast) {
    store.toast = !store.toast
    interval.value = setInterval(() => {
      presentToast()
      clearInterval(interval.value)
    }, 2000)
  }

  startLocInterval()
})
</script>

<template>
  <ion-app>
    <reload-prompt />
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<style>
.noAlign {
  float: right;
}

._ {
  border: 2px dashed red;
}
</style>