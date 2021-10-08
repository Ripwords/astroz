import { defineStore } from "pinia"

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      decimal: 4,
      appName: "AstroCalc",
      units: false,
      userLat: "",
      userLong: "",
      hemisphere: false,
      meridian: false,
      gps: false,
    }
  },
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