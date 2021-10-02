<script lang="ts" setup>
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonToggle } from "@ionic/vue";
import { computed, onMounted, ref, watch } from "vue";
import { createLocation } from "astronomy-bundle/earth";
import { useMainStore } from "../store/pinia";
// Components
import Header from "../components/Header.vue";

const store = useMainStore()
const hemisphere = ref("N")
const merd = ref("E")
const location = ref()
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

const getLoc = () => {
  if ((parseFloat(store.userLat) == 0 && parseFloat(store.userLong) == 0) || (store.userLat == "" && store.userLong == "")) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        store.userLat = pos.coords.latitude.toFixed(store.decimal).toString()
        store.userLong = pos.coords.longitude.toFixed(store.decimal).toString()
        location.value = createLocation(pos.coords.latitude, pos.coords.longitude)
      })
    } else {
      console.log("Geolocation is unavailable")
    }
  } else {
    location.value = createLocation(parseFloat(store.userLat), parseFloat(store.userLong))
  }
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

// Lifecycle hooks
onMounted(() => {
  getLoc()
})
</script>

<template>
  <ion-page>
    <ion-content>
      <Header title="Settings" />
      <ion-list class="noselect">
          <ion-item>
            <ion-label>Units : </ion-label>
            Deg &deg;
            <ion-toggle :checked="store.units" @ionChange="decOrFull"></ion-toggle>
            &nbsp;Time 🕧
          </ion-item>
          <ion-item>
            <ion-label>Hemisphere :</ion-label>
            N &deg;
            <ion-toggle :checked="store.hemisphere" @ionChange="northOrSouth"></ion-toggle>
            S &deg;
          </ion-item>
          <ion-item>
            <ion-label>Meridian :</ion-label>
            E &deg;
            <ion-toggle :checked="store.meridian" @ionChange="eastOrWest"></ion-toggle>
            W &deg;
          </ion-item>
          <ion-item>
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