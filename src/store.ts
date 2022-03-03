import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const mainStore = defineStore('mainStore', {
  state: () => ({
    decimal: useStorage('decimal', 4),
    units: useStorage('units', false),
    userLat: useStorage('userLat', "0"),
    userLong: useStorage('userLong', "0"),
    hemisphere: useStorage('hemisphere', false),
    meridian: useStorage('meridian', false),
    toast: useStorage('toast', false),
    manual: useStorage('manual', false),
    forecastSize: useStorage('forecastSize', "small"),
    locationInterval: useStorage('locationInterval', 5),
    planetColors: [
      'rgba(150, 150, 150, 0.6)',
      'rgba(233, 99, 58, 0.6)',
      'rgba(231, 65, 45, 0.6)',
      'rgba(186, 112, 85, 0.6)',
      'rgba(245, 204, 50, 0.6)',
      'rgba(50, 207, 191, 0.6)',
      'rgba(38, 55, 189, 0.6)'
    ]
  })
})

export const pagesStore = defineStore('pages', {
  state: () => ({
    home: {
      title: "Home",
      path: "/menu/home",
      sub: "Home Page"
    },
    solarSystem: {
      title: "Solar System",
      path: "/menu/solarSystem",
      sub: "Solar System"
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
  })
})