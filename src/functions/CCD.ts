import { mainStore } from '../store'

const store = mainStore()
const dec = store.decimal

const focalLength = ref('')
const barlowReducer = ref('')
const pixelSize = ref('')

export const getResolution = computed(() => {
  if (focalLength.value != '' && pixelSize.value != '') {
    if (barlowReducer.value == '') {
      return ((Number(pixelSize.value) / Number(focalLength.value)) * 206.265).toFixed(dec)
    } else {
      return ((Number(pixelSize.value) / (Number(focalLength.value) * Number(barlowReducer.value))) * 206.265).toFixed(dec)
    }
  }
  return ''
})

export const varRefs = {
  focalLength,
  barlowReducer,
  pixelSize
}