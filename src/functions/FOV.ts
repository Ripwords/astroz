import { convertRA2Deg, convertDEC2Deg } from './utility'
import { mainStore } from '../store'

const store = mainStore()

const focalLength = ref('')
const pixelSize = ref('')
const frameWidth = ref('')
const frameHeight = ref('')

/**
 * Given a focal length and a frame length, return the field of view.
 * @param {number} focalLength - The focal length of the telescope in millimeters.
 * @param {number} frameLength - The length of the frame in millimeters.
 * @returns The FOV of the camera.
 */
export const getFOV = (focalLength: number, frameLength: number) => {
  return (((12726 / 223) / focalLength) * frameLength)
}

/**
 * Given a pixel size and a number of pixels, return the length of the frame.
 * @param {number} pixelSize - The size of each pixel in the sensor in micrometers (um).
 * @param {number} numPixels - The number of pixels along or down the sensor.
 * @returns the product of pixelSize and numPixels in millimeters.
 */
export const getFrameLength = (pixelSize: number, numPixels: number) => {
  return (pixelSize * numPixels * 1000)
}

export const retrieveFromAPI = (fov: { width: number, height: number }, scale: number, target?: string, coord?: { ra: string, dec: string }) => {
  let url
  const margin = 1
  scale = scale * margin
  if (!target) {
    let ra = coord?.ra ?? '00:00:00'
    let dec = coord?.dec ?? '00:00:00'
    url = `https://skyview.gsfc.nasa.gov/current/cgi/runquery.pl?Survey=dss2r&Position=${convertRA2Deg(ra)},${convertDEC2Deg(dec)}&Size=${fov.width * margin},${fov.height * margin}&Pixels=${(fov.width * scale).toFixed(0)},${(fov.height * scale).toFixed(0)}&Return=jpg`
  } else {
    url = `https://skyview.gsfc.nasa.gov/current/cgi/runquery.pl?Survey=dss2r&Position=${target}&Size=${fov.width * margin},${fov.height * margin}&Pixels=${(fov.width * scale).toFixed(0)},${(fov.height * scale).toFixed(0)}&Return=jpg`
  }
  return url
}

export const genFOV = computed(() => {
  if (focalLength.value != '' && pixelSize.value != '' && frameWidth.value != '' && frameHeight.value != '') {
    return `${getFOV(Number(focalLength.value), Number(frameWidth.value)).toFixed(2)} x ${getFOV(Number(focalLength.value), Number(frameHeight.value)).toFixed(2)}`
  } else {
    return ''
  }
})

export const varRefs = {
  focalLength,
  pixelSize,
  frameWidth,
  frameHeight
}