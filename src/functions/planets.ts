import {
  createMercury,
  createVenus,
  createMars,
  createJupiter,
  createSaturn,
  createUranus,
  createNeptune
} from "astronomy-bundle/planets"
import { mainStore } from "../store"
import { createLocation } from "astronomy-bundle/earth"
import { changeBool, convertDeg2Arc, convertDeg2Time } from "./utility"
import { planetFunctions } from './graphUtils'
import { planetsGraph } from "./planets-graph"

interface planetCoords {
  EQ: {
    RA: {
      degree: number
      hour: number
      min: number
      sec: number
    }
    DEC: {
      degree: number
      arc: number
      min: number
      sec: number
    }
  },
  HOR: {
    Alt: {
      degree: number
      arc: number
      min: number
      sec: number
    },
    Az: {
      degree: number
      arc: number
      min: number
      sec: number
    }
  },
  DISTANCE: any
}

const store = mainStore()
const dec = store.decimal
const interval = ref()
const location = ref(createLocation(Number(store.userLat), Number(store.userLong)))
const planetInit = () => {
  return {
    EQ: {
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
    },
    HOR: {
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
    },
    DISTANCE: null
  }
}
const planets = ref<any>({
  Mercury: createMercury(),
  Venus: createVenus(),
  Mars: createMars(),
  Jupiter: createJupiter(),
  Saturn: createSaturn(),
  Uranus: createUranus(),
  Neptune: createNeptune()
})
export const planetsCoords: any = {
  Mercury: ref<planetCoords>(planetInit()),
  Venus: ref<planetCoords>(planetInit()),
  Mars: ref<planetCoords>(planetInit()),
  Jupiter: ref<planetCoords>(planetInit()),
  Saturn: ref<planetCoords>(planetInit()),
  Uranus: ref<planetCoords>(planetInit()),
  Neptune: ref<planetCoords>(planetInit())
}

const updatePlanetsPosition = async () => {
  let i = 0
  Object.keys(planets.value).forEach(async (planet: any) => {
    planets.value[planet] = planetFunctions[i]()
    i += 1
    const planetCoordinates = await planets.value[planet].getTopocentricEquatorialSphericalCoordinates(location.value)
    planetsCoords[planet].value.EQ.RA.degree = Number(planetCoordinates.rightAscension.toFixed(dec))
    planetsCoords[planet].value.EQ.DEC.degree = Number(planetCoordinates.declination.toFixed(dec))
    const RAConvertion = convertDeg2Time(Number(planetsCoords[planet].value.EQ.RA.degree))
    const DECConvertion = convertDeg2Arc(Number(planetsCoords[planet].value.EQ.DEC.degree))
    planetsCoords[planet].value.EQ.RA.hour = RAConvertion.hour
    planetsCoords[planet].value.EQ.RA.min = RAConvertion.min
    planetsCoords[planet].value.EQ.RA.sec = RAConvertion.sec
    planetsCoords[planet].value.EQ.DEC.arc = DECConvertion.arc
    planetsCoords[planet].value.EQ.DEC.min = DECConvertion.min
    planetsCoords[planet].value.EQ.DEC.sec = DECConvertion.sec

    const planetHorizontalCoordinates = await planets.value[planet].getTopocentricHorizontalCoordinates(location.value)
    planetsCoords[planet].value.HOR.Alt.degree = Number(planetHorizontalCoordinates.altitude.toFixed(dec))
    planetsCoords[planet].value.HOR.Az.degree = Number(planetHorizontalCoordinates.azimuth.toFixed(dec))
    const AltConvertion = convertDeg2Arc(Number(planetsCoords[planet].value.HOR.Alt.degree))
    const AzConvertion = convertDeg2Arc(Number(planetsCoords[planet].value.HOR.Az.degree))
    planetsCoords[planet].value.HOR.Alt.arc = AltConvertion.arc
    planetsCoords[planet].value.HOR.Alt.min = AltConvertion.min
    planetsCoords[planet].value.HOR.Alt.sec = AltConvertion.sec
    planetsCoords[planet].value.HOR.Az.arc = AzConvertion.arc
    planetsCoords[planet].value.HOR.Az.min = AzConvertion.min
    planetsCoords[planet].value.HOR.Az.sec = AzConvertion.sec

    planetsCoords[planet].value.DISTANCE = await planets.value[planet].getDistanceToEarth(location.value)
  })
}

export const planetsCardsInit = async () => {
  onUnmounted(() => {
    clearInterval(interval.value)
  })

  watch([() => store.userLat, () => store.userLong], async () => {
    location.value = createLocation(Number(store.userLat), Number(store.userLong))
    graphConfig.value = await planetsGraph(
      'rgba(90, 90, 90, 0.3)',
      store.planetColors
    )
    chartKey.value = changeBool(chartKey.value)
  })

  const chartKey = ref(true)
  const graphConfig = ref(await planetsGraph(
    'rgba(90, 90, 90, 0.3)',
    store.planetColors
  ))

  await updatePlanetsPosition()
  interval.value = setInterval(async () => {
    await updatePlanetsPosition()
  }, 1000)

  return {
    graphConfig,
    chartKey
  }
}