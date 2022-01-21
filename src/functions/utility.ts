export const changeBool = (x: boolean) => {
  return x ? false : true
}

export const convertDeg2Time = (deg: number) => {
  return {
    hour: Math.floor(deg / 15),
    min: Math.abs(Math.floor((deg % 15) * 4)),
    sec: Math.abs(Math.round(((deg % 15) * 4 - Math.floor((deg % 15) * 4)) * 60)) 
  }
}

export const convertDeg2Arc = (deg: number) => {
  return {
    arc: Math.floor(deg),
    min: Math.abs(Math.floor((deg % 1) * 60)),
    sec: Math.abs(Math.round(((deg % 1) * 60 - Math.floor((deg % 1) * 60)) * 60)) 
  }
}