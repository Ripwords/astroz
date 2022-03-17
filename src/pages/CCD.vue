<script lang="ts" setup>
import { pagesStore } from '../store'
import { useSessionStorage } from '@vueuse/core'
import { varRefs, getResolution, getSampling } from '../functions/CCD'

const page = pagesStore().ccd
const { focalLength, pixelSize } = varRefs
const seeing = useSessionStorage("seeingSetting", "OK")
const sampling = ref("")
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
      <div class="flex justify-center">
        <div class="max-w-[750px] w-full">
          <ion-card>
            <ion-card-header>
              <ion-card-title>CCD resolution</ion-card-title>
            </ion-card-header>
          </ion-card>
          <div class="flex justify-center">
            <div class="w-[95%]">
              <ion-list>
                <ion-item>
                  <ion-label>Seeing</ion-label>
                    <ion-select v-model="seeing" interface="popover">
                      <ion-select-option value="VG">Very Good</ion-select-option>
                      <ion-select-option value="GS">Good</ion-select-option>
                      <ion-select-option value="OK">Ok</ion-select-option>
                      <ion-select-option value="PS">Poor</ion-select-option>
                      <ion-select-option value="VP">Very Poor</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                  <ion-label>Focal Length : </ion-label>
                  <ion-input v-model="focalLength" type="number" placeholder="mm"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Pixel Size : </ion-label>
                  <ion-input v-model="pixelSize" type="number" placeholder="&mu;m"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Resolution : </ion-label>
                  <ion-input :value="getResolution" placeholder='"/pixel' readonly></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Sampling : </ion-label>
                  <ion-input :value="sampling" readonly></ion-input>
                  <i-flat-color-icons:checkmark v-if="sampling == 'Ideal sampling'"/>
                  <i-mdi:stairs-down v-else-if="sampling == 'Under-sampled'"/>
                  <i-mdi:stairs-up v-else-if="sampling == 'Over-sampled'"/>
                </ion-item>
              </ion-list>
              <br>
              <SeeingTable />
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>