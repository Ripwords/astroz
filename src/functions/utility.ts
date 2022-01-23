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

export const generateGraph = async (title: string, gridColor: string, backgroundColor: string, labels: any, data: any) => {
  const graphConfig = {
    data: {
      labels: [...labels.map((label: { hour: string; min: string }) => `${label.hour}:${label.min}`)],
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