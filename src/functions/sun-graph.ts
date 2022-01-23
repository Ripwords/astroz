import { createSun } from 'astronomy-bundle/sun'
import { createLocation } from 'astronomy-bundle/earth'
import { createTimeOfInterest } from 'astronomy-bundle/time'
import { mainStore } from '../store'
import { generateDataLabels, generateGraph } from './utility'

const store = mainStore()

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