<script lang="ts" setup>
import { mainStore } from '../store'

const store = mainStore()
const lat = ref(store.userLat)
const long = ref(store.userLong)

watch([() => store.userLat, () => store.userLong], () => {
  lat.value = store.userLat
  long.value = store.userLong
})
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Location 🗺</ion-card-title>
      <ion-card-subtitle>Your current position on Earth 🌍</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div class="flex justify-between max-w-[165px]">
        <div class="flex justify-between w-[75px]">
          <div>Latitude</div>
          <div>:</div>
        </div>
        <div>
          {{ lat }}&deg;
        </div>
      </div>
      <div class="flex justify-between max-w-[165px]">
        <div class="flex justify-between w-[75px]">
          <div>Longitude</div>
          <div>:</div>
        </div>
        <div>
          {{ long }}&deg;
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>