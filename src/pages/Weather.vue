<script lang="ts" setup>
import { forecast, forecastInit } from '../functions/weather'
import { pagesStore } from '../store'

const page = pagesStore().weather
const { forecastLink, forecastImage, annualDarkness } = forecast
forecastInit()
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
            <div class="flex justify-center">
              <a target="_blank" :href="forecastLink" rel="noopener noreferrer">
                <img alt="forecast image" :src="forecastImage" />
              </a>
            </div>
            <br>
            <br>
            <div class="flex justify-center">
              <img alt="annual darkness image" :src="annualDarkness">
            </div>
          </ion-card-content>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>