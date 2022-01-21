import { mainStore } from '../store'

const store = mainStore()
const dec = store.decimal

const aperture = ref('')
const smallAperture = ref('')

export const dawesLimit = computed(() => {
  if (aperture.value != '') {
    return (116.0 / Number(aperture.value)).toFixed(dec)
  }
  return ''
})

export const rayleighLimit = computed(() => {
  if (aperture.value != '') {
    return (138 / Number(aperture.value)).toFixed(dec)
  }
  return ''
})

export const magnitudeLimit = computed(() => {
  if (aperture.value != '') {
    return (7.7 + (5 * Math.log10(Number(aperture.value) / 10))).toFixed(dec)
  }
  return ''
})

export const lightGraspRatio = computed(() => {
  if (aperture.value != '' && smallAperture.value != '') {
    return (Math.pow(Number(aperture.value), 2) / Math.pow(Number(smallAperture.value), 2)).toFixed(dec)
  }
  return ''
})

export const varRefs = {
  aperture,
  smallAperture
}