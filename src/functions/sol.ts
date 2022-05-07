import { mainStore } from '../store'
import { createSun } from 'astronomy-bundle/sun'
import { createTimeOfInterest } from 'astronomy-bundle/time'
import { createLocation } from 'astronomy-bundle/earth'
import { convertDeg2Time, convertDeg2Arc, returnDate } from './utility'
import { sunGraph, getTransitAltitude } from '../functions/sun-graph'

const store = mainStore()
const dec = store.decimal
const sol = ref(createSun())
const interval = ref()
const location = ref(createLocation(Number(store.userLat), Number(store.userLong)))
export const sunRise = ref()
export const sunSet = ref()
export const solEqCoordinates = ref({
  RA: {
    degree: 0,
    hour: 0,
    min: 0,
    sec: 0
  },
  DEC: {
    degree: 0,
    arc: 0,
    min: 0,
    sec: 0
  }
})
export const solHorCoordinates = ref({
  Alt: {
    degree: 0,
    arc: 0,
    min: 0,
    sec: 0
  },
  Az: {
    degree: 0,
    arc: 0,
    min: 0,
    sec: 0
  }
})

const updateSolPosition = async () => {
  sol.value = createSun()
  const sunCoordinates = await sol.value.getTopocentricEquatorialSphericalCoordinates(location.value)
  solEqCoordinates.value.RA.degree = Number(sunCoordinates.rightAscension.toFixed(dec))
  solEqCoordinates.value.DEC.degree = Number(sunCoordinates.declination.toFixed(dec))
  const RAConvertion = convertDeg2Time(Number(solEqCoordinates.value.RA.degree))
  const DECConvertion = convertDeg2Arc(Number(solEqCoordinates.value.DEC.degree))
  
  solEqCoordinates.value.RA.hour = RAConvertion.hour
  solEqCoordinates.value.RA.min = RAConvertion.min
  solEqCoordinates.value.RA.sec = RAConvertion.sec

  solEqCoordinates.value.DEC.arc = DECConvertion.arc
  solEqCoordinates.value.DEC.min = DECConvertion.min
  solEqCoordinates.value.DEC.sec = DECConvertion.sec

  const sunHorCoordinates = await sol.value.getTopocentricHorizontalCoordinates(location.value)
  solHorCoordinates.value.Alt.degree = Number(sunHorCoordinates.altitude.toFixed(dec))
  solHorCoordinates.value.Az.degree = Number(sunHorCoordinates.azimuth.toFixed(dec))
  const AltConvertion = convertDeg2Arc(Number(solHorCoordinates.value.Alt.degree))
  const AzConvertion = convertDeg2Arc(Number(solHorCoordinates.value.Az.degree))

  solHorCoordinates.value.Alt.arc = AltConvertion.arc
  solHorCoordinates.value.Alt.min = AltConvertion.min
  solHorCoordinates.value.Alt.sec = AltConvertion.sec

  solHorCoordinates.value.Az.arc = AzConvertion.arc
  solHorCoordinates.value.Az.min = AzConvertion.min
  solHorCoordinates.value.Az.sec = AzConvertion.sec
}

const getSunTimes = async () => {
  let sunRiseTime, sunSetTime, toi, sunTimes
  const date = returnDate()
  const errorObj = {
    time: {
      month: "",
      day: "",
      year: "",
      hour: "",
      min: "",
      sec: ""
    }
  }

  try {
    toi = createTimeOfInterest.fromTime(date.year, date.month, date.day, 0, 0, 0)
    sunTimes = createSun(toi)
    sunRiseTime = await sunTimes.getRise(location.value)
  } catch (e: any) {
    try {
      toi = createTimeOfInterest.fromTime(date.year, date.month, date.day + 1, 0, 0, 0)
      sunTimes = createSun(toi)
      sunRiseTime = await sunTimes.getRise(location.value)
    } catch (e: any) {
      console.log("Sun Rise/Set Error")
      sunRiseTime = errorObj
    }
  }

  try {
    toi = createTimeOfInterest.fromTime(date.year, date.month, date.day, 0, 0, 0)
    sunTimes = createSun(toi)
    sunSetTime = await sunTimes.getSet(location.value)
  } catch (e: any) {
    try {
      toi = createTimeOfInterest.fromTime(date.year, date.month, date.day + 1, 0, 0, 0)
      sunTimes = createSun(toi)
      sunSetTime = await sunTimes.getSet(location.value)
    } catch (e: any) {
      console.log("Sun Rise/Set Error")
      sunSetTime = errorObj
    }
  }
  const rise = sunRiseTime.time
  const set = sunSetTime.time
  const riseDatetime = (new Date(`${rise.month}/${rise.day}/${rise.year} ${rise.hour}:${rise.min}:${rise.sec} UTC`)).toString().split(" ")
  const setDatetime = (new Date(`${set.month}/${set.day}/${set.year} ${set.hour}:${set.min}:${set.sec} UTC`)).toString().split(" ")
  return {
    riseDatetime,
    setDatetime
  }
}

export const sunCardInit = async () => {
  onUnmounted(() => {
    clearInterval(interval.value)
  })

  await updateSolPosition()
  const chartKey = ref(true)
  const graphConfig = ref(await sunGraph(
    'Sun ☀',
    'rgba(90, 90, 90, 0.3)',
    'rgba(255, 200, 61, 0.6)'
  ))
  if (location.value != createLocation(Number(store.userLat), Number(store.userLong))) {
    location.value = createLocation(Number(store.userLat), Number(store.userLong))
  }
  interval.value = setInterval(async () => {
    await updateSolPosition()
  }, 1000)
  const transitAltitude = ref(Math.round(await getTransitAltitude() * 180 / Math.PI))
  const t = await getSunTimes()
  sunRise.value = `${t.riseDatetime[0]}, ${t.riseDatetime[4]}`
  sunSet.value = `${t.setDatetime[0]}, ${t.setDatetime[4]}`

  if (sunRise.value == "Invalid, undefined") {
    sunRise.value = "N/A"
  }
  if (sunSet.value == "Invalid, undefined") {
    sunSet.value = "N/A"
  } 

  return {
    graphConfig,
    chartKey,
    transitAltitude
  }
}