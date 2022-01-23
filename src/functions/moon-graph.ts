import { createMoon } from 'astronomy-bundle/moon'
import { createLocation } from 'astronomy-bundle/earth'
import { createTimeOfInterest } from 'astronomy-bundle/time'
import { mainStore } from '../store'

const store = mainStore()

const getTransitAltitude = async () => {
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

const generateDataLabels = async () => {
  const date = new Date()
  let hourNow = date.getHours()
  let minuteNow = date.getMinutes()

  const labels: any = []
  const data: any = []

  let hours, minutes
  for (let i = 0; i < 24; i++) {
    if (minuteNow < 30) {
      if (i % 2 === 0) {
        hours = hourNow
      } else {
        hours = hourNow
        hourNow += 1
      }
      minutes = i % 2 === 0 ? '00' : '30'
    } else {
      if (i % 2 === 0) {
        hours = hourNow
      } else {
        hours = hourNow + 1
        hourNow += 1
      }
      minutes = i % 2 === 0 ? '30' : '00'
    }
    // Check if hours is larger than 24
    hours = hours >= 24 ? hours - 24 : hours
    labels.push({
      hour: hours,
      min: minutes
    })
    data.push(await generateData(new Date(new Date().setHours(Number(hours), Number(minutes)))))
  }
  return {
    labels,
    data
  }
}

generateDataLabels().then((result) => {
  return result.labels, result.data
})

export const moonGraph = (color: string) => ({
  type: 'bar',
  data: {
    labels: [...labels.map((label: { hour: string; min: string }) => `${label.hour}:${label.min}`)],
    datasets: [{
      label: 'Moon Altitude',
      data: data,
      backgroundColor: color
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 90
      }
    }
  }
})

export const transitAltitude = Math.round(await getTransitAltitude() * 180 / Math.PI)
