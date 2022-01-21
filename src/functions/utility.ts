export const changeBool = (x: boolean) => {
  return x ? false : true
}

export const convertRA2Time = (RA: number) => {
  return {
    hour: Math.floor(RA / 15),
    min: Math.floor((RA % 15) * 4),
    sec: Math.round(((RA % 15) * 4 - Math.floor((RA % 15) * 4)) * 60) 
  }
}

export const convertDec2Arc = (DEC: number) => {
  return {
    arc: Math.floor(DEC),
    min: Math.floor((DEC % 1) * 60),
    sec: Math.round(((DEC % 1) * 60 - Math.floor((DEC % 1) * 60)) * 60)
  }
}

export const convertAlt2Arc = (ALT: number) => {
  return {
    arc: ALT > 0 ? Math.floor(ALT) : Math.ceil(ALT),
    min: Math.floor((ALT % 1) * 60),
    sec: Math.round(((ALT % 1) * 60 - Math.floor((ALT % 1) * 60)) * 60)
  }
}

export const convertAz2Arc = (AZ: number) => {
  return {
    arc: AZ > 0 ? Math.floor(AZ) : Math.ceil(AZ),
    min: Math.floor((AZ % 1) * 60),
    sec: Math.round(((AZ % 1) * 60 - Math.floor((AZ % 1) * 60)) * 60)
  }
}