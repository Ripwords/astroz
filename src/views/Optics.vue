<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonInput, IonList, IonItem, IonLabel } from "@ionic/vue";
import { computed, ref } from "vue";
import Header from "../components/Header.vue";
import { usePagesStore, useMainStore } from "../store/pinia";

const store = useMainStore()
const page = usePagesStore().pages[1]
const aperture = ref("")
const fRatio = ref("")
const fLength = ref("")

const getAperture = computed(() => {
  if (fRatio.value != "" && fLength.value != "") {
    return (parseFloat(fLength.value) / parseFloat(fRatio.value)).toFixed(store.decimal)
  }
  return ""
})

const getFRatio = computed(() => {
  if (aperture.value != "" && fLength.value) {
    return (parseFloat(fLength.value) / parseFloat(aperture.value)).toFixed(store.decimal)
  }
  return ""
})

const getFLength = computed(() => {
  if (aperture.value != "" && fRatio.value) {
    return (parseFloat(aperture.value) * parseFloat(fRatio.value)).toFixed(store.decimal)
  }
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
          <ion-input v-if="!getFLength" v-model="fLength" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getFLength" readonly></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>