/**
 * Given a focal length and a frame length, return the field of view.
 * @param {number} focalLength - The focal length of the telescope in millimeters.
 * @param {number} frameLength - The length of the frame in millimeters.
 * @returns The FOV of the camera.
 */
export const getFOV = (focalLength: number, frameLength: number) => {
  return ((57.3 / focalLength) * frameLength)
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