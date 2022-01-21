import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const mainStore = defineStore('mainStore', {
  state: () => ({
    decimal: useStorage('decimal', 4),
    appName: "AstroCalc",
    units: useStorage('units', false),
    userLat: useStorage('userLat', "0"),
    userLong: useStorage('userLong', "0"),
    hemisphere: useStorage('hemisphere', false),
    meridian: useStorage('meridian', false),
    toast: useStorage('toast', false),
    manual: useStorage('manual', false),
    forecastSize: useStorage('forecastSize', "small")
  })
})

export const pagesStore = defineStore('pages', {
  state: () => ({
    pages: {
      home: {
        title: "Home",
        path: "/menu/home",
        sub: "Home Page"
      },
      weather: {
        title: "Weather",
        path: "/menu/weather",
        sub: "Weather"
      },
      optics: {
        title: "Optics",
        path: "/menu/optics",
        sub: "Optics Calculations"
      },
      magni: {
        title: "Magnification",
        path: "/menu/magni",
        sub: "Magnification Calculations"
      },
      telescope: {
        title: "Telescope",
        path: "/menu/telescope",
        sub: "Telescope Capabilities Calculations"
      },
      ccd: {
        title: "CCD Calculations",
        path: "/menu/ccd",
        sub: "CCD Suitability"
      },
      settings: {
        title: "Settings",
        path: "/menu/settings",
        sub: "Settings"
      }
    }
  })
})