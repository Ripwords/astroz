import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export const changeBool = (x: boolean) => {
  return x ? false : true
}

export const convertDeg2Time = (deg: number) => {
  return {
    hour: Math.floor(deg / 15),
    min: Math.abs(Math.floor((deg % 15) * 4)),
    sec: Math.abs(Math.round(((deg % 15) * 4 - Math.floor((deg % 15) * 4)) * 60)) 
  }
}

export const convertDeg2Arc = (deg: number) => {
  return {
    arc: Math.floor(deg),
    min: Math.abs(Math.floor((deg % 1) * 60)),
    sec: Math.abs(Math.round(((deg % 1) * 60 - Math.floor((deg % 1) * 60)) * 60)) 
  }
}

export const generateDataLabels = async (generateData: Function) => {
  const labels: any = []
  const data: any = []

  let time = dayjs()
  let min
  for (let i = 0; i < 22; i++) {
    time.minute() > 30 ? min = '30' : min = '00'
    labels.push(`${time.hour()}:${min}`)
    const date = new Date(new Date(time.toDate()).setMinutes(Number(min), 0, 0))
    data.push(await generateData(date))
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
        },
        {
          type: 'line',
          label: title,
          data: data,
          backgroundColor: gridColor,
          borderColor: backgroundColor,
          borderWidth: 2.5,
          tension: 0.45,
          pointBorderWidth: 0.05
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
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