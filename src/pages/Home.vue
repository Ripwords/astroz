<script lang="ts" setup>
import { VueOpenWeather } from 'vue-openweather'
import "vue-openweather/dist/style.css"
import { pagesStore, mainStore } from '../store'

const store = mainStore()
const page = pagesStore().home
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <Suspense>
        <template #default>
          <SunCard />
        </template>
        <template #fallback>
          <SunCardSkeleton />
        </template>
      </Suspense>
      <Suspense>
        <template #default>
          <MoonCard />
        </template>
        <template #fallback>
          <MoonCardSkeleton />
        </template>
      </Suspense>
      <!-- <WeatherCard /> -->
      <ion-card class="min-h-[150px]">
        <ion-card-header>
          <ion-card-title>Weather ☁</ion-card-title>
          <ion-card-subtitle>Weather Forecast</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <VueOpenWeather
            apiKey="fcd7c46a039d1f8d59ef5c1ed18f9c6d"
            :lat="store.userLat"
            :long="store.userLong"
            units="metric"
            hourly
          />
        </ion-card-content>
      </ion-card>
      <CoordCard />
      <Suspense>
        <template #default>
          <PlanetsCard />
        </template>
        <template #fallback>
          <div>...</div>
        </template>
      </Suspense>
    </ion-content>
  </ion-page>
</template>