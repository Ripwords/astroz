<script lang="ts" setup>
import { pagesStore } from '../store'
import { varRefs, getResolution } from '../functions/CCD'

const page = pagesStore().ccd
const { focalLength, barlowReducer, pixelSize } = varRefs
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title"></Header>
      <ion-card>
        <ion-card-header>
          <ion-card-title>CCD resolution</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Focal Length : </ion-label>
          <ion-input v-model="focalLength" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Barlow/Reducer : </ion-label>
          <ion-input v-model="barlowReducer" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Pixel Size : </ion-label>
          <ion-input v-model="pixelSize" type="number" placeholder="&mu;m"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Resolution : </ion-label>
          <ion-input :value="getResolution" placeholder='"/pixel' readonly></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <br>
    </ion-content>
  </ion-page>
</template>