<script lang="ts" setup>
import { mainStore } from '../store'

const store = mainStore()
const lat = ref(Number(store.userLat).toFixed(2))
const long = ref(Number(store.userLong).toFixed(2))
const forecastSize = ref(store.forecastSize)

const forecastLink = ref(`https://clearoutside.com/forecast/${lat.value}/${long.value}`)
const forecastImage = ref(`https://clearoutside.com/forecast_image_${forecastSize.value}/${lat.value}/${long.value}/forecast.png`)

watch([() => store.userLat, () => store.userLong], () => {
  lat.value = Number(store.userLat).toFixed(2)
  long.value = Number(store.userLong).toFixed(2)
  forecastLink.value = `https://clearoutside.com/forecast/${lat.value}/${long.value}`
  forecastImage.value = `https://clearoutside.com/forecast_image_${forecastSize.value}/${lat.value}/${long.value}/forecast.png` 
})

watch(() => store.forecastSize, () => {
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
          <img class="min-h-[5.5vh]" :src="forecastImage" />
        </a>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>