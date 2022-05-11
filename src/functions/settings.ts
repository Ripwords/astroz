import { mainStore } from '../store'
import { changeBool } from '../functions/utility'

const store = mainStore()
export const hemisphere = ref(store.hemisphere ? 'S' : 'N')
export const meridian = ref(store.meridian ? 'W' : 'E')
export const units = ref(store.units ? 'time' : 'deg')

export const changeUnits = () => store.units = changeBool(store.units)

export const updateLabels = () => {
  if (Number(store.userLat) >= 0) {
    hemisphere.value = 'N'
  } else {
    hemisphere.value = 'S'
  }
  if (Number(store.userLong) >= 0) {
    meridian.value = 'E'
  } else {
    meridian.value = 'W'
  }
}

export const manualLocation = () => {
  store.manual = changeBool(store.manual)
  window.dispatchEvent(new Event('resize'))
}