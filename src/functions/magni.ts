import { mainStore } from '../store'

const store = mainStore()
const dec = store.decimal

const aperture = ref('')
const telescopeFocalLength = ref('')
const eyepieceFocalLength = ref('')
const magnification = ref('')
const maxMagnification = ref('')

export const getTelescopeFocalLength = computed(() => {
  if (magnification.value != '' && eyepieceFocalLength.value != '') {
    return (Number(magnification.value) * Number(eyepieceFocalLength.value)).toFixed(dec)
  }
  return ''
})

export const getEyepieceFocalLength = computed(() => {
  if (magnification.value != '' && telescopeFocalLength.value != '') {
    return (Number(telescopeFocalLength.value) / Number(magnification.value)).toFixed(dec)
  }
  return ''
})

export const getMagnification = computed(() => {
  if (telescopeFocalLength.value != '' && eyepieceFocalLength.value != '') {
    return (Number(telescopeFocalLength.value) / Number(eyepieceFocalLength.value)).toFixed(dec)
  }
  return ''
})

export const getTelescopeAperture = computed(() => {
  if (maxMagnification.value != '') {
    return (Number(maxMagnification.value) / 2.5).toFixed(dec)
  }
  return ''
})

export const getMaxMagnification = computed(() => {
  if (aperture.value != '') {
    return (Number(aperture.value) * 2.5).toFixed(dec)
  }
  return ''
})

export const varRefs = {
  aperture,
  telescopeFocalLength,
  eyepieceFocalLength,
  magnification,
  maxMagnification
}