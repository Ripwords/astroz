<script lang="ts" setup>
import { moonCardInit } from '../functions/luna'
import { sunCardInit } from '../functions/sol'
import { isDesktop } from '../functions/utility'
import { phaseEmoji } from '../functions/luna'

const { chartKey: moonChartKey, graphConfig: moonChartConfig } = await moonCardInit()
const { chartKey: sunChartKey, graphConfig: sunGraphConfig } = await sunCardInit()
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Sol 🔆</ion-card-title>
        <ion-card-subtitle>Shining as always</ion-card-subtitle>
      </ion-card-header>
      <div class="flex justify-center my-[10px]"
        :class="{
          'mx-[20px]': isDesktop
        }"
      >
        <Chart :key="sunChartKey" :config="sunGraphConfig" />
      </div>
    </ion-card-header>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Luna {{ phaseEmoji }}</ion-card-title>
      </ion-card-header>
      <div class="flex justify-center my-[10px]"
        :class="{
          'mx-[20px]': isDesktop
        }"
      >
        <Chart :key="moonChartKey" :config="moonChartConfig" />
      </div>
    </ion-card-header>
  </ion-card>
  <PlanetsCard :showCard="true" />
</template>