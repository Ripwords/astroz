import { mainStore } from '../store'

const store = mainStore()
const dec = store.decimal

const focalLength = ref('')
const pixelSize = ref('')

const focalLength_2 = ref('')
const pixelSize_2 = ref('')

export const getResolution_1 = computed(() => {
  if (focalLength.value != '' && pixelSize.value != '') {
    return ((Number(pixelSize.value) / Number(focalLength.value)) * 206.265).toFixed(dec)
  }
  return ''
})

export const getResolution_2 = computed(() => {
  if (focalLength_2.value != '' && pixelSize_2.value != '') {
    return ((Number(pixelSize_2.value) / Number(focalLength_2.value)) * 206.265).toFixed(dec)
  }
  return ''
})

export const getRatio = computed(() => {
  if (getResolution_1.value != '' && getResolution_2.value != '') {
    return (`1 : ${(Number(getResolution_2.value) / Number(getResolution_1.value)).toFixed(dec)}`)
  }
  return ''
})

export const varRefs = {
  focalLength,
  pixelSize,
  focalLength_2,
  pixelSize_2
}