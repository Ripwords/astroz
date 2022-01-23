import { createSun } from 'astronomy-bundle/sun'
import { createLocation } from 'astronomy-bundle/earth'
import { createTimeOfInterest } from 'astronomy-bundle/time'
import { mainStore } from '../store'

const store = mainStore()

const generateData = async (date: Date) => {
  const TOI = createTimeOfInterest.fromDate(date)
  const location = createLocation(Number(store.userLat), Number(store.userLong))
  const sunHorCoords = await createSun(TOI).getTopocentricHorizontalCoordinates(location)
  return sunHorCoords.altitude.toFixed(2)
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

generateDataLabels().then((labels, data) => {
  return labels, data
})

export const sunGraph = {
  type: 'bar',
  data: {
    labels: [...labels.map((label: { hour: string; min: string }) => `${label.hour}:${label.min}`)],
    datasets: [{
      label: 'Sun Altitude',
      data: data,
      backgroundColor: 'rgba(250, 222, 82, 0.5)'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 90,
        gridlines: {
          displau: false
        }
      },
      x: {
        gridlines: {
          display: false
        }
      }
    }
  }
}