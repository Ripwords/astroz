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
          <CalcInput
            v-model:val="telescopeFocalLength"
            label="🔭 Focal Length"
            suffix="mm"
            :condition="getTelescopeFocalLength"
          />
          <CalcInput
            v-model:val="eyepieceFocalLength"
            label="👁 Focal Length"
            suffix="mm"
            :condition="getEyepieceFocalLength"
          />
          <CalcInput
            v-model:val="magnification"
            label="🔍 Magnification"
            suffix="x"
            :condition="getMagnification"
          />
        </Calc>
        <br>
        <Calc title="Max Telescope Mag.">
          <CalcInput
            v-model:val="aperture"
            label="Aperture"
            suffix="mm"
            :condition="getTelescopeAperture"
          />
          <CalcInput
            v-model:val="maxMagnification"
            label="Max Magnification"
            suffix="x"
            :condition="getMaxMagnification"
          />
        </Calc>
      </CalcContainer>
    </ion-content>
  </ion-page>
</template>