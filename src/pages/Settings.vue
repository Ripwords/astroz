<script lang="ts" setup>
import { mainStore, pagesStore } from '../store'
import { changeBool } from '../functions/utility'

const store = mainStore()
const page = pagesStore().pages.settings
const dec = store.decimal
const hemisphere = ref(store.hemisphere ? 'S' : 'N')
const meridian = ref(store.meridian ? 'W' : 'E')
const units = ref(store.units ? 'time' : 'deg')

const changeUnits = () => store.units = changeBool(store.units)

const N_S = () => {
  store.hemisphere = changeBool(store.hemisphere)
  if (store.hemisphere) {
    store.userLat = (Number(store.userLat) * -1).toFixed(dec)
  } else {
    store.userLat = (Math.abs(Number(store.userLat))).toFixed(dec)
  }
  hemisphere.value = store.hemisphere ? 'S' : 'N'
}

const E_W = () => {
  store.meridian = changeBool(store.meridian)
  if (store.meridian) {
    store.userLong = (Number(store.userLong) * -1).toFixed(dec)
  } else {
    store.userLong = (Math.abs(Number(store.userLong))).toFixed(dec)
  }
  meridian.value = store.meridian ? 'W' : 'E'
}

const manualLocation = () => store.manual = changeBool(store.manual)

// Fail safe to prevent cached location to override manual location
const settingsPageInit = () =>{
  if (hemisphere.value == "S" && Number(store.userLat) > 0) {
    store.userLat = (Number(store.userLat) * -1).toFixed(dec)
  }
  
  if (meridian.value == "W" && Number(store.userLong) > 0) {
    store.userLong = (Number(store.userLong) * -1).toFixed(dec)
  }
}

settingsPageInit()
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <ion-list class="noSelect">
          <ion-item>
            <ion-label>Units :</ion-label>
            <ion-select v-model="units" interface="action-sheet" @ionChange="changeUnits">
              <ion-select-option value="deg">Degree &deg;</ion-select-option>
              <ion-select-option value="time">Time 🕔</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Forecast :</ion-label>
            <ion-select v-model="store.forecastSize" interface="action-sheet">
              <ion-select-option value="small">Small</ion-select-option>
              <ion-select-option value="medium">Medium</ion-select-option>
              <ion-select-option value="large">Large</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Manual Coordinates : </ion-label>
            <ion-toggle :checked="store.manual" @ionChange="manualLocation"></ion-toggle>
          </ion-item>
          <ion-item v-show="store.manual">
            <ion-label>Hemisphere :</ion-label>
            N &deg;
            <ion-toggle :checked="store.hemisphere" @ionChange="N_S"></ion-toggle>
            S &deg;
          </ion-item>
          <ion-item v-show="store.manual">
            <ion-label>Meridian :</ion-label>
            E &deg;
            <ion-toggle :checked="store.meridian" @ionChange="E_W"></ion-toggle>
            W &deg;
          </ion-item>
          <ion-item v-show="store.manual">
            <ion-label>Coordinates : </ion-label>
            <ion-input class="ion-text-right" v-model="store.userLat" type="number" placeholder="lat" min="0" max="90"></ion-input><span>{{ hemisphere }}</span>
            <ion-input class="ion-text-right" v-model="store.userLong" type="number" placeholder="long" min="0" max="180"></ion-input><span>{{ meridian }}</span>
          </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>