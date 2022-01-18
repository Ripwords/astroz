<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonInput, IonList, IonItem, IonLabel } from "@ionic/vue";
import { computed, ref } from "vue";
import Header from "../components/Header.vue";
import { usePagesStore, useMainStore } from "../store/pinia";

const store = useMainStore()
const page = usePagesStore().pages[5]
const fLength = ref("")
const barlowOrReducer = ref("")
const pixelSize = ref("")

const getResolution = computed(() => {
  if (fLength.value != "" && pixelSize.value != "") {
    if (barlowOrReducer.value == "") {
      return ((parseFloat(pixelSize.value) / parseFloat(fLength.value)) * 206.265).toFixed(store.decimal)
    } else {
      return ((parseFloat(pixelSize.value) / (parseFloat(fLength.value) * parseFloat(barlowOrReducer.value))) * 206.265).toFixed(store.decimal)
    }
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
          <ion-card-title>CCD resolution</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Focal Length : </ion-label>
          <ion-input v-model="fLength" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Barlow/Reducer : </ion-label>
          <ion-input v-model="barlowOrReducer" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Pixel Size : </ion-label>
          <ion-input v-model="pixelSize" type="number" placeholder="&mu;m"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Resolution : </ion-label>
          <ion-input :value="getResolution" placeholder='"/pixel' readonly></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <br>
    </ion-content>
  </ion-page>
</template>