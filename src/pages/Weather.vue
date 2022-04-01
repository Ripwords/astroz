<script lang="ts" setup>
import { forecast, forecastInit } from '../functions/weather'
import { pagesStore } from '../store'

const page = pagesStore().weather
const isLoaded_1 = ref(false)
const isLoaded_2 = ref(false)
const isLoaded = ref(isLoaded_1.value && isLoaded_2.value)
watchEffect(() => {
  isLoaded.value = isLoaded_1.value && isLoaded_2.value
})
const { forecastLink, forecastImage, annualDarkness } = forecast
forecastInit()
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <ion-card class="min-h-[150px]">
        <ion-card-header>
          <ion-card-header>
            <ion-card-title>Weather ☁</ion-card-title>
            <ion-card-subtitle>Your daily dose of weather information</ion-card-subtitle>
          </ion-card-header>
          <Transition appear>
            <div class="absolute left-[50%]">
              <div class="relative left-[-50%]" v-show="!isLoaded">
                <ion-spinner name="crescent" />
              </div>
            </div>
          </Transition>
        </ion-card-header>
        <ion-card-content>
          <Transition>
            <div v-show="isLoaded">
              <div class="flex justify-center mt-[-15px]">
                <a target="_blank" :href="forecastLink" rel="noopener noreferrer">
                  <img alt="forecast image" :src="forecastImage" @load="isLoaded_1 = true" />
                </a>
              </div>
              <br>
              <div class="flex justify-center">
                <img alt="annual darkness image" :src="annualDarkness" @load="isLoaded_2 = true">
              </div>
            </div>
          </Transition>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
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