import { mainStore } from '../store'
import { createMoon } from 'astronomy-bundle/moon'
import { createLocation } from 'astronomy-bundle/earth'
import { Moon, Hemisphere } from 'lunarphase-js'
import { convertDeg2Arc, convertDeg2Time } from './utility'

const store = mainStore()
const dec = store.decimal
const luna = ref(createMoon())
const interval = ref()
const location = ref(createLocation(Number(store.userLat), Number(store.userLong)))
const hemi = ref(() => store.hemisphere ? Hemisphere.SOUTHERN : Hemisphere.NORTHERN)
export const phase = ref(Moon.lunarPhase(new Date(), hemi))
export const phaseEmoji = ref(Moon.lunarPhaseEmoji(new Date(), hemi))
export const lunaPercent = ref()
export const lunaRise = ref()
export const lunaSet = ref()
export const fullMoon = ref(luna.value.getUpcomingFullMoon().time)
export const lunaEqCoordinates = ref({
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
export const lunaHorCoordinates = ref({
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

const updateMoonPosition = async () => {
  luna.value = createMoon()
  const moonCoordinates = await luna.value.getTopocentricEquatorialSphericalCoordinates(location.value)
  lunaEqCoordinates.value.RA.degree = Number(moonCoordinates.rightAscension.toFixed(dec))
  lunaEqCoordinates.value.DEC.degree = Number(moonCoordinates.declination.toFixed(dec))
  const RAConvertion = convertDeg2Time(Number(lunaEqCoordinates.value.RA.degree))
  const DECConvertion = convertDeg2Arc(Number(lunaEqCoordinates.value.DEC.degree))

  lunaEqCoordinates.value.RA.hour = RAConvertion.hour
  lunaEqCoordinates.value.RA.min = RAConvertion.min
  lunaEqCoordinates.value.RA.sec = RAConvertion.sec

  lunaEqCoordinates.value.DEC.arc = DECConvertion.arc
  lunaEqCoordinates.value.DEC.min = DECConvertion.min
  lunaEqCoordinates.value.DEC.sec = DECConvertion.sec

  const moonHorCoordinates = await luna.value.getTopocentricHorizontalCoordinates(location.value)
  lunaHorCoordinates.value.Alt.degree = Number(moonHorCoordinates.altitude.toFixed(dec))
  lunaHorCoordinates.value.Az.degree = Number(moonHorCoordinates.azimuth.toFixed(dec))
  const AltConvertion = convertDeg2Arc(Number(lunaHorCoordinates.value.Alt.degree))
  const AzConvertion = convertDeg2Arc(Number(lunaHorCoordinates.value.Az.degree))

  lunaHorCoordinates.value.Alt.arc = AltConvertion.arc
  lunaHorCoordinates.value.Alt.min = AltConvertion.min
  lunaHorCoordinates.value.Alt.sec = AltConvertion.sec

  lunaHorCoordinates.value.Az.arc = AzConvertion.arc
  lunaHorCoordinates.value.Az.min = AzConvertion.min
  lunaHorCoordinates.value.Az.sec = AzConvertion.sec
}

const getMoonTimes = async () => {
  const rise = await luna.value.getRise(location.value)
  const moonRise = rise.time
  const riseDatetime = (new Date(`${moonRise.month}/${moonRise.day}/${moonRise.year} ${moonRise.hour}:${moonRise.min}:${moonRise.sec} UTC`)).toString().split(" ")
  
  try {
    const set = await luna.value.getSet(location.value)
    const moonSet = set.time
    const setDatetime = (new Date(`${moonSet.month}/${moonSet.day}/${moonSet.year} ${moonSet.hour}:${moonSet.min}:${moonSet.sec} UTC`)).toString().split(" ")
    return {
      riseDatetime,
      setDatetime
    }
  } catch (e) {
    console.log(e)
    const setDatetime = 'N/A'
    return {
      riseDatetime,
      setDatetime
    }
  }
}

const moonDetails = async () => {
  const lunaIlluminatedFraction = await luna.value.getIlluminatedFraction()
  lunaPercent.value = Number(lunaIlluminatedFraction * 100).toFixed(2)
  hemi.value = store.hemisphere ? Hemisphere.SOUTHERN : Hemisphere.NORTHERN
  phase.value = Moon.lunarPhase(new Date(), hemi)
  phaseEmoji.value = Moon.lunarPhaseEmoji(new Date(), hemi)
}

export const moonCardInit = async () => {
  onUnmounted(() => {
    clearInterval(interval.value)
  })

  watch([() => store.userLat, () => store.userLong], async () => {
    location.value = createLocation(Number(store.userLat), Number(store.userLong))
    await moonDetails()
    const t = await getMoonTimes()
    lunaRise.value = `${t.riseDatetime[0]}, ${t.riseDatetime[4]}`
    lunaSet.value = `${t.setDatetime[0]}, ${t.setDatetime[4]}`
    fullMoon.value = luna.value.getUpcomingFullMoon().time
  })

  
  await moonDetails()
  await updateMoonPosition()
  const t = await getMoonTimes()
  lunaRise.value = `${t.riseDatetime[0]}, ${t.riseDatetime[4]}`
  lunaSet.value = `${t.setDatetime[0]}, ${t.setDatetime[4]}`
  interval.value = setInterval(async () => {
    await updateMoonPosition()
  }, 1000)
}