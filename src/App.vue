<script lang="ts" setup>
import { IonApp, IonRouterOutlet, toastController } from "@ionic/vue";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";

const interval = ref()
const presentToast = async () => {
  const toast = await toastController
    .create({
      header: "GPS :",
      message: "If no GPS data is available, you may enter manually in the settings\n\nOtherwise Lat: 0, Long: 0 will be used",
      duration: 5000
    })
  await toast.present()
}
onMounted(() => {
  interval.value = setInterval(() => {
    presentToast()
    clearInterval(interval.value)
  }, 2000)
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
</style>