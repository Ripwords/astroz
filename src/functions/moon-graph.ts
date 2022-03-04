import { createMoon } from 'astronomy-bundle/moon'
import { createLocation } from 'astronomy-bundle/earth'
import { createTimeOfInterest } from 'astronomy-bundle/time'
import { generateDataLabels, generateGraph } from '../functions/graphUtils'
import { mainStore } from '../store'

const store = mainStore()

export const getTransitAltitude = async () => {
  const location = createLocation(Number(store.userLat), Number(store.userLong))
  const moon = createMoon()
  const transit = createMoon(await moon.getTransit(location))
  const moonCoords = await transit.getTopocentricEquatorialSphericalCoordinates(location)
  const transitAltitude = Math.asin(Math.sin(Number(store.userLat) * Math.PI / 180) * Math.sin(moonCoords.declination * Math.PI / 180) + Math.cos(Number(store.userLat) * Math.PI / 180) * Math.cos(moonCoords.declination * Math.PI / 180))
  return transitAltitude
}

const generateData = async (date: Date) => {
  const TOI = createTimeOfInterest.fromDate(date)
  const location = createLocation(Number(store.userLat), Number(store.userLong))
  const moonHorCoords = await createMoon(TOI).getTopocentricHorizontalCoordinates(location)
  return moonHorCoords.altitude.toFixed(2)
}

export const moonGraph = async (title: string, gridColor: string, bgColor: string) => {
  const { labels, data } = await generateDataLabels(generateData)
  return await generateGraph(
    title,
    gridColor,
    bgColor,
    labels,
    data
  )
}