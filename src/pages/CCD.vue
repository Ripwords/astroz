<script lang="ts" setup>
import CalcInput from '../components/CalcInput.vue'
import { pagesStore } from '../store'
import { useSessionStorage } from '@vueuse/core'
import { varRefs, getResolution, getSampling } from '../functions/CCD'

const page = pagesStore().ccd
const { focalLength, pixelSize } = varRefs
const seeing = useSessionStorage("seeingSetting", "OK")
const sampling = ref("")
const colWidth = 5.5
watchEffect(() => {
  if (getResolution.value != "" && Number(getResolution.value) != 0) {
    sampling.value = getSampling(seeing.value, Number(getResolution.value))
    sampling.value == "Ideal" ? sampling.value += " sampling" : sampling.value += "-sampled"
  } else {
    sampling.value = ""
  }
})
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title"></Header>
      <CalcContainer>
        <Calc title="CCD Resolution">
          <ion-row>
            <ion-col :size="colWidth">
              <ion-item>
                <ion-input disabled>
                  Seeing
                </ion-input>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-select v-model="seeing" interface="popover">
                  <ion-select-option value="VG">Very Good</ion-select-option>
                  <ion-select-option value="GS">Good</ion-select-option>
                  <ion-select-option value="OK">Ok</ion-select-option>
                  <ion-select-option value="PS">Poor</ion-select-option>
                  <ion-select-option value="VP">Very Poor</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
          <CalcInput
            v-model:val="focalLength"
            label="Focal Length"
            suffix="mm"
            :size="colWidth"
          />
          <CalcInput
            v-model:val="pixelSize"
            label="Pixel Size"
            suffix="&mu;m"
            :size="colWidth"
          />
          <CalcInput
            :val="getResolution"
            label="Resolution"
            suffix='&quot;/px'
            :readonly="true"
            :size="colWidth"
          />
          <ion-row>
            <ion-col :size="colWidth">
              <ion-item>
                <ion-input disabled>Sampling : </ion-input>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-input :value="sampling" readonly>
                  <i-flat-color-icons:checkmark v-if="sampling == 'Ideal sampling'"/>
                  <i-mdi:stairs-down v-else-if="sampling == 'Under-sampled'"/>
                  <i-mdi:stairs-up v-else-if="sampling == 'Over-sampled'"/>
                </ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </Calc>
      </CalcContainer>
      <SeeingTable />
    </ion-content>
  </ion-page>
</template>