<script lang="ts" setup>
import { mainStore, pagesStore } from '../store'
import { useStorage } from '@vueuse/core'

const page = pagesStore().sky
const store = mainStore()
const long = ref(`longitude=${store.userLong}`)
const lat = ref(`latitude=${store.userLat}`)
const projection = useStorage("projection", "lambert")
const constellations = useStorage("constellations", false)
const constellationLabels = useStorage("constellationLabels", false)
const constellationBoundaries = useStorage("constellationBoundaries", false)
const planets = useStorage("planets", true)
const planetLabels = useStorage("planetLabels", true)
const meteorShowers = useStorage("meteorShower", false)
const showStarLabels = useStorage("showStarLabels", true)
const showOrbits = useStorage("showOrbits", true)
const showGalaxy = useStorage("showGalaxy", false)
const ecliptic = useStorage("ecliptic", false)
const showMeridian = useStorage("showMeridian", false)
const negative = useStorage("negative", false)
const gridlines_az = useStorage("gridlines_az", false)
const gridlines_eq = useStorage("gridlines_eq", false)
const gridlines_gal = useStorage("gridlines_gal", true)
const live = useStorage("live", true)
const url = ref("")
const iframeHeight = ref(0)

watchEffect(() => {
  iframeHeight.value = window.innerHeight * 0.7
  url.value = "https://virtualsky.lco.global/embed/index.html?" + long.value + "&" + lat.value + `&projection=${projection.value}` + `&showgalaxy=${showGalaxy.value}` + `&constellations=${constellations.value}` + `&constellationlabels=${constellationLabels.value}` + `&constellationboundaries=${constellationBoundaries.value}` + `&showplanets=${planets.value}` + `&showplanetlabels=${planetLabels.value}` + `&meteorshowers=${meteorShowers.value}` + `&showstarlabels=${showStarLabels.value}` + `&showorbits=${showOrbits.value}` + `&ecliptic=${ecliptic.value}` + `&meridian=${showMeridian.value}` + `&negative=${negative.value}` + `&gridlines_az=${gridlines_az.value}` + `&gridlines_eq=${gridlines_eq.value}` + `&gridlines_gal=${gridlines_gal.value}` + `&live=${live.value}` + `&az=0`
})

window.addEventListener('orientationchange', () => {
  iframeHeight.value = window.innerWidth * 0.7
})

onUnmounted(() => {
  window.removeEventListener('orientationchange', () => { })
})
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <div class="flex mx-8 mt-5">
        <iframe class="justify-center" width="100%" :height="iframeHeight" frameborder="0" scrolling="no"
          marginheight="0" marginwidth="0" :src="url" allowTransparency="true">
        </iframe>
      </div>
      <div class="flex justify-center">
        <ion-card class="w-[85vw] max-w-[500px]">
          <ion-card-content>
            <ion-accordion-group>
              <ion-accordion value="first">
                <ion-item slot="header" color="light">
                  <ion-label>Settings</ion-label>
                </ion-item>
                <div slot="content">
                  <ion-item>
                    <ion-label>Projection</ion-label>
                    <ion-select :modelValue="projection" @update:modelValue="projection = $event">
                      <ion-select-option value="polar">Polar</ion-select-option>
                      <ion-select-option value="stereo">Stereo</ion-select-option>
                      <ion-select-option value="lambert">Lambert</ion-select-option>
                      <ion-select-option value="equirectangular">Equirectangular</ion-select-option>
                      <ion-select-option value="mollweide">Mollweide</ion-select-option>
                      <ion-select-option value="planechart">Planechart</ion-select-option>
                      <ion-select-option value="gnomic">Gnomic</ion-select-option>
                    </ion-select>
                  </ion-item>
                  <ion-item>
                    <ion-label>Constellations</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="constellations = $event"
                      :modelValue="constellations" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Constellation Labels</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="constellationLabels = $event"
                      :modelValue="constellationLabels" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Constellation Boundaries</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="constellationBoundaries = $event"
                      :modelValue="constellationBoundaries" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Planets</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="planets = $event" :modelValue="planets" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Planet Labels</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="planetLabels = $event" :modelValue="planetLabels" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Meteor Showers</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="meteorShowers = $event" :modelValue="meteorShowers" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Show Star Labels</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="showStarLabels = $event"
                      :modelValue="showStarLabels" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Show Orbits</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="showOrbits = $event" :modelValue="showOrbits" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Show Galaxy</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="showGalaxy = $event" :modelValue="showGalaxy" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Ecliptic</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="ecliptic = $event" :modelValue="ecliptic" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Meridian</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="showMeridian = $event" :modelValue="showMeridian" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Negative</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="negative = $event" :modelValue="negative" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Gridlines Az</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="gridlines_az = $event" :modelValue="gridlines_az" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Gridlines Eq</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="gridlines_eq = $event" :modelValue="gridlines_eq" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Gridlines Gal</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="gridlines_gal = $event" :modelValue="gridlines_gal" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Live Update</ion-label>
                    <ion-checkbox slot="end" @update:modelValue="live = $event" :modelValue="live" />
                  </ion-item>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>