import { getPlatforms } from '@ionic/vue'
import { getWeather } from 'vue-openweather'

export const returnDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return {
    year,
    month,
    day
  }
}

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

export const isDesktop = getPlatforms().includes('desktop')

export const updateWeatherData = async (store: any) => {
  const wData = await getWeather("fcd7c46a039d1f8d59ef5c1ed18f9c6d", store.userLat, store.userLong)
  try {
    if (Object.keys(wData.coord).length > 0) {
      store.weatherData = wData
      console.log('updateWeatherData')
    }
  } catch (e) {
    console.log("Can't update weather data")
  }
}
