<script lang="ts" setup>
import { moonCardInit } from '../functions/luna'
import { sunCardInit } from '../functions/sol'
import { planetsCardsInit } from '../functions/planets'

const { chartKey: moonChartKey, graphConfig: moonChartConfig } = await moonCardInit()
const { chartKey: sunChartKey, graphConfig: sunGraphConfig } = await sunCardInit()
</script>

<template>
  <PlanetsCard :showCard="true" />
  <Chart :key="moonChartKey" :config="moonChartConfig" />
  <Chart :key="sunChartKey" :config="sunGraphConfig" />
</template>