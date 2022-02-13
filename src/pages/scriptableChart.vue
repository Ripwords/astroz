<script lang="ts" setup>
import { 
  phase,
  phaseEmoji,
  lunaPercent,
  lunaRise,
  lunaSet,
  fullMoon,
  lunaEqCoordinates,
  lunaHorCoordinates,
  moonCardInit
} from '../functions/luna'
import { mainStore } from '../store'

const store = mainStore()
const EQ = lunaEqCoordinates.value
const HOR = lunaHorCoordinates.value

const { chartKey, transitAltitude, graphConfig } = await moonCardInit()
</script>

<template>
<ion-page>
  <ion-content>
    <Chart :key="chartKey" :config="graphConfig" />
  </ion-content>
</ion-page>  
</template>