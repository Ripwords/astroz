<script lang="ts" setup>
import { pagesStore } from '../store'
import { varRefs, genFOV, getFOV, retrieveFromAPI } from '../functions/FOV'

const marginScale = 2
const page = pagesStore().fov
const {
  focalLength,
  pixelSize,
  frameWidth,
  frameHeight
} = varRefs
const accToggle = ref("first")
const target = ref("")
const doneLoad = ref()
const rangeVal = ref(90)
const frame = ref()
const wrapper = ref()
const isErr = ref(false)

const fov_x = ref(computed(() => {
  return getFOV(Number(focalLength.value), Number(frameWidth.value))
}))
const fov_y = ref(computed(() => {
  return getFOV(Number(focalLength.value), Number(frameHeight.value))
}))

const getWidthOfParent = () => {
  const parent = frame.value.parentElement
  return parent.offsetWidth
}

const clearSensor = () => {
  wrapper.value.style.border = "0px"
  while (wrapper.value.firstChild) {
    wrapper.value.removeChild(wrapper.value.lastChild)
  }
}

const fetchFromAPI = () => {
  accToggle.value = ""
  clearSensor()
  doneLoad.value = false
  isErr.value = false
  frame.value.src = ""
  frame.value.style.border = "0px"
  // Value inverted to get a horizontal image from NASA API
  const data = retrieveFromAPI({ width: fov_y.value, height: fov_x.value }, marginScale, getWidthOfParent() / (fov_x.value), target.value)
  frame.value.src = data
}

const drawSensorCrosshair = () => {
  const crosshair = document.createElement("div")
  crosshair.style.width = "2px"
  crosshair.style.height = "100%"
  crosshair.style.backgroundColor = "red"
  crosshair.style.position = "absolute"
  crosshair.style.left = "50%"
  crosshair.style.transform = "translateX(-50%)"
  crosshair.style.opacity = "0.2"
  wrapper.value.appendChild(crosshair)
  const crosshair2 = document.createElement("div")
  crosshair2.style.width = "100%"
  crosshair2.style.height = "2px"
  crosshair2.style.backgroundColor = "red"
  crosshair2.style.position = "absolute"
  crosshair2.style.top = "50%"
  crosshair2.style.marginTop = "-0.5px"
  crosshair2.style.transform = "translateY(-50%)"
  crosshair2.style.opacity = "0.2"
  wrapper.value.appendChild(crosshair2)
}

const drawSensorFrame = () => {
  wrapper.value.style.width = `${frame.value.width / marginScale}px`
  wrapper.value.style.height = `${frame.value.height / marginScale}px`
  wrapper.value.style.border = "2px solid red"
  wrapper.value.style.position = "absolute"
  wrapper.value.style.marginLeft = "auto"
  wrapper.value.style.marginRight = "auto"
  wrapper.value.style.left = "0"
  wrapper.value.style.right = "0"
  wrapper.value.style.textAlign = "center"
  wrapper.value.style.top = `${(frame.value.offsetHeight - wrapper.value.offsetHeight) / 2}px`
  drawSensorCrosshair()
}

const imgLoaded = () => {
  // detect light/dark mode
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  frame.value.style.border = isDark ? "5px solid white" : "5px solid black"
  frame.value.transformOrigin = "center"
  frame.value.style.transform = "rotate(-90deg)"
  // offset the frame to the top to compensate for the rotation
  frame.value.style.marginTop = `-${(frame.value.height - frame.value.width) / 2}px`
  wrapper.value.style.marginTop = `-${(frame.value.height - frame.value.width) / 2}px`
  drawSensorFrame()
  doneLoad.value = true
}

const err = () => {
  frame.value.style.border = "0px"
  doneLoad.value = true
  isErr.value = true
}

window.addEventListener('orientationchange', () => {
  clearSensor()
  drawSensorFrame()
})

onMounted(() => {
  watchEffect(() => {
    wrapper.value.style.transformOrigin = "center"
    wrapper.value.style.transform = `rotate(${rangeVal.value}deg)`
  })
})

onUnmounted(() => {
  window.removeEventListener('orientationchange', () => { })
})
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <CalcContainer>
        <Calc title="Field of View">
          <ion-accordion-group :value="accToggle" @click="accToggle = 'first'">
            <ion-accordion value="first">
              <ion-item slot="header">
                Optics setup
              </ion-item>
              <div slot="content">
                <CalcInput v-model:val="focalLength" label="Focal Length" suffix="mm" />
                <CalcInput v-model:val="pixelSize" label="Pixel Size" suffix="&mu;m" />
                <CalcInput v-model:val="frameWidth" label="Frame Width" suffix="mm" />
                <CalcInput v-model:val="frameHeight" label="Frame Height" suffix="mm" />
                <CalcInput v-model:val="genFOV" label="FOV" suffix="&deg;" type="text" :condition="genFOV" />
              </div>
            </ion-accordion>
          </ion-accordion-group>
          <CalcInput v-model:val="target" label="Target Name" type="text" suffix="" />
          <div class="flex justify-center mt-4">
            <ion-button @click="fetchFromAPI" :disabled="target == '' || !genFOV">Search
            </ion-button>
          </div>
          <div class="flex justify-center">
            <div class="absolute left-[50%]">
              <div class="relative left-[-50%]" v-show="doneLoad == false">
                <ion-spinner class="mt-8" name="crescent" />
              </div>
            </div>
          </div>
          <div class="flex justify-center" v-show="doneLoad && !isErr">
            <div class="w-[70vw] max-w-[400px]">
              <div class="flex justify-center">
                <ion-range :min="0" :max="180" v-model="rangeVal">
                  <i-ion:refresh slot="start"></i-ion:refresh>
                </ion-range>
              </div>
            </div>
          </div>
        </Calc>
        <div class="flex justify-center relative mx-2">
          <img v-show="!isErr" ref="frame" @load="imgLoaded()" @error="err" />
          <div ref="wrapper"></div>
          <ion-item v-show="isErr">
            <ion-text>Target could not be found</ion-text>
          </ion-item>
        </div>
      </CalcContainer>
    </ion-content>
  </ion-page>
</template>