<script lang="ts" setup>
import { planetsCardsInit } from '../functions/planets'

const { chartKey, graphConfig } = await planetsCardsInit()
</script>

<template>
  <Chart :key="chartKey" :config="graphConfig" />
</template>