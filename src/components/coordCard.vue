<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";
import { useMainStore } from "../store/pinia";
import { ref, watch, computed } from "vue";

const store = useMainStore()
const lat = ref(store.userLat)
const long = ref(store.userLong)

watch([computed(() => store.userLat), computed(() => store.userLong)], () => {
  lat.value = store.userLat
  long.value = store.userLong
})
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Coordinates 🗺</ion-card-title>
        <ion-card-subtitle>Your current location on Earth 🌍</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div style="display: flex; justify-content: space-between; max-width: 150px;">
          <div style="display: flex; justify-content: space-between; width: 75px;">
            <div>Latitude</div>
            <div>:</div>
          </div>
          <div>
            {{ lat }}&deg;
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; max-width: 150px;">
          <div style="display: flex; justify-content: space-between; width: 75px;">
            <div>Longitude</div>
            <div>:</div>
          </div>
          <div>
            {{ long }}&deg;
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>