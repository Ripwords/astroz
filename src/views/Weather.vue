<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";
import { computed, ref, watch } from "vue";
import Header from "../components/Header.vue";
import { usePagesStore, useMainStore } from "../store/pinia";

const store = useMainStore()
const page = usePagesStore().pages[1]

const lat = ref(Number(store.userLat).toFixed(2))
const long = ref(Number(store.userLong).toFixed(2))
const forecastSize = ref("large")

const forecastLink = ref(`https://clearoutside.com/forecast/${lat.value}/${long.value}`)
const forecastImage = ref(`https://clearoutside.com/forecast_image_${forecastSize.value}/${lat.value}/${long.value}/forecast.png`)
const annualDarknessImage = ref(`https://clearoutside.com/annual_darkness_image/${lat.value}/${long.value}/annual_darkness.png`)

watch([computed(() => store.userLat), computed(() => store.userLong)], () => {
  lat.value = Number(store.userLat).toFixed(2)
  long.value = Number(store.userLong).toFixed(2)
  forecastLink.value = `https://clearoutside.com/forecast/${lat.value}/${long.value}`
  forecastImage.value = `https://clearoutside.com/forecast_image_${forecastSize.value}/${lat.value}/${long.value}/forecast.png` 
})
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <ion-card>
        <ion-card-header>
          <ion-card-header>
            <ion-card-title>Weather ☁</ion-card-title>
            <ion-card-subtitle>Your daily dose of weather information</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <a target="_blank" :href="forecastLink">
              <img :src="forecastImage" />
            </a>
            <br>
            <br>
            <br>
            <img :src="annualDarknessImage">
          </ion-card-content>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
