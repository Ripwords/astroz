import { mainStore } from '../store'

const store = mainStore()
const dec = store.decimal

const focalLength = ref('')
const distance = ref('')
const aperture = ref('')
const ccdDiagonal = ref('')

export const getMFS = computed(() => {
  if (aperture.value != '' && focalLength.value != '' && distance.value != '' && ccdDiagonal.value != '') {
    return (Number(ccdDiagonal.value) * ((Number(focalLength.value) - Number(distance.value)) / Number(focalLength.value)) + (Number(distance.value) / (Number(focalLength.value) / Number(aperture.value)))).toFixed(dec)
  }
  return ''
})

export const varRefs = {
  focalLength,
  distance,
  aperture,
  ccdDiagonal
}