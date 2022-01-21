import { mainStore } from '../store'
import { changeBool } from '../functions/utility'

const store = mainStore()
const dec = store.decimal
export const hemisphere = ref(store.hemisphere ? 'S' : 'N')
export const meridian = ref(store.meridian ? 'W' : 'E')
export const units = ref(store.units ? 'time' : 'deg')

export const changeUnits = () => store.units = changeBool(store.units)

export const N_S = () => {
  store.hemisphere = changeBool(store.hemisphere)
  if (store.hemisphere) {
    store.userLat = (Number(store.userLat) * -1).toFixed(dec)
  } else {
    store.userLat = (Math.abs(Number(store.userLat))).toFixed(dec)
  }
  hemisphere.value = store.hemisphere ? 'S' : 'N'
}

export const E_W = () => {
  store.meridian = changeBool(store.meridian)
  if (store.meridian) {
    store.userLong = (Number(store.userLong) * -1).toFixed(dec)
  } else {
    store.userLong = (Math.abs(Number(store.userLong))).toFixed(dec)
  }
  meridian.value = store.meridian ? 'W' : 'E'
}

export const manualLocation = () => store.manual = changeBool(store.manual)

// Fail safe to prevent cached location to override manual location
export const settingsPageInit = () =>{
  if (hemisphere.value == "S" && Number(store.userLat) > 0) {
    store.userLat = (Number(store.userLat) * -1).toFixed(dec)
  }
  
  if (meridian.value == "W" && Number(store.userLong) > 0) {
    store.userLong = (Number(store.userLong) * -1).toFixed(dec)
  }
}