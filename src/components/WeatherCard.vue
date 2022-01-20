<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";
import { useMainStore } from "../store/pinia";
import { ref, watch, computed, render,  } from "vue";

const store = useMainStore()
const lat = ref(Number(store.userLat).toFixed(2))
const long = ref(Number(store.userLong).toFixed(2))
const forecastSize = ref(store.forecastSize)

const forecastLink = ref(`https://clearoutside.com/forecast/${lat.value}/${long.value}`)
const forecastImage = ref(`https://clearoutside.com/forecast_image_${forecastSize.value}/${lat.value}/${long.value}/forecast.png`)

watch([computed(() => store.userLat), computed(() => store.userLong)], () => {
  lat.value = Number(store.userLat).toFixed(2)
  long.value = Number(store.userLong).toFixed(2)
  forecastLink.value = `https://clearoutside.com/forecast/${lat.value}/${long.value}`
  forecastImage.value = `https://clearoutside.com/forecast_image_${forecastSize.value}/${lat.value}/${long.value}/forecast.png` 
})

watch(computed(() => store.forecastSize), () => {
  forecastLink.value = `https://clearoutside.com/forecast/${lat.value}/${long.value}`
  forecastImage.value = `https://clearoutside.com/forecast_image_${forecastSize.value}/${lat.value}/${long.value}/forecast.png` 
})
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Weather ☁</ion-card-title>
        <ion-card-subtitle>Weather Forecast</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <a target="_blank" :href="forecastLink">
          <img class="weather" :src="forecastImage" />
        </a>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>

<style scoped>
.weather {
  min-height: 6vh;
}
</style>