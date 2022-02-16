<script lang="ts" setup>
import { 
  varRefs,
  getActualFOV,
  getAperture,
  getFocalLength_1,
  getFocalLength_2,
  getEyeFOV,
  getFRatio,
  getEyepieceFocalLength
} from '../functions/optics'
import { pagesStore } from '../store'

const page = pagesStore().optics
const {
  actualFOV,
  aperture,
  focalLength_1,
  focalLength_2,
  eyeFOV,
  fRatio,
  eyepieceFocalLength
} = varRefs
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <ion-card>
        <ion-card-header>
          <ion-card-title>Focal Length</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-if="!getAperture" v-model="aperture" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getAperture" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>F/ : </ion-label>
          <ion-input v-if="!getFRatio" v-model="fRatio" type="number" placeholder="Focal Ratio"></ion-input>
          <ion-input v-else :value="getFRatio" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Focal Length : </ion-label>
          <ion-input v-if="!getFocalLength_1" v-model="focalLength_1" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getFocalLength_1" readonly></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>True Field of View</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Eyepiece FOV : </ion-label>
          <ion-input v-if="!getEyeFOV" v-model="eyeFOV" type="number" placeholder="&deg;"></ion-input>
          <ion-input v-else :value="getEyeFOV" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Eyepiece Focal Length : </ion-label>
          <ion-input v-if="!getEyepieceFocalLength" v-model="eyepieceFocalLength" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getEyepieceFocalLength" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Focal Length : </ion-label>
          <ion-input v-if="!getFocalLength_2" v-model="focalLength_2" type="number" placeholder="mm"></ion-input>
          <ion-input v-else :value="getFocalLength_2" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Actual FOV : </ion-label>
          <ion-input v-if="!getActualFOV" v-model="actualFOV" type="number" placeholder="&deg;"></ion-input>
          <ion-input v-else :value="getActualFOV" readonly></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <br>
    </ion-content>
  </ion-page>
</template>