import { mainStore } from '../store'

const store = mainStore()
const dec = store.decimal

const focalLength = ref('')
const pixelSize = ref('')

export const getResolution = computed(() => {
  if (focalLength.value != '' && pixelSize.value != '') {
    return ((Number(pixelSize.value) / Number(focalLength.value)) * 206.265).toFixed(dec)
  }
  return ''
})

export const getSampling = (cat: string, resolution: number) => {
  if (resolution == 0) {
    return ""
  }
  if (cat == "VG") {
    if (resolution >= 0.167 && resolution <= 0.5) {
      return "Ideal"
    } else if (resolution > 0.5) {
      return "Under"
    } else if (resolution < 0.167) {
      return "Over"
    }
  } else if (cat == "GS") {
    if (resolution >= 0.33 && resolution <= 1) {
      return "Ideal"
    } else if (resolution > 1) {
      return "Under"
    } else if (resolution < 0.33) {
      return "Over"
    }
  } else if (cat == "OK") {
    if (resolution >= 0.667 && resolution <= 2) {
      return "Ideal"
    } else if (resolution > 2) {
      return "Under"
    } else if (resolution < 0.667) {
      return "Over"
    }
  } else if (cat == "PS") {
    if (resolution >= 1.333 && resolution <= 2.5) {
      return "Ideal"
    } else if (resolution > 2.5) {
      return "Under"
    } else if (resolution < 1.333) {
      return "Over"
    }
  } else if (cat == "VP") {
    if (resolution >= 1.667 && resolution <= 3) {
      return "Ideal"
    } else if (resolution > 3) {
      return "Under"
    } else if (resolution < 1.667) {
      return "Over"
    }
  }
  return ""
}

export const varRefs = {
  focalLength,
  pixelSize
}