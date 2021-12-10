<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";
import { createSun } from "astronomy-bundle/sun";
import { createLocation } from "astronomy-bundle/earth";
import { computed, onUnmounted, ref, watch } from "vue";
import { useMainStore } from "../store/pinia";
import { convertAlt2Arc, convertAz2Arc } from "../utilFunctions/convert";

// Variables
const store = useMainStore()
const decimal = ref(computed(() => store.decimal))
const sol = ref(createSun())
const solRA = ref({
  degree: 0,
  hour: 0,
  min: 0,
  sec: 0
})
const solDec = ref({
  degree: 0,
  degreeInt: 0,
  arcMin: 0,
  arcSec: 0
})
const solAlt = ref({
  degree: 0,
  degreeInt: 0,
  arcMin: 0,
  arcSec: 0
})
const solAz = ref({
  degree: 0,
  degreeInt: 0,
  arcMin: 0,
  arcSec: 0
})
const interval = ref()
const location = ref(createLocation(parseFloat(store.userLat), parseFloat(store.userLong)))
const sunRise = ref("")
const sunSet = ref("")
const sunRiseTimes = ref({
  month: 0,
  day: 0,
  year: 0,
  hour: 0,
  min: 0,
  sec: 0
})
const sunSetTimes = ref({
  month: 0,
  day: 0,
  year: 0,
  hour: 0,
  min: 0,
  sec: 0
})

// Functions
const convertRA2Time = (RA: {degree: number; hour: number; min: number; sec: number}) => {
  solRA.value.hour = Math.floor(RA.degree/15)
  solRA.value.min = Math.floor((RA.degree/15 - solRA.value.hour) * 60)
  solRA.value.sec = Math.floor(((RA.degree/15 - solRA.value.hour) * 60 - solRA.value.min) * 60)
}

const convertDec2Arc = (Dec: {degree: number; degreeInt: number; arcMin: number; arcSec: number}) => {
  solDec.value.degreeInt = Math.floor(Dec.degree)
  solDec.value.arcMin = Math.floor((Dec.degree - solDec.value.degreeInt) * 60)
  solDec.value.arcSec = Math.floor(((Dec.degree - solDec.value.degreeInt) * 60 - solDec.value.arcMin) * 60)
}

const updateSolPos = async () => {
  sol.value = createSun()
  const resultRD = await sol.value.getTopocentricEquatorialSphericalCoordinates(location.value)
  solRA.value.degree = parseFloat(resultRD.rightAscension.toFixed(decimal.value))
  solDec.value.degree = parseFloat(resultRD.declination.toFixed(decimal.value))
  convertRA2Time(solRA.value)
  convertDec2Arc(solDec.value)

  const resultAltAz = await sol.value.getApparentTopocentricHorizontalCoordinates(location.value)
  solAlt.value.degree = parseFloat(resultAltAz.altitude.toFixed(decimal.value))
  solAz.value.degree = parseFloat(resultAltAz.azimuth.toFixed(decimal.value))
  convertAlt2Arc(solAlt.value.degree)
  convertAz2Arc(solAz.value.degree)
}

const getSunTimes = async () => {
  const rise = await sol.value.getRiseUpperLimb(location.value)
  const set = await sol.value.getSetUpperLimb(location.value)
  return {
    rise,
    set
  }
}

// component setup
const r = await getSunTimes()
await updateSolPos()
interval.value = setInterval(async () => {
  await updateSolPos()
}, 1000)
const rise = r.rise
const set = r.set
sunRiseTimes.value.month = rise.time.month
sunRiseTimes.value.day = rise.time.day
sunRiseTimes.value.year = rise.time.year
sunRiseTimes.value.hour = rise.time.hour
sunRiseTimes.value.min = rise.time.min
sunRiseTimes.value.sec = rise.time.sec
const riseTime = (new Date(`${sunRiseTimes.value.month}/${sunRiseTimes.value.day}/${sunRiseTimes.value.year} ${sunRiseTimes.value.hour}:${sunRiseTimes.value.min}:${sunRiseTimes.value.sec} UTC`)).toString().split(" ")
sunRise.value = `${riseTime[0]}, ${riseTime[4]}`

sunSetTimes.value.month = set.time.month
sunSetTimes.value.day = set.time.day
sunSetTimes.value.year = set.time.year
sunSetTimes.value.hour = set.time.hour
sunSetTimes.value.min = set.time.min
sunSetTimes.value.sec = set.time.sec
const setTime = (new Date(`${sunSetTimes.value.month}/${sunSetTimes.value.day}/${sunSetTimes.value.year} ${sunSetTimes.value.hour}:${sunSetTimes.value.min}:${sunSetTimes.value.sec} UTC`)).toString().split(" ")
sunSet.value = `${setTime[0]}, ${setTime[4]}`

// Watcher functions
watch(computed(() => store.userLat), () => {
  location.value = createLocation(parseFloat(store.userLat), parseFloat(store.userLong))
  getSunTimes()
})

watch(computed(() => store.userLong), () => {
  location.value = createLocation(parseFloat(store.userLat), parseFloat(store.userLong))
  getSunTimes()
})

onUnmounted(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Sol 🔆</ion-card-title>
        <ion-card-subtitle>Shining as always</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div style="display: flex; justify-content: flex-start; max-width: 175px;">
          <div style="display: flex; justify-content: space-between; width: 40px">
            <div>Rise</div>
            <div>:</div>
          </div>
          <span style="width: 10px;"></span>
          <div>&nbsp;{{ sunRise }}</div>
        </div>
        <div style="display: flex; justify-content: flex-start; max-width: 175px;">
          <div style="display: flex; justify-content: space-between; width: 40px">
            <div>Set</div>
            <div>:</div>
          </div>
          <span style="width: 10px;"></span>
          <div>&nbsp;{{ sunSet }}</div>
        </div>
        <br>
        <div v-if="!store.units">
          <div style="display: flex; justify-content: space-between; max-width: 275px;">
            <div style="display: flex; justify-content: flex-start; width: 135px; margin-bottom: 5%;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>RA</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ solRA.degree }}&deg;</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Dec</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ solDec.degree }}&deg;</div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; max-width: 275px;">
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>Alt</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ solAlt.degree }}&deg;</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Az</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ solAz.degree }}&deg;</div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="display: flex; justify-content: space-between; max-width: 285px;">
            <div style="display: flex; justify-content: flex-start; width: 135px; margin-bottom: 5%;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>RA</div>
                <div>:</div>
              </div>
              <span style="width: 4px;"></span>
              <div class="noAlign">{{ solRA.hour }}<sub>h</sub> {{ solRA.min }}<sub>m</sub> {{ solRA.sec }}<sub>s</sub></div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Dec</div>
                <div>:</div>
              </div>
              <span style="width: 4px;"></span>
              <div class="noAlign">{{ solDec.degreeInt }}&deg; {{ solDec.arcMin }}' {{ solDec.arcSec }}"</div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; max-width: 285px;">
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>Alt</div>
                <div>:</div>
              </div>
              <span style="width: 4px;"></span>
              <div class="noAlign">{{ solAlt.degreeInt }}&deg; {{ solAlt.arcMin }}' {{ solAlt.arcSec }}"</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Az</div>
                <div>:</div>
              </div>
              <span style="width: 4px;"></span>
              <div class="noAlign">{{ solAz.degreeInt }}&deg; {{ solAz.arcMin }}' {{ solAz.arcSec }}"</div>
            </div>
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>