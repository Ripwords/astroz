export const convertRA2HMS = (RA: number) => {
  const returnObj = {
    degree: 0,
    hour: 0,
    min: 0,
    sec: 0
  }
  returnObj.degree = RA
  returnObj.hour = RA > 0 ? Math.floor(RA / 15) : Math.ceil(RA / 15)
  returnObj.min = Math.floor(Math.abs((RA / 15 - returnObj.hour) * 60))
  returnObj.sec = Math.floor(Math.abs(((RA / 15 - returnObj.hour) * 60 - returnObj.min) * 60))
  return returnObj
}

export const convertDec2Arc = (Dec: number) => {
  const returnObj = {
    degree: 0,
    degreeInt: 0,
    arcMin: 0,
    arcSec: 0
  }
  returnObj.degree = Dec
  returnObj.degreeInt = Dec > 0 ? Math.floor(Dec) : Math.ceil(Dec)
  returnObj.arcMin = Math.floor(Math.abs(Dec - returnObj.degreeInt) * 60)
  returnObj.arcSec = Math.floor(((Math.abs(Dec - returnObj.degreeInt) * 60 - returnObj.arcMin) * 60))
  return returnObj
}

export const convertAlt2Arc = (Alt: number) => {
  const returnObj = {
    degree: 0,
    degreeInt: 0,
    arcMin: 0,
    arcSec: 0
  }
  returnObj.degree = Alt
  returnObj.degreeInt = Alt > 0 ? Math.floor(Alt) : Math.ceil(Alt)
  returnObj.arcMin = Math.floor(Math.abs(Alt - returnObj.degreeInt) * 60)
  returnObj.arcSec = Math.floor(((Math.abs(Alt - returnObj.degreeInt) * 60 - returnObj.arcMin) * 60))
  return returnObj
}

export const convertAz2Arc = (Az: number) => {
  const returnObj = {
    degree: 0,
    degreeInt: 0,
    arcMin: 0,
    arcSec: 0
  }
  returnObj.degree = Az
  returnObj.degreeInt = Az > 0 ? Math.floor(Az) : Math.ceil(Az)
  returnObj.arcMin = Math.floor(Math.abs(Az - returnObj.degreeInt) * 60)
  returnObj.arcSec = Math.floor(((Math.abs(Az - returnObj.degreeInt) * 60 - returnObj.arcMin) * 60))
  return returnObj
}