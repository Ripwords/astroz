import { mainStore } from '../store'
import { createSun } from 'astronomy-bundle/sun'
import { createLocation } from 'astronomy-bundle/earth'
import { convertAlt2Arc, convertAz2Arc, convertDec2Arc, convertRA2Time } from './utility'

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
  const RAConvertion = convertRA2Time(Number(solEqCoordinates.value.RA.degree))
  const DECConvertion = convertDec2Arc(Number(solEqCoordinates.value.DEC.degree))
  
  solEqCoordinates.value.RA.hour = RAConvertion.hour
  solEqCoordinates.value.RA.min = RAConvertion.min
  solEqCoordinates.value.RA.sec = RAConvertion.sec

  solEqCoordinates.value.DEC.arc = DECConvertion.arc
  solEqCoordinates.value.DEC.min = DECConvertion.min
  solEqCoordinates.value.DEC.sec = DECConvertion.sec

  const sunHorCoordinates = await sol.value.getTopocentricHorizontalCoordinates(location.value)
  solHorCoordinates.value.Alt.degree = Number(sunHorCoordinates.altitude.toFixed(dec))
  solHorCoordinates.value.Az.degree = Number(sunHorCoordinates.azimuth.toFixed(dec))
  const AltConvertion = convertAlt2Arc(Number(solHorCoordinates.value.Alt.degree))
  const AzConvertion = convertAz2Arc(Number(solHorCoordinates.value.Az.degree))

  solHorCoordinates.value.Alt.arc = AltConvertion.arc
  solHorCoordinates.value.Alt.min = AltConvertion.min
  solHorCoordinates.value.Alt.sec = AltConvertion.sec

  solHorCoordinates.value.Az.arc = AzConvertion.arc
  solHorCoordinates.value.Az.min = AzConvertion.min
  solHorCoordinates.value.Az.sec = AzConvertion.sec
  console.log(solEqCoordinates.value)
  console.log(solHorCoordinates.value)
}

const getSunTimes = async () => {
  const times = {
    rise: await sol.value.getRiseUpperLimb(location.value),
    set: await sol.value.getSetUpperLimb(location.value)
  }
  const rise = times.rise.time
  const set = times.set.time
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

  watch([() => store.userLat, () => store.userLong], async () => {
    location.value = createLocation(Number(store.userLat), Number(store.userLong))
    const t = await getSunTimes()
    sunRise.value = `${t.riseDatetime[0]}, ${t.riseDatetime[4]}`
    sunSet.value = `${t.setDatetime[0]}, ${t.setDatetime[4]}`
  })

  await updateSolPosition()
  interval.value = setInterval(async () => {
    await updateSolPosition()
  }, 1000)
  
  const t = await getSunTimes()
  sunRise.value = `${t.riseDatetime[0]}, ${t.riseDatetime[4]}`
  sunSet.value = `${t.setDatetime[0]}, ${t.setDatetime[4]}`
}