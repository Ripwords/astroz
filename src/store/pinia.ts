import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core";

export const useMainStore = defineStore('main', {
  state: () => {
    return {
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
    }
  }
})

export const usePagesStore = defineStore('pages', {
  state: () => {
    return {
      pages: [
        {
          title: "Home",
          path: "/menu/home",
          sub: "Home Page"
        },
        {
          title: "Weather",
          path: "/menu/weather",
          sub: "Weather"
        },
        {
          title: "Optics",
          path: "/menu/optics",
          sub: "Optical calculations"
        },
        {
          title: "Magnification",
          path: "/menu/magni",
          sub: "Magnification calculations"
        },
        {
          title: "Telescope",
          path: "/menu/telescope",
          sub: "Telescope capabilities calculations"
        },
        {
          title: "CCD Calculations",
          path: "/menu/ccd",
          sub: "CCD suitability"
        },
        {
          title: "Settings",
          path: "/menu/settings",
          sub: "Settings"
        }
      ],
    }
  }
})