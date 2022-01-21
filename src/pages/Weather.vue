<script lang="ts" setup>
import { forecast, forecastInit } from '../functions/weather'
import { pagesStore } from '../store'

const page = pagesStore().pages.weather
const { forecastLink, forecastImage, annualDarkness } = forecast
forecastInit()
console.log('yo')
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <ion-card>
        <ion-card-header>
          <ion-card-header>
            <ion-card-title>Weather ☁</ion-card-title>
            <ion-card-subtitle>Your daily dose of weather information</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <a target="_blank" :href="forecastLink">
              <img :src="forecastImage" />
            </a>
            <br>
            <br>
            <img :src="annualDarkness">
          </ion-card-content>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>