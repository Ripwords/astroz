<script lang="ts" setup>
import { pagesStore } from '../store'
import { varRefs, getResolution_1, getResolution_2, getRatio } from '../functions/guidingSuitability'

const {
  focalLength,
  pixelSize,
  focalLength_2,
  pixelSize_2
} = varRefs

const page = pagesStore().guiding

</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <CalcContainer>
        <Calc title="Guiding Suitability">
          <CalcInput
            v-model:val="focalLength"
            label="🔭 Focal Length"
            suffix="mm"
          />
          <CalcInput
            v-model:val="pixelSize"
            label="🔭 Pixel Size"
            suffix="&mu;m"
          />
          <CalcInput
            :val="getResolution_1"
            label="🔭 Resolution"
            suffix='&quot;/px'
            :readonly="true"
          />
          <br>
          <CalcInput
            v-model:val="focalLength_2"
            label="Guide Focal Length"
            suffix="mm"
          />
          <CalcInput
            v-model:val="pixelSize_2"
            label="Guide Pixel Size"
            suffix="&mu;m"
          />
          <CalcInput
            :val="getResolution_2"
            label="Guide Resolution"
            suffix='&quot;/px'
            :readonly="true"
          />
          <br>
          <ion-row>
            <ion-col size="7">
              <ion-item>
                <ion-input disabled>Guiding Ratio</ion-input>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-input
                  :value="getRatio"
                  type="string"
                  placeholder="/"
                  readonly
                />
              </ion-item>
            </ion-col>
          </ion-row>
        </Calc>
      </CalcContainer>
    </ion-content>
  </ion-page>
</template>