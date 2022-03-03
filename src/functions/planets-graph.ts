import { createLocation } from "astronomy-bundle/earth"
import { createTimeOfInterest } from "astronomy-bundle/time"
import { mainStore } from "../store"
import { generateDataLabels, generatePlanetsGraph, planetFunctions, planetNames } from './utility'

const store = mainStore()

const generateData = async (date: Date, planet: Function) => {
  const TOI = createTimeOfInterest.fromDate(date)
  const location = createLocation(Number(store.userLat), Number(store.userLong))
  const planetCoords = await planet(TOI).getTopocentricHorizontalCoordinates(location)
  return planetCoords.altitude.toFixed(2)
}

const generatePlanetsData = async () => {
  const graphData: any = {
    labels: [],
    datasets: []
  }
  for (let i = 0; i < planetFunctions.length; i++) {
    const { labels, data } = await generateDataLabels(generateData, planetFunctions[i])
    graphData.datasets.push(data)
    graphData.labels.length == 0 ? graphData.labels = labels : null
  }
  return {
    graphData
  }
}

export const planetsGraph = async (gridColor: string, lineColor: string[]) => {
  const { graphData } = await generatePlanetsData()
  const graphConf = await generatePlanetsGraph(
    planetNames,
    gridColor,
    lineColor,
    graphData.labels,
    graphData.datasets
  )
  return graphConf
}