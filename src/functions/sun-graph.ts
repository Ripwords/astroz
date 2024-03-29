import { createSun } from 'astronomy-bundle/sun'
import { createLocation } from 'astronomy-bundle/earth'
import { createTimeOfInterest } from 'astronomy-bundle/time'
import { mainStore } from '../store'
import { generateDataLabels, generateGraph } from './graphUtils'

const store = mainStore()

export const getTransitAltitude = async () => {
  const location = createLocation(Number(store.userLat), Number(store.userLong))
  const sun = createSun()
  const transit = createSun(await sun.getTransit(location))
  const sunCoords = await transit.getTopocentricEquatorialSphericalCoordinates(location)
  const transitAltitude = Math.asin(Math.sin(Number(store.userLat) * Math.PI / 180) * Math.sin(sunCoords.declination * Math.PI / 180) + Math.cos(Number(store.userLat) * Math.PI / 180) * Math.cos(sunCoords.declination * Math.PI / 180))
  return transitAltitude
}

const generateData = async (date: Date) => {
  const TOI = createTimeOfInterest.fromDate(date)
  const location = createLocation(Number(store.userLat), Number(store.userLong))
  const sunHorCoords = await createSun(TOI).getTopocentricHorizontalCoordinates(location)
  return sunHorCoords.altitude.toFixed(2)
}

export const sunGraph = async (title: string, gridColor: string, bgColor: string) => {
  const { labels, data } = await generateDataLabels(generateData)
  return await generateGraph(
    title,
    gridColor,
    bgColor,
    labels,
    data
  )
}