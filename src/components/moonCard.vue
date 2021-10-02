scripte <script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import { createMoon } from "astronomy-bundle/moon";
import { createLocation } from "astronomy-bundle/earth";
import { useMainStore } from "../store/pinia";

// The following package uses javascript 
// @ts-expect-error: the follow code is written in javascript
import { Moon, Hemisphere } from "lunarphase-js";

// Variables
const store = useMainStore()
const decimal = ref(computed(() => store.decimal))
const luna = ref(createMoon())
const lunaRA = ref({
  degree: 0,
  hour: 0,
  min: 0,
  sec: 0
})
const lunaDec = ref({
  degree: 0,
  degreeInt: 0,
  arcMin: 0,
  arcSec: 0
})
const interval = ref()
const location = ref()
const hemi = store.hemisphere ? Hemisphere.SOUTHERN : Hemisphere.NORTHERN
const phaseEmoji = Moon.lunarPhaseEmoji(new Date(), hemi)
const phase = Moon.lunarPhase(new Date(), hemi)
const lunarPercent = Math.floor(100 - Moon.lunarAgePercent(new Date(), hemi) * 100)

// Functions
const convertRA2Time = (RA: {degree: number; hour: number; min: number; sec: number}) => {
  lunaRA.value.hour = Math.floor(RA.degree/15)
  lunaRA.value.min = Math.floor((RA.degree/15 - lunaRA.value.hour) * 60)
  lunaRA.value.sec = Math.floor(((RA.degree/15 - lunaRA.value.hour) * 60 - lunaRA.value.min) * 60)
}

const convertDec2Arc = (Dec: {degree: number; degreeInt: number; arcMin: number; arcSec: number}) => {
  lunaDec.value.degreeInt = Math.floor(Dec.degree)
  lunaDec.value.arcMin = Math.floor((Dec.degree - lunaDec.value.degreeInt) * 60)
  lunaDec.value.arcSec = Math.floor(((Dec.degree - lunaDec.value.degreeInt) * 60 - lunaDec.value.arcMin) * 60)
}

const getLoc = () => {
  if ((parseFloat(store.userLat) == 0 && parseFloat(store.userLong) == 0) || (store.userLat == "" && store.userLong == "")) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        store.userLat = pos.coords.latitude.toFixed(decimal.value)
        store.userLong = pos.coords.longitude.toFixed(decimal.value)
        location.value = createLocation(pos.coords.latitude, pos.coords.longitude)
      }, () => {
        location.value = createLocation(0, 0)
      })
    } else {
      console.log("Geolocation information is not available")
    }
  } else {
    location.value = createLocation(parseFloat(store.userLat), parseFloat(store.userLong))
  }
}

const updateMoonPos = () => {
  if ((parseFloat(store.userLat) == 0 && parseFloat(store.userLong) == 0) || (store.userLat == "" && store.userLong == "")) {
    location.value = createLocation(0, 0)
  }
  luna.value = createMoon()
  luna.value.getTopocentricEquatorialSphericalCoordinates(location.value).then(result => {
    lunaRA.value.degree = parseFloat(result.rightAscension.toFixed(decimal.value))
    lunaDec.value.degree = parseFloat(result.declination.toFixed(decimal.value))
    convertRA2Time(lunaRA.value)
    convertDec2Arc(lunaDec.value)
  }, () => {
    console.log("Error getting location and/or time information")
  })
}

// Watcher functions
watch(computed(() => store.userLat), () => {
  getLoc()
})

watch(computed(() => store.userLong), () => {
  getLoc()
})

// Lifecycle hooks
onMounted(() => {
  getLoc()
  updateMoonPos()
  interval.value = setInterval(() => {
    updateMoonPos()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Luna {{ phaseEmoji }}</ion-card-title>
        <ion-card-subtitle>{{ phase }} ( {{ lunarPercent }}% )</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div v-if="store.units">
          <div class="RA_DEC">
            RA&nbsp;&nbsp;&nbsp; : <div class="noAlign">{{ lunaRA.hour }}h {{ lunaRA.min }}m {{ lunaRA.sec }}s</div>
          </div>
          <div class="RA_DEC">
            DEC : <div class="noAlign">{{ lunaDec.degreeInt }}&deg; {{ lunaDec.arcMin }}' {{ lunaDec.arcSec }}"</div>
          </div>
        </div>
        <div v-else>
          <div class="RA_DEC">
            RA&nbsp;&nbsp;&nbsp; : <div class="noAlign">{{ lunaRA.degree }}&deg;</div>
          </div>
          <div class="RA_DEC">
            DEC : <div class="noAlign">{{ lunaDec.degree }}&deg;</div>
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>

<style scoped>
.RA_DEC {
  width: 9rem;
  display: block;
}

.noAlign {
  float: right;
}
</style>