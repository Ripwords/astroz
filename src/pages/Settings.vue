<script lang="ts" setup>
import { mainStore, pagesStore } from '../store'
import {
  units,
  hemisphere,
  meridian,
  changeUnits,
  updateLabels,
  manualLocation
} from '../functions/settings'
import leaflet from "leaflet"

const store = mainStore()
const dec = store.decimal
const page = pagesStore().settings
const mapRef = ref<any>()
let map: any

onMounted(() => {
  map = leaflet.map('map').setView([Number(store.userLat), Number(store.userLong)], 13)
  leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true,
    minZoom: 2
  }).addTo(map)
  const initMarker = leaflet.marker([Number(store.userLat), Number(store.userLong)]).addTo(map);

  mapRef.value.style.width = '0'
  mapRef.value.style.height = '0'
  map.invalidateSize()
  window.dispatchEvent(new Event('resize'))
  mapRef.value.style.width = '100%'
  mapRef.value.style.height = '50vh'
  map.invalidateSize()
  window.dispatchEvent(new Event('resize'))

  map.on("click", (e: any) => {
    if (Number(e.latlng.lat) >= 89.99) {
      store.userLat = Number(89.99).toFixed(dec)
    } else if (Number(e.latlng.lat) <= -89.99) {
      store.userLat = Number(-89.99).toFixed(dec)
    } else {
      store.userLat = Number(e.latlng.lat).toFixed(dec)
    }
    if (Number(e.latlng.lng) >= 179.99) {
      store.userLong = Number(179.99).toFixed(dec)
    } else if (Number(e.latlng.lng) <= -179.99) {
      store.userLong = Number(-179.99).toFixed(dec)
    } else {
      store.userLong = Number(e.latlng.lng).toFixed(dec)
    }
  })
  watchEffect(() => {
    if (store.userLat && store.userLong) {
      initMarker.setLatLng([Number(store.userLat), Number(store.userLong)])
      map.panTo([Number(store.userLat), Number(store.userLong)])
    }
  })
})
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
            <ion-label>Forecast Size :</ion-label>
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
            <ion-label>Coordinates : </ion-label>
            <ion-input class="ion-text-right" v-model="store.userLat" type="number" placeholder="lat" min="0" max="90" @ionChange="updateLabels"></ion-input><span>{{ hemisphere }}</span>
            <ion-input class="ion-text-right" v-model="store.userLong" type="number" placeholder="long" min="0" max="180" @ionChange="updateLabels"></ion-input><span>{{ meridian }}</span>
          </ion-item>
          <ion-item v-show="store.manual">
            <div id="map" ref="mapRef"></div>
          </ion-item>
          <ion-item v-show="!store.manual">
            <ion-label>Location Refresh Interval : </ion-label>
            <ion-input class="ion-text-right" v-model="store.locationInterval" type="number" placeholder="minute(s)" min="1"></ion-input><span>minute(s)</span>
          </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
#map { 
  height: 50vh; 
  width: 100%;
  background-color: rgba(255, 0, 0, 0.0);
}
</style>