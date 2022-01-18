<script lang="ts" setup>
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonToggle, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonListHeader } from "@ionic/vue";
import { computed, ref, watch } from "vue";
import { useMainStore } from "../store/pinia";
import { usePagesStore } from "../store/pinia";
// Components
import Header from "../components/Header.vue";

const store = useMainStore()
const page = usePagesStore().pages
const title = page[page.length - 1].title
const hemisphere = ref("N")
const merd = ref("E")
const units = ref(store.units ? 'time' : 'deg')

const changeBool = (x: boolean) => {
  if (x) {
    return false
  }
  return true
}
const decOrFull = () => { store.units = changeBool(store.units) }
const northOrSouth = () => {
  store.hemisphere = changeBool(store.hemisphere)
  if (store.hemisphere) {
    store.userLat = (parseFloat(store.userLat) * -1).toFixed(store.decimal)
  } else {
    store.userLat = (Math.abs(parseFloat(store.userLat))).toFixed(store.decimal)
  }
  hemisphere.value = store.hemisphere ? "S" : "N"
}

const eastOrWest = () => {
  store.meridian = changeBool(store.meridian)
  if (store.meridian) {
    store.userLong = (parseFloat(store.userLong) * -1).toFixed(store.decimal)
  } else {
    store.userLong = (Math.abs(parseFloat(store.userLong))).toFixed(store.decimal)
  }
  merd.value = store.meridian ? "W" : "E"
}

const manualLoc = () => {
  store.manual = changeBool(store.manual)
}

// Watcher functions
watch(computed(() => store.userLat), () => {
  if (parseFloat(store.userLat) > 0 && merd.value == "S") {
    store.userLat = (parseFloat(store.userLat) * -1).toString()
  }
})

watch(computed(() => store.userLong), () => {
  if (parseFloat(store.userLong) > 0 && merd.value == "W") {
    store.userLong = (parseFloat(store.userLong) * -1).toString()
  }
})
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="title" />
      <ion-list class="noselect">
          <ion-radio-group v-model="units">
            <ion-list-header>
              <ion-label>Units : </ion-label>
            </ion-list-header>
            <ion-item>
              <ion-label>Degree &deg;</ion-label>
              <ion-radio slot="start" value="deg" @click="decOrFull"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Time 🕐</ion-label>
              <ion-radio slot="start" value="time" @click="decOrFull"></ion-radio>
            </ion-item>
          </ion-radio-group>
          <ion-radio-group v-model="store.forecastSize">
            <ion-list-header>
              <ion-label>Forecast : </ion-label>
            </ion-list-header>
            <ion-item>
              <ion-label>Small</ion-label>
              <ion-radio slot="start" value="small"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Medium</ion-label>
              <ion-radio slot="start" value="medium"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Large</ion-label>
              <ion-radio slot="start" value="large"></ion-radio>
            </ion-item>
          </ion-radio-group>
          <ion-item>
            <ion-label>Manual Coords. : </ion-label>
            <ion-toggle :checked="store.manual" @ionChange="manualLoc"></ion-toggle>
          </ion-item>
          <ion-item v-show="store.manual">
            <ion-label>Hemisphere :</ion-label>
            N &deg;
            <ion-toggle :checked="store.hemisphere" @ionChange="northOrSouth"></ion-toggle>
            S &deg;
          </ion-item>
          <ion-item v-show="store.manual">
            <ion-label>Meridian :</ion-label>
            E &deg;
            <ion-toggle :checked="store.meridian" @ionChange="eastOrWest"></ion-toggle>
            W &deg;
          </ion-item>
          <ion-item v-show="store.manual">
            <ion-label>Coordinates : </ion-label>
            <ion-input class="ion-text-right" v-model="store.userLat" type="number" placeholder="lat" min="0" max="90"></ion-input><span>{{ hemisphere }}</span>
            <ion-input class="ion-text-right" v-model="store.userLong" type="number" placeholder="long" min="0" max="180"></ion-input><span>{{ merd }}</span>
          </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.noselect:hover {
  color: var(--ion-color-primary);
}
</style>