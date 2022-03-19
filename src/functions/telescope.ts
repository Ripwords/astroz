import { mainStore } from '../store'

const store = mainStore()
const dec = store.decimal

const aperture = ref('')

const ratio_larger_aperture = ref('')
const ratio_smaller_aperture = ref('')

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
  if (ratio_smaller_aperture.value != '' && ratio_larger_aperture.value != '') {
    return (Math.pow(Number(ratio_larger_aperture.value), 2) / Math.pow(Number(ratio_smaller_aperture.value), 2)).toFixed(dec)
  }
  return ''
})

export const varRefs = {
  aperture,
  ratio_larger_aperture,
  ratio_smaller_aperture
}