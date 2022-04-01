<script lang="ts" setup>
import { moonCardInit } from '../functions/luna'
import { sunCardInit } from '../functions/sol'
import { phaseEmoji } from '../functions/luna'

const { chartKey: moonChartKey, graphConfig: moonGraphConfig } = await moonCardInit()
const { chartKey: sunChartKey, graphConfig: sunGraphConfig } = await sunCardInit()
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Sol 🔆</ion-card-title>
      <ion-card-subtitle>Shining as always</ion-card-subtitle>
    </ion-card-header>
    <div class="flex justify-center my-[10px] mx-[20px]">
      <Chart :key="sunChartKey" :config="sunGraphConfig" />
    </div>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Luna {{ phaseEmoji }}</ion-card-title>
    </ion-card-header>
    <div class="flex justify-center my-[10px] mx-[20px]">
      <Chart :key="moonChartKey" :config="moonGraphConfig" />
    </div>
  </ion-card>
  <PlanetsCard :showCard="true" />
</template>