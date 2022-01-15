<script lang="ts" setup>
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
const lunaRise = ref()
const lunaSet = ref()
const location = ref(createLocation(parseFloat(store.userLat), parseFloat(store.userLong)))
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
const updateMoonPos = () => {
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

const getMoonTimes = async (location: any) => {
  const rise = await luna.value.getRise(location)
  const set = await luna.value.getSet(location)
  const riseTimeFormatted = (new Date(`${rise.time.month}/${rise.time.day}/${rise.time.year} ${rise.time.hour}:${rise.time.min}:${rise.time.sec} UTC`)).toString().split(" ")
  lunaRise.value = `${riseTimeFormatted[0]}, ${riseTimeFormatted[4]}`

  const setTimeFormatted = (new Date(`${set.time.month}/${set.time.day}/${set.time.year} ${set.time.hour}:${set.time.min}:${set.time.sec} UTC`)).toString().split(" ")
  lunaSet.value = `${setTimeFormatted[0]}, ${setTimeFormatted[4]}`
}

// Watcher functions
watch(computed(() => store.userLat), () => {
  location.value = createLocation(parseFloat(store.userLat), parseFloat(store.userLong))
})
watch(computed(() => store.userLong), () => {
  location.value = createLocation(parseFloat(store.userLat), parseFloat(store.userLong))
})

await getMoonTimes(location.value)

// Lifecycle hooks
onMounted(async () => {
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
        <div style="display: flex; justify-content: flex-start; max-width: 175px;">
          <div style="display: flex; justify-content: space-between; width: 40px">
            <div>Rise</div>
            <div>:</div>
          </div>
          <span style="width: 10px;"></span>
          <div>&nbsp;{{ lunaRise }}</div>
        </div>
        <div style="display: flex; justify-content: flex-start; max-width: 175px;">
          <div style="display: flex; justify-content: space-between; width: 40px">
            <div>Set</div>
            <div>:</div>
          </div>
          <span style="width: 10px;"></span>
          <div>&nbsp;{{ lunaSet }}</div>
        </div>
        <br>
        <div v-if="!store.units">
          <div style="display: flex; justify-content: space-between; max-width: 270px;">
            <div style="display: flex; justify-content: flex-start; width: 135px; margin-bottom: 5%;">
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
              <div class="noAlign">{{ lunaAlt.degree }}&deg;</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Az</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ lunaAz.degree }}&deg;</div>
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
              <div class="noAlign">{{ lunaRA.hour }}<sub>h</sub> {{ lunaRA.min }}<sub>m</sub> {{ lunaRA.sec }}<sub>s</sub></div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Dec</div>
                <div>:</div>
              </div>
              <span style="width: 4px;"></span>
              <div class="noAlign">{{ lunaDec.degreeInt }}&deg; {{ lunaDec.arcMin }}' {{ lunaDec.arcSec }}"</div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; max-width: 285px;">
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>Alt</div>
                <div>:</div>
              </div>
              <span style="width: 4px;"></span>
              <div class="noAlign">{{ lunaAlt.degreeInt }}&deg; {{ lunaAlt.arcMin }}' {{ lunaAlt.arcSec }}"</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Az</div>
                <div>:</div>
              </div>
              <span style="width: 4px;"></span>
              <div class="noAlign">{{ lunaAz.degreeInt }}&deg; {{ lunaAz.arcMin }}' {{ lunaAz.arcSec }}"</div>
            </div>
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>