<script lang="ts" setup>
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonToggle, IonSelect, IonSelectOption } from "@ionic/vue";
import { computed, ref, watch } from "vue";
import { useMainStore } from "../store/pinia";
// Components
import Header from "../components/Header.vue";
import { usePagesStore } from "../store/pinia";

const store = useMainStore()
const page = usePagesStore().pages
const title = page[page.length - 1].title
const hemisphere = ref("N")
const merd = ref("E")
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
const units = ref(store.units ? 'time' : 'deg')
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="title" />
      <ion-list class="noselect">
          <ion-item>
            <ion-label>Units : </ion-label>
            <ion-select v-model="units" @ionChange="decOrFull">
              <ion-select-option value='deg'>Deg &deg;</ion-select-option>
              <ion-select-option value='time'>Time 🕑</ion-select-option>
            </ion-select>
          </ion-item>
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