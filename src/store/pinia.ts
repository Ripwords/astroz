import { defineStore } from "pinia"

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      pages: [
        {
          title: "Home",
          path: "/menu/home",
          sub: "calculates"
        },
        {
          title: "Page 1",
          path: "/menu/page1",
          sub: "calculates"
        },
        {
          title: "Settings",
          path: "/menu/settings",
          sub: "settings page"
        }
      ],
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