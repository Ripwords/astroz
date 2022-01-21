<script lang="ts" setup>
import { mainStore, pagesStore } from '../store'
import {
  units,
  hemisphere,
  meridian,
  changeUnits,
  N_S,
  E_W,
  manualLocation,
  settingsPageInit
} from '../functions/settings'

const store = mainStore()
const page = pagesStore().pages.settings

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