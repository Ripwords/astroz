<script lang="ts" setup>
import { moonCardInit } from '../functions/luna'
import { sunCardInit } from '../functions/sol'
import { planetsCardsInit } from '../functions/planets'
import { pagesStore } from '../store'

const { chartKey: moonChartKey, graphConfig: moonChartConfig } = await moonCardInit()
const { chartKey: sunChartKey, graphConfig: sunGraphConfig } = await sunCardInit()
const { chartKey: planetsChartKey, graphConfig: planetsGraphConfig } = await planetsCardsInit()
</script>

<template>
  <Chart :key="moonChartKey" :config="moonChartConfig" />
  <Chart :key="sunChartKey" :config="sunGraphConfig" />
  <Chart :key="planetsChartKey" :config="planetsGraphConfig" />
</template>