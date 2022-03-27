<script lang="ts" setup>
import { isDesktop } from '../functions/utility'
import { planetsCardsInit } from '../functions/planets'
import { planetNames } from '../functions/graphUtils'
import { mainStore } from '../store'

const props = withDefaults(defineProps<{
  showCard?: boolean
}>(), {
  showCard: false
})

const store = mainStore()
const { chartKey, graphConfig } = await planetsCardsInit()
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Planets 🪐</ion-card-title>
      </ion-card-header>
      <ion-card-content v-if="!isDesktop || props.showCard">
        <div class="flex">
          <div>
            <div class="flex justify-start max-w-[175px]" v-for="(planet, index) in planetNames.slice(0, 4)" :key="planet">
              <div class="flex justify-between w-[70px]">
                <div>
                  {{ planet }}
                </div>
                <div>:</div>
              </div>
              <span class="w-[10px]"></span>
              <div class="w-[30px] h-auto opacity-50" :style="{ background: store.planetColors[index] }"></div>
            </div>
          </div>
          <span class="w-[20px]"></span>
          <div>
            <div class="flex justify-start max-w-[175px]" v-for="(planet, index) in planetNames.slice(4, 7)" :key="planet">
              <div class="flex justify-between w-[70px]">
                <div>
                  {{ planet }}
                </div>
                <div>:</div>
              </div>
              <span class="w-[10px]"></span>
              <div class="w-[30px] h-auto opacity-50" :style="{ background: store.planetColors[index + 4] }"></div>
            </div>
          </div>
          <span class="w-[20px]"></span>
        </div>
      </ion-card-content>
      <div class="flex justify-center mb-[10px]"
        :class="{
          'mx-[20px]': isDesktop
        }"
      >
        <Chart :key="chartKey" :config="graphConfig" />
      </div>
    </ion-card-header>
  </ion-card>
</template>