<script lang="ts" setup>
import {
  varRefs,
  getEyepieceFocalLength,
  getMagnification,
  getMaxMagnification,
  getTelescopeAperture,
  getTelescopeFocalLength
} from '../functions/magni'
import { pagesStore } from '../store'

const page = pagesStore().magni
const {
  aperture,
  eyepieceFocalLength,
  magnification,
  maxMagnification,
  telescopeFocalLength
} = varRefs
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <CalcContainer>
        <Calc title="Magnification">
          <ion-list>
            <ion-item>
              <ion-label>🔭 Focal Length : </ion-label>
              <ion-input v-if="!getTelescopeFocalLength" v-model="telescopeFocalLength" type="number" placeholder="mm"></ion-input>
              <ion-input v-else :value="getTelescopeFocalLength" readonly></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>👁 Focal Length : </ion-label>
              <ion-input v-if="!getEyepieceFocalLength" v-model="eyepieceFocalLength" type="number" placeholder="mm"></ion-input>
              <ion-input v-else :value="getEyepieceFocalLength" readonly></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>🔍 Magnification : </ion-label>
              <ion-input v-if="!getMagnification" v-model="magnification" type="number"></ion-input> 
              <ion-input v-else :value="getMagnification" readonly></ion-input>
            </ion-item>
          </ion-list>
        </Calc>
        <Calc title="Max Telescope Mag.">
          <ion-list>
            <ion-item>
              <ion-label>Aperture : </ion-label>
              <ion-input v-if="!getTelescopeAperture" v-model="aperture" type="number" placeholder="mm"></ion-input>
              <ion-input v-else :value="getTelescopeAperture" readonly></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>🔎 Max mag. : </ion-label>
              <ion-input v-if="!getMaxMagnification" v-model="maxMagnification" type="number"></ion-input>
              <ion-input v-else :value="getMaxMagnification" readonly></ion-input>
            </ion-item>
          </ion-list>
        </Calc>
      </CalcContainer>
    </ion-content>
  </ion-page>
</template>