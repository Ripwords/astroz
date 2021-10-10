import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core";

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      decimal: useStorage('decimal', 4),
      appName: useStorage('appName', "AstroCalc"),
      units: useStorage('units', false),
      userLat: useStorage('userLat', ""),
      userLong: useStorage('userLong', ""),
      hemisphere: useStorage('hemisphere', false),
      meridian: useStorage('meridian', false),
      gps: useStorage('gps', false),
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
          title: "Settings",
          path: "/menu/settings",
          sub: "Settings"
        }
      ],
    }
  }
})