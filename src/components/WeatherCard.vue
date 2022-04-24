<script lang="ts" setup>
import { VueOpenWeather } from 'vue-openweather'
import "vue-openweather/dist/style.css"
import { mainStore } from '../store'

const store = mainStore()
const ready = ref(false)
new Promise(resolve => setTimeout(() => {
  ready.value = true
  resolve
}, 1000))
</script>

<template>
  <ion-card class="min-h-[150px]">
    <ion-card-header>
      <ion-card-title>Weather ☁</ion-card-title>
      <ion-card-subtitle>Weather Forecast</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <Transition appear>
        <div class="absolute left-[50%]">
          <div class="relative left-[-50%]" v-show="!ready">
            <ion-spinner name="crescent" />
          </div>
        </div>
      </Transition>
      <Transition appear>
        <div v-if="ready">
          <VueOpenWeather
            apiKey="fcd7c46a039d1f8d59ef5c1ed18f9c6d"
            :lat="store.userLat"
            :long="store.userLong"
            units="metric"
            hourly
          />
        </div>
      </Transition>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>