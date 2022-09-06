import { convertRA2Deg, convertDEC2Deg } from './utility'

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

/**
 * It takes in a field of view, a margin, a scale, a target, and a coordinate, and returns a URL to an
 * image of the sky
 * @param fov - { width: number, height: number }
 * @param {number} margin - the margin of the image, in pixels, from the edge of the canvas.
 * @param {number} scale - the scale of the image, 1 is the original size, 2 is double the size, etc.
 * @param {string} [target] - The name of the target you want to retrieve the image of.
 * @param [coord] - { ra: string, dec: string }
 * @returns A string.
 */
export const retrieveFromAPI = (fov: { width: number, height: number }, margin: number, scale: number, target?: string, coord?: { ra: string, dec: string }) => {
  let ra = coord?.ra ?? '00:00:00'
  let dec = coord?.dec ?? '00:00:00'
  let position = target != undefined ? target : `${convertRA2Deg(ra)} ${convertDEC2Deg(dec)}`
  return `https://skyview.gsfc.nasa.gov/current/cgi/runquery.pl?Survey=dss2r&Position=${position}&Size=${fov.width * margin},${fov.height * margin}&Pixels=${(fov.width * scale).toFixed(0)},${(fov.height * scale).toFixed(0)}&Scaling=Linear&Return=jpg`
}

/* A computed property that returns a string. */
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