<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonInput, IonList, IonItem, IonLabel } from "@ionic/vue";
import { computed, ref } from "vue";
import Header from "../components/Header.vue";
import { usePagesStore, useMainStore } from "../store/pinia";

const store = useMainStore()
const page = usePagesStore().pages[2]
const aperture = ref("")
const tFLength = ref("")
const eyeFLength = ref("")
const mag = ref("")
const maxMag = ref("")

const getTFLength = computed(() => {
  if (mag.value != "" && eyeFLength.value != "") {
    return (parseFloat(mag.value) * parseFloat(eyeFLength.value)).toFixed(store.decimal)
  }
  return ""
})

const getEyeFLength = computed(() => {
  if (mag.value != "" && tFLength.value != "") {
    return (parseFloat(tFLength.value) / parseFloat(mag.value)).toFixed(store.decimal)
  }
  return ""
})

const getMag = computed(() => {
  if (tFLength.value != "" && eyeFLength.value != "") {
    return (parseFloat(tFLength.value) / parseFloat(eyeFLength.value))
  }
  return ""
})

const getTAperture = computed(() => {
  if (maxMag.value != "") {
    return (parseFloat(maxMag.value) / 2.5).toFixed(store.decimal)
  }
  return ""
})

const getMaxMag = computed(() => {
  if (aperture.value != "") {
    return (parseFloat(aperture.value) * 2.5)
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
          <ion-card-title>Magnification</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>🔭 Focal Length : </ion-label>
          <ion-input v-if="!getTFLength" v-model="tFLength" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getTFLength" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>👁 Focal Length : </ion-label>
          <ion-input v-if="!getEyeFLength" v-model="eyeFLength" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getEyeFLength" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>🔍 Magnification : </ion-label>
          <ion-input v-if="!getMag" v-model="mag" type="number"></ion-input> 
          <ion-input v-else :value="getMag" readonly></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Max Telescope Mag.</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-if="!getTAperture" v-model="aperture" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getTAperture" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>🔎 Max mag. : </ion-label>
          <ion-input v-if="!getMaxMag" v-model="maxMag" type="number"></ion-input>
          <ion-input v-else :value="getMaxMag" readonly></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>