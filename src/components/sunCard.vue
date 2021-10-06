<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";
import { createSun } from "astronomy-bundle/sun";
import { createLocation } from "astronomy-bundle/earth";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useMainStore } from "../store/pinia";

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
const solAlt = ref()
const solAz = ref()
const interval = ref()
const sunTimeInterval = ref()
const location = ref()
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

const updateSolPos = () => {
  if ((parseFloat(store.userLat) == 0 && parseFloat(store.userLong) == 0) || (store.userLat == "" && store.userLong == "")) {
    location.value = createLocation(0, 0)
  }
  sol.value = createSun()
  sol.value.getTopocentricEquatorialSphericalCoordinates(location.value).then(result => {
    solRA.value.degree = parseFloat(result.rightAscension.toFixed(decimal.value))
    solDec.value.degree = parseFloat(result.declination.toFixed(decimal.value))
    convertRA2Time(solRA.value)
    convertDec2Arc(solDec.value)
  }, () => {
    console.log("Error getting location and/or time information")
  })
  sol.value.getApparentTopocentricHorizontalCoordinates(location.value).then(result => {
    solAlt.value = parseFloat(result.altitude.toFixed(decimal.value))
    solAz.value = parseFloat(result.azimuth.toFixed(decimal.value))
  }, () => {
    console.log("Error getting location and/or time information")
  })
}

const getSunTimes = () => {
  sol.value.getRiseUpperLimb(location.value)
    .then(result => {
      sunRiseTimes.value.month = result.time.month
      sunRiseTimes.value.day = result.time.day
      sunRiseTimes.value.year = result.time.year
      sunRiseTimes.value.hour = result.time.hour
      sunRiseTimes.value.min = result.time.min
      sunRiseTimes.value.sec = result.time.sec
    })
    .then(() => {
      const setTime = (new Date(`${sunRiseTimes.value.month}/${sunRiseTimes.value.day}/${sunRiseTimes.value.year} ${sunRiseTimes.value.hour}:${sunRiseTimes.value.min}:${sunRiseTimes.value.sec} UTC`)).toString().split(" ")
      sunRise.value = `${setTime[0]}, ${setTime[4]}`
    })

  sol.value.getSetUpperLimb(location.value)
    .then(result => {
      sunSetTimes.value.month = result.time.month
      sunSetTimes.value.day = result.time.day
      sunSetTimes.value.year = result.time.year
      sunSetTimes.value.hour = result.time.hour
      sunSetTimes.value.min = result.time.min
      sunSetTimes.value.sec = result.time.sec
    })
    .then(() => {
      const setTime = (new Date(`${sunSetTimes.value.month}/${sunSetTimes.value.day}/${sunSetTimes.value.year} ${sunSetTimes.value.hour}:${sunSetTimes.value.min}:${sunSetTimes.value.sec} UTC`)).toString().split(" ")
      sunSet.value = `${setTime[0]}, ${setTime[4]}`
    })
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
  updateSolPos()
}

// Watcher functions
watch(computed(() => store.userLat), () => {
  getLoc()
})

watch(computed(() => store.userLong), () => {
  getLoc()
})

onMounted(() => {
  getLoc()
  sunTimeInterval.value = setInterval(() => {
    getSunTimes()
    if (sunRise.value != "" && sunSet.value != "") {
      clearInterval(sunTimeInterval.value)
    }
  }, 500)
  interval.value = setInterval(() => {
    updateSolPos()
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
        <ion-card-title>Sol 🔆</ion-card-title>
        <ion-card-subtitle>Shining as always</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div style="display: flex; justify-content: flex-start; max-width: 145px;">
          <div style="display: flex; justify-content: space-between; width: 40px">
            <div>Rise</div>
            <div>:</div>
          </div>
          <span style="width: 10px;"></span>
          <div>&nbsp;{{ sunRise }}</div>
        </div>
        <div style="display: flex; justify-content: flex-start; max-width: 145px;">
          <div style="display: flex; justify-content: space-between; width: 40px">
            <div>Set</div>
            <div>:</div>
          </div>
          <span style="width: 10px;"></span>
          <div>&nbsp;{{ sunSet }}</div>
        </div>
        <br>
        <div v-if="!store.units">
          <div style="display: flex; justify-content: space-between; max-width: 270px;">
            <div style="display: flex; justify-content: flex-start; width: 135px;">
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
          <div style="display: flex; justify-content: space-between; max-width: 270px;">
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>Alt</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ solAlt }}&deg;</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Az</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div class="noAlign">{{ solAz }}&deg;</div>
            </div>
          </div>
        </div>
        <div v-else>

        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>