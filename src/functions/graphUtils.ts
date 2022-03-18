import { createJupiter, createMars, createMercury, createNeptune, createSaturn, createUranus, createVenus } from 'astronomy-bundle/planets'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { isDesktop } from './utility'
dayjs.extend(duration)

export const planetNames = [
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune'
]

export const planetFunctions = [
  createMercury,
  createVenus,
  createMars,
  createJupiter,
  createSaturn,
  createUranus,
  createNeptune
]

export const generateDataLabels = async (generateData: Function, planet?: any) => {
  const labels: any = []
  const data: any = []

  let time = dayjs()
  let min
  for (let i = 0; i < 22; i++) {
    time.minute() > 30 ? min = '30' : min = '00'
    labels.push(`${time.hour()}:${min}`)
    const date = new Date(new Date(time.toDate()).setMinutes(Number(min), 0, 0))
    if (planet != undefined) {
      data.push(await generateData(date, planet))
    } else {
      data.push(await generateData(date))
    }
    time = time.add(dayjs.duration({ 'minutes': 30 }))
  }
  return {
    labels,
    data
  }
}

export const generatePlanetsDataLabels = async (generateData: Function, planet: Function) => {
  const labels: any = []
  const data: any = []

  let time = dayjs()
  let min

  for (let i = 0; i < 22; i++) {
    time.minute() > 30 ? min = '30' : min = '00'
    labels.push(`${time.hour()}:${min}`)
    const date = new Date(new Date(time.toDate()).setMinutes(Number(min), 0, 0))
    data.push(await generateData(date, planet))
    time = time.add(dayjs.duration({ 'minutes': 30 }))
  }
  return {
    labels,
    data
  }
}

export const generateGraph = async (title: string, gridColor: string, backgroundColor: string, labels: any, data: any) => {
  const graphConfig = {
    data: {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: title,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: gridColor,
          borderWidth: 1,
          borderRadius: 8
        },
        {
          type: 'line',
          label: title,
          data: data,
          backgroundColor: gridColor,
          borderColor: backgroundColor,
          borderWidth: 2.5,
          tension: 0.45,
          pointRadius: 0
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: isDesktop
        },
        title: {
          display: true,
          text: title,
          color: backgroundColor
        }
      },
      scales: {
        x: {
          grid: {
            color: gridColor
          }
        },
        y: {
          beginAtZero: true,
          max: 90,
          min: -90,
          grid: {
            color: gridColor
          }
        }
      }
    }
  }
  return graphConfig
}

export const generatePlanetsGraph = async (title: string[], gridColor: string, lineColor: string[], labels: any, data: Array<Array<Number>>) => {
  const dataset: any = []
  for (let i = 0; i < title.length; i++) {
    dataset.push({
      type: 'line',
      label: title[i],
      data: data[i],
      backgroundColor: gridColor,
      borderColor: lineColor[i],
      borderWidth: 2.5,
      tension: 0.45,
      pointRadius: 0
    })
  }
  const graphConfig = {
    data: {
      labels: labels,
      datasets: dataset
    },
    options: {
      stacked: false,
      plugins: {
        legend: {
          display: isDesktop
        },
        title: {
          display: true,
          text: "Planets",
          color: lineColor
        }
      },
      scales: {
        x: {
          grid: {
            color: gridColor
          }
        },
        y: {
          beginAtZero: true,
          max: 90,
          min: -90,
          grid: {
            color: gridColor
          }
        }
      }
    }
  }
  return graphConfig
}