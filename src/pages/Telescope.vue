<script lang="ts" setup>
import {
  varRefs,
  dawesLimit,
  lightGraspRatio,
  magnitudeLimit,
  rayleighLimit
} from '../functions/telescope'
import { pagesStore } from '../store'

const page = pagesStore().pages.telescope
const {
  aperture,
  smallAperture
} = varRefs
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <ion-card>
        <ion-card-header>
          <ion-card-title>Dawes' Limit</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-model="aperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Max. Resolution : </ion-label>
          <ion-input :value="dawesLimit" readonly placeholder="arc seconds"></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Rayleigh Limit</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-model="aperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Max. Resolution : </ion-label>
          <ion-input :value="rayleighLimit" readonly placeholder="arc seconds"></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Limiting Magnitude</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Aperture : </ion-label>
          <ion-input v-model="aperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Limiting Mag. : </ion-label>
          <ion-input :value="magnitudeLimit" readonly placeholder="Magnitude"></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Light Grasp Ratio</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-list>
        <ion-item>
          <ion-label>Larger aperture : </ion-label>
          <ion-input v-model="aperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Sller aperture : </ion-label>
          <ion-input v-model="smallAperture" type="number" placeholder="mm"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Ratio : </ion-label>
          <ion-input :value="lightGraspRatio" readonly placeholder="X"></ion-input>
        </ion-item>
      </ion-list>
      <br>
      <br>
    </ion-content>
  </ion-page>
</template>