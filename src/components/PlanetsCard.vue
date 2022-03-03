<script lang="ts" setup>
import { planetsCardsInit } from '../functions/planets'
import { planetNames, isDesktop } from '../functions/utility'
import { mainStore } from '../store'

const store = mainStore()
const { chartKey, graphConfig } = await planetsCardsInit()
</script>

<template>
  <ion-card v-if="isDesktop">
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Planets</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <div class="flex">
          <div>
            <div class="flex justify-start max-w-[175px]" v-for="(planet, index) in planetNames.slice(0, 3)" :key="planet">
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
            <div class="flex justify-start max-w-[175px]" v-for="(planet, index) in planetNames.slice(3, 6)" :key="planet">
              <div class="flex justify-between w-[70px]">
                <div>
                  {{ planet }}
                </div>
                <div>:</div>
              </div>
              <span class="w-[10px]"></span>
              <div class="w-[30px] h-auto opacity-50" :style="{ background: store.planetColors[index + 3] }"></div>
            </div>
          </div>
          <span class="w-[20px]"></span>
          <div>
            <div class="flex justify-start max-w-[175px]" v-for="(planet, index) in planetNames.slice(6)" :key="planet">
              <div class="flex justify-between w-[70px]">
                <div>
                  {{ planet }}
                </div>
                <div>:</div>
              </div>
              <span class="w-[10px]"></span>
              <div class="w-[30px] h-auto opacity-50" :style="{ background: store.planetColors[index + 6] }"></div>
            </div>
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
  <Chart :key="chartKey" :config="graphConfig" />
</template>