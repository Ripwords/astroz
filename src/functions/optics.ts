import { mainStore } from '../store'

const store = mainStore()
const dec = store.decimal

const aperture = ref('')
const fRatio = ref('')
const focalLength_1 = ref('')
const focalLength_2 = ref('')
const eyeFOV = ref('')
const eyepieceFocalLength = ref('')
const actualFOV = ref('')

export const getAperture = computed(() => {
  if (fRatio.value != '' && focalLength_1.value != '') {
    return (Number(focalLength_1.value) / Number(fRatio.value)).toFixed(dec)
  }
  return ''
})

export const getFRatio = computed(() => {
  if (aperture.value != '' && focalLength_1.value != '') {
    return (Number(focalLength_1.value) / Number(aperture.value)).toFixed(dec)
  }
  return ''
})

export const getFocalLength_1 = computed(() => {
  if (aperture.value != '' && fRatio.value != '') {
    return (Number(aperture.value) / Number(fRatio.value)).toFixed(dec)
  }
  return ''
})

export const getEyeFOV = computed(() => {
  if (eyepieceFocalLength.value != '' && focalLength_2.value != '' && actualFOV.value != '') {
    return (Number(actualFOV.value) * Number(focalLength_2.value) / Number(eyepieceFocalLength.value)).toFixed(dec)
  }
  return ''
})

export const getEyepieceFocalLength = computed(() => {
  if (eyeFOV.value != '' && focalLength_2.value != '' && actualFOV.value != '') {
    return (Number(actualFOV.value) * Number(focalLength_2.value) / Number(eyeFOV.value)).toFixed(dec)
  }
})

export const getFocalLength_2 = computed(() => {
  if (eyeFOV.value != '' && eyepieceFocalLength.value != '' && actualFOV.value != '') {
    return (Number(eyepieceFocalLength.value) * Number(eyeFOV.value) / Number(actualFOV.value)).toFixed(dec)
  }
  return ''
})

export const getActualFOV = computed(() => {
  if (eyeFOV.value != '' && eyepieceFocalLength.value != '' && focalLength_2.value != '') {
    return (Number(eyeFOV.value) / Number(focalLength_2.value) / Number(eyepieceFocalLength.value)).toFixed(dec)
  }
  return ''
})

export const varRefs = {
  aperture,
  fRatio,
  focalLength_1,
  focalLength_2,
  eyeFOV,
  eyepieceFocalLength,
  actualFOV
}