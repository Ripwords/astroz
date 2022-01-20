<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonInput, IonList, IonItem, IonLabel } from "@ionic/vue";
import { computed, ref } from "vue";
import Header from "../components/Header.vue";
import { usePagesStore, useMainStore } from "../store/pinia";

const store = useMainStore()
const page = usePagesStore().pages[2]
const aperture = ref("")
const fRatio = ref("")
const fLength_1 = ref("")
const fLength_2 = ref("")
const eyeFOV = ref("")
const eyeFLength = ref("")
const actualFOV = ref("")

const getAperture = computed(() => {
  if (fRatio.value != "" && fLength_1.value != "") {
    return (parseFloat(fLength_1.value) / parseFloat(fRatio.value)).toFixed(store.decimal)
  }
  return ""
})

const getFRatio = computed(() => {
  if (aperture.value != "" && fLength_1.value) {
    return (parseFloat(fLength_1.value) / parseFloat(aperture.value)).toFixed(store.decimal)
  }
  return ""
})

const getFLength_1 = computed(() => {
  if (aperture.value != "" && fRatio.value) {
    return (parseFloat(aperture.value) * parseFloat(fRatio.value)).toFixed(store.decimal)
  }
  return ""
})

const getEyeFOV = computed(() => {
  if (eyeFLength.value != "" && fLength_2.value != "" && actualFOV.value != "") {
    return (parseFloat(actualFOV.value) * (parseFloat(fLength_2.value) / parseFloat(eyeFLength.value))).toFixed(store.decimal)
  }
  return ""
})

const getEyeFLength = computed(() => {
  if (eyeFOV.value != "" && fLength_2.value != "" && actualFOV.value != "") {
    return (parseFloat(actualFOV.value) * parseFloat(fLength_2.value) / parseFloat(eyeFOV.value)).toFixed(store.decimal)
  }
  return ""
})

const getFLength_2 = computed(() => {
  if (eyeFOV.value != "" && eyeFLength.value != "" && actualFOV.value != "") {
    return (parseFloat(eyeFLength.value) * parseFloat(eyeFOV.value) / parseFloat(actualFOV.value)).toFixed(store.decimal)
  }
  return ""
})

const getActualFOV = computed(() => {
  if (eyeFOV.value != "" && eyeFLength.value != "" && fLength_2.value != "") {
    return (parseFloat(eyeFOV.value) / (parseFloat(fLength_2.value) / parseFloat(eyeFLength.value))).toFixed(store.decimal)
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
          <ion-card-title>Focal Length</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-if="!getAperture" v-model="aperture" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getAperture" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>F/ : </ion-label>
          <ion-input v-if="!getFRatio" v-model="fRatio" type="number" placeholder="Focal Ratio"></ion-input>
          <ion-input v-else :value="getFRatio" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Focal Length : </ion-label>
          <ion-input v-if="!getFLength_1" v-model="fLength_1" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getFLength_1" readonly></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>True Field of View</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Eyepiece FOV : </ion-label>
          <ion-input v-if="!getEyeFOV" v-model="eyeFOV" type="number" placeholder="&deg;"></ion-input>
          <ion-input v-else :value="getEyeFOV" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Eyepiece Focal Length : </ion-label>
          <ion-input v-if="!getEyeFLength" v-model="eyeFLength" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getEyeFLength" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Focal Length : </ion-label>
          <ion-input v-if="!getFLength_2" v-model="fLength_2" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getFLength_2" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Actual FOV : </ion-label>
          <ion-input v-if="!getActualFOV" v-model="actualFOV" type="number" placeholder="&deg;"></ion-input>
          <ion-input v-else :value="getActualFOV" readonly></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <br>
    </ion-content>
  </ion-page>
</template>