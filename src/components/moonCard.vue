scripte <script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import { createMoon } from "astronomy-bundle/moon";
import { createLocation } from "astronomy-bundle/earth";
import { useMainStore } from "../store/pinia";
import { convertAlt2Arc, convertAz2Arc, convertDec2Arc, convertRA2HMS } from "../utilFunctions/convert"

// @ts-expect-error: the following package is written in javascript
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
const lunaAlt = ref({
  degree: 0,
  degreeInt: 0,
  arcMin: 0,
  arcSec: 0
})
const lunaAz = ref({
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
const lunarPercent = ref()
const nextFullMoon = ref({
  month: 0,
  day: 0,
  year: 0
})

// Functions
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
    lunaRA.value = convertRA2HMS(lunaRA.value.degree)
    lunaDec.value = convertDec2Arc(lunaDec.value.degree)
  }, () => {
    console.log("Error getting location and/or time information")
  })
  luna.value.getApparentTopocentricHorizontalCoordinates(location.value).then(result => {
    lunaAlt.value.degree = parseFloat(result.altitude.toFixed(decimal.value))
    lunaAz.value.degree = parseFloat(result.azimuth.toFixed(decimal.value))
    lunaAlt.value = convertAlt2Arc(lunaAlt.value.degree)
    lunaAz.value = convertAz2Arc(lunaAz.value.degree)
  }, () => {
    console.log("Error getting location and/or time information")
  })
  luna.value.getIlluminatedFraction().then(result => {
    lunarPercent.value = (result * 100).toFixed(2)
  })
}

const getFullMoon = () => {
  const time = luna.value.getUpcomingFullMoon().time
  nextFullMoon.value.month = time.month
  nextFullMoon.value.day = time.day
  nextFullMoon.value.year = time.year
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
  getFullMoon()
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
        <ion-card-subtitle>Next Full Moon : {{ nextFullMoon.day }}/{{ nextFullMoon.month }}/{{ nextFullMoon.year }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div v-if="!store.units">
          <div style="display: flex; justify-content: space-between; max-width: 270px;">
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>RA</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ lunaRA.degree }}&deg;</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Dec</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ lunaDec.degree }}&deg;</div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; max-width: 270px;">
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>Alt</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ lunaAlt }}&deg;</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Az</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ lunaAz }}&deg;</div>
            </div>
          </div>
        </div>
        <div v-else>

        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>