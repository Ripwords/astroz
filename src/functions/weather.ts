import { mainStore } from '../store'

const store = mainStore()

const lat = ref(Number(store.userLat).toFixed(2))
const long = ref(Number(store.userLong).toFixed(2))
const interval = ref()

const forecastLink = ref()
const forecastImage = ref()
const annualDarkness = ref()

const updateForecast = () => {
  forecastLink.value = `https://clearoutside.com/forecast/${lat.value}/${long.value}`
  forecastImage.value = `https://clearoutside.com/forecast_image_large/${lat.value}/${long.value}/forecast.png`
  annualDarkness.value = `https://clearoutside.com/annual_darkness_image/${lat.value}/${long.value}/annual_darkness.png`
}

export const forecastInit = () => {
  watchEffect(() => {
    lat.value = Number(store.userLat).toFixed(2)
    long.value = Number(store.userLong).toFixed(2)
    updateForecast()
  })

  onMounted(() => {
    interval.value = setInterval(() => {
      updateForecast()
    }, 1800000)
  })

  onUnmounted(() => {
    clearInterval(interval.value)
  })
}

export const forecast = {
  forecastLink,
  forecastImage,
  annualDarkness
}