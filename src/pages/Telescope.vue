<script lang="ts" setup>
import {
  varRefs,
  dawesLimit,
  lightGraspRatio,
  magnitudeLimit,
  rayleighLimit
} from '../functions/telescope'
import { pagesStore } from '../store'

const page = pagesStore().telescope
const {
  aperture,
  ratio_larger_aperture,
  ratio_smaller_aperture,
} = varRefs
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <CalcContainer>
        <Calc title="Dawes' Limit">
          <CalcInput
            v-model:val="aperture"
            label="Aperture"
            suffix="mm"
          />
          <CalcInput
            v-model:val="dawesLimit"
            label="Max resolution"
            suffix='"'
            readonly
          />
        </Calc>
        <br>
        <Calc title="Rayleigh Limit">
          <CalcInput
            v-model:val="aperture"
            label="Aperture"
            suffix="mm"
          />
          <CalcInput
            v-model:val="rayleighLimit"
            label="Max resolution"
            suffix='"'
            readonly
          />
        </Calc>
        <br>
        <Calc title="Limiting Magnitude">
          <CalcInput
            v-model:val="aperture"
            label="Aperture"
            suffix="mm"
          />
          <CalcInput
            v-model:val="magnitudeLimit"
            label="Max magnitude"
            suffix='"'
            readonly
          />
        </Calc>
        <br>
        <Calc title="Light Grasp Ratio">
          <CalcInput
            v-model:val="ratio_larger_aperture"
            label="Larger aperture"
            suffix="mm"
          />
          <CalcInput
            v-model:val="ratio_smaller_aperture"
            label="Smaller aperture"
            suffix="mm"
          />
          <CalcInput
            v-model:val="lightGraspRatio"
            label="Light grasp ratio"
            suffix=""
            readonly
          />
        </Calc>
      </CalcContainer>
    </ion-content>
  </ion-page>
</template>