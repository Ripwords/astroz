<script lang="ts" setup>
import { mainStore } from '../store'

const store = mainStore()
const lat = ref(Number(store.userLat).toFixed(2))
const long = ref(Number(store.userLong).toFixed(2))
const forecastSize = ref(store.forecastSize)
const forecastLink = ref()
const forecastImage = ref()
const interval = ref()
const isLoaded = ref(false)

const forecast = () => {
  forecastLink.value = `https://clearoutside.com/forecast/${lat.value}/${long.value}`
  forecastImage.value = `https://clearoutside.com/forecast_image_${forecastSize.value}/${lat.value}/${long.value}/forecast.png` 
}

watch([() => store.userLat, () => store.userLong], () => {
  lat.value = Number(store.userLat).toFixed(2)
  long.value = Number(store.userLong).toFixed(2)
  forecast()
})

watch(() => store.forecastSize, () => {
  forecast()
})

onMounted(() => {
  forecast()
  interval.value = setInterval(() => {
    forecast()
  }, 1800000)
})

onUnmounted(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <ion-card class="min-h-[150px]">
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Weather ☁</ion-card-title>
        <ion-card-subtitle>Weather Forecast</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <Transition appear>
          <div class="absolute left-[50%]">
            <div class="relative left-[-50%]" v-show="!isLoaded">
              <ion-spinner name="crescent" />
            </div>
          </div>
        </Transition>
        <Transition>
          <div class="" v-show="isLoaded">
            <a target="_blank" :href="forecastLink" rel="noopener noreferrer">
              <img alt="forecast image" :src="forecastImage" @load="isLoaded = true" />
            </a>
          </div>
        </Transition>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>