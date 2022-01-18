<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonInput, IonList, IonItem, IonLabel } from "@ionic/vue";
import { computed, ref } from "vue";
import Header from "../components/Header.vue";
import { usePagesStore, useMainStore } from "../store/pinia";

const store = useMainStore()
const page = usePagesStore().pages[4]
const aperture = ref("")
const smallAperture = ref("")

const dawesLimit = computed(() => {
  if (aperture.value != "") {
    return (116 / parseFloat(aperture.value)).toFixed(store.decimal)
  }
  return ""
})

const rayleighLimit = computed(() => {
  if (aperture.value != "") {
    return (138 / parseFloat(aperture.value)).toFixed(store.decimal)
  }
  return ""
})

const magnitudeLimit = computed(() => {
  if (aperture.value != "") {
    return (7.7 + ( 5 * Math.log10(parseFloat(aperture.value) / 10))).toFixed(store.decimal)
  }
  return ""
})

const lightGraspRatio = computed(() => {
  if (aperture.value != "" && smallAperture.value != "") {
    return (Math.pow(parseFloat(aperture.value), 2) / Math.pow(parseFloat(smallAperture.value), 2)).toFixed(store.decimal)
  }
  return ""
})

</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <ion-card>
        <ion-card-header>
          <ion-card-title>Dawes' Limit</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-model="aperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Max. Resolution : </ion-label>
          <ion-input :value="dawesLimit" readonly placeholder="arc seconds"></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Rayleigh Limit</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-model="aperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Max. Resolution : </ion-label>
          <ion-input :value="rayleighLimit" readonly placeholder="arc seconds"></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Limiting Magnitude</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-model="aperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Limiting Mag. : </ion-label>
          <ion-input :value="magnitudeLimit" readonly placeholder="Magnitude"></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Light Grasp Ratio</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Larger aperture : </ion-label>
          <ion-input v-model="aperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Sller aperture : </ion-label>
          <ion-input v-model="smallAperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Ratio : </ion-label>
          <ion-input :value="lightGraspRatio" readonly placeholder="X"></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <br>
    </ion-content>
  </ion-page>
</template>