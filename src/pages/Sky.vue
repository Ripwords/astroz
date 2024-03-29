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
const iframeHeight = ref(0)
const frame = ref()

onMounted(() => {
  watchEffect(() => {
    iframeHeight.value = window.innerHeight * 0.7
    const frameParent = frame.value.parentElement
    frame.value.remove()
    frame.value.setAttribute('src', "https://virtualsky.lco.global/embed/index.html?" + long.value + "&" + lat.value + `&projection=${projection.value}` + `&showgalaxy=${showGalaxy.value}` + `&constellations=${constellations.value}` + `&constellationlabels=${constellationLabels.value}` + `&constellationboundaries=${constellationBoundaries.value}` + `&showplanets=${planets.value}` + `&showplanetlabels=${planetLabels.value}` + `&meteorshowers=${meteorShowers.value}` + `&showstarlabels=${showStarLabels.value}` + `&showorbits=${showOrbits.value}` + `&ecliptic=${ecliptic.value}` + `&meridian=${showMeridian.value}` + `&negative=${negative.value}` + `&gridlines_az=${gridlines_az.value}` + `&gridlines_eq=${gridlines_eq.value}` + `&gridlines_gal=${gridlines_gal.value}` + `&live=${live.value}` + `&az=0`)
    frameParent.append(frame.value)
  })
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
        <iframe ref="frame" class="justify-center" width="100%" :height="iframeHeight" frameborder="0" scrolling="no"
          marginheight="0" marginwidth="0" src="" allowTransparency="true">
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
                    <ion-select v-model="projection" interface="action-sheet">
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
                    <ion-checkbox slot="end" v-model="constellations" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Constellation Labels</ion-label>
                    <ion-checkbox slot="end" v-model="constellationLabels" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Constellation Boundaries</ion-label>
                    <ion-checkbox slot="end" v-model="constellationBoundaries" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Planets</ion-label>
                    <ion-checkbox slot="end" v-model="planets" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Planet Labels</ion-label>
                    <ion-checkbox slot="end" v-model="planetLabels" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Meteor Showers</ion-label>
                    <ion-checkbox slot="end" v-model="meteorShowers" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Show Star Labels</ion-label>
                    <ion-checkbox slot="end" v-model="showStarLabels" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Show Orbits</ion-label>
                    <ion-checkbox slot="end" v-model="showOrbits" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Show Galaxy</ion-label>
                    <ion-checkbox slot="end" v-model="showGalaxy" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Ecliptic</ion-label>
                    <ion-checkbox slot="end" v-model="ecliptic" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Meridian</ion-label>
                    <ion-checkbox slot="end" v-model="showMeridian" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Negative</ion-label>
                    <ion-checkbox slot="end" v-model="negative" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Gridlines Az</ion-label>
                    <ion-checkbox slot="end" v-model="gridlines_az" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Gridlines Eq</ion-label>
                    <ion-checkbox slot="end" v-model="gridlines_eq" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Gridlines Gal</ion-label>
                    <ion-checkbox slot="end" v-model="gridlines_gal" />
                  </ion-item>
                  <ion-item>
                    <ion-label>Live Update</ion-label>
                    <ion-checkbox slot="end" v-model="live" />
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