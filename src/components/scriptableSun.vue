<script lang="ts" setup>
import { 
  solEqCoordinates, 
  solHorCoordinates, 
  sunCardInit, 
  sunRise, 
  sunSet 
} from '../functions/sol'
import { mainStore } from '../store'

const store = mainStore()
const EQ = solEqCoordinates.value
const HOR = solHorCoordinates.value

const { chartKey, transitAltitude, graphConfig } = await sunCardInit()
</script>

<template>
  <Chart :key="chartKey" :config="graphConfig" />
</template>