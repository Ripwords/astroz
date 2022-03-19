<script lang="ts" setup>
import { pagesStore } from '../store'
import { varRefs, getMFS } from '../functions/minFilter'

const page = pagesStore().filter
const {
  aperture,
  ccdDiagonal,
  distance,
  focalLength
} = varRefs
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <CalcContainer>
        <Calc title="Min Filter Size">
          <CalcInput 
            v-model:val="ccdDiagonal" 
            label="CCD Diagonal" 
            suffix="mm"
          />
          <CalcInput
            v-model:val="focalLength" 
            label="Focal Length" 
            suffix="mm"
          />
          <CalcInput
            v-model:val="aperture" 
            label="Aperture" 
            suffix="mm"
          />
          <CalcInput
            v-model:val="distance" 
            label="Sensor distance" 
            suffix="mm"
          />
          <CalcInput
            :val="getMFS"
            label="Min Filter Size"
            suffix="mm"
            :readonly="true"
          />
        </Calc>
      </CalcContainer>
    </ion-content>
  </ion-page>
</template>