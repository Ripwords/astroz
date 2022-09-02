<script lang="ts" setup>
import { pagesStore } from '../store'
import { varRefs, genFOV, getFOV, retrieveFromAPI } from '../functions/FOV'

const page = pagesStore().fov
const {
  focalLength,
  pixelSize,
  frameWidth,
  frameHeight
} = varRefs
const target = ref("")
const doneLoad = ref()
const frame = ref()
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

const fetchFromAPI = () => {
  if (target.value == '' || !genFOV) return
  doneLoad.value = false
  isErr.value = false
  frame.value.src = ""
  frame.value.style.border = "0px"
  const data = retrieveFromAPI({ width: fov_x.value, height: fov_y.value }, getWidthOfParent() / fov_x.value, target.value)
  frame.value.src = data
}

const imgLoaded = () => {
  frame.value.style.border = "5px solid white"
  doneLoad.value = true
}

const err = () => {
  frame.value.style.border = "0px"
  doneLoad.value = true
  isErr.value = true
}
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <CalcContainer>
        <Calc title="FOV Calculator">
          <ion-accordion-group value="first">
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
        </Calc>
        <Calc title="Target">
          <CalcInput v-model:val="target" label="Target Name" type="text" suffix="" />
          <div class="flex justify-center">
            <ion-button @keyup.enter="fetchFromAPI" @click="fetchFromAPI" :disabled="target == '' || !genFOV">Search
            </ion-button>
          </div>
          <div class="flex justify-center">
            <div class="absolute left-[50%]">
              <div class="relative left-[-50%]" v-show="doneLoad == false">
                <ion-spinner class="mt-8" name="crescent" />
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <img v-show="!isErr" ref="frame" @load="imgLoaded()" @error="err" />
            <ion-item v-show="isErr">
              <n-text>Target could not be found</n-text>
            </ion-item>
          </div>
        </Calc>
      </CalcContainer>
    </ion-content>
  </ion-page>
</template>