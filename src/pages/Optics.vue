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
      <CalcContainer>
        <Calc title="Focal Length">
          <CalcInput
            v-model:val="aperture"
            label="Aperture"
            suffix="mm"
            :condition="getAperture"
          />
          <CalcInput
            v-model:val="fRatio"
            label="F/Ratio"
            suffix="/"
            :condition="getFRatio"
          />
          <CalcInput
            v-model:val="focalLength_1"
            label="Focal Length"
            suffix="mm"
            :condition="getFocalLength_1"
          />
        </Calc>
        <br>
        <Calc title="True Field of View">
          <CalcInput
            v-model:val="eyeFOV"
            label="👁 FOV"
            suffix="°"
            :condition="getEyeFOV"
          />
          <CalcInput
            v-model:val="eyepieceFocalLength"
            label="👁 Focal Length"
            suffix="mm"
            :condition="getEyepieceFocalLength"
          />
          <CalcInput
            v-model:val="focalLength_2"
            label="🔭 Focal Length"
            suffix="mm"
            :condition="getFocalLength_2"
          />
          <CalcInput
            v-model:val="actualFOV"
            label="Actual FOV"
            suffix="°"
            :condition="getActualFOV"
          />
        </Calc>
      </CalcContainer>
    </ion-content>
  </ion-page>
</template>