<script lang="ts" setup>
import { 
  solEqCoordinates, 
  solHorCoordinates, 
  sunCardInit, 
  sunRise, 
  sunSet 
} from '../functions/sol'
import { mainStore } from '../store'
import { isDesktop } from '../functions/utility'

const store = mainStore()
const EQ = solEqCoordinates.value
const HOR = solHorCoordinates.value

const { chartKey, transitAltitude, graphConfig } = await sunCardInit()
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Sol 🔆</ion-card-title>
        <ion-card-subtitle>Shining as always</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div class="flex justify-start max-w-[175px]">
          <div class="flex justify-between w-[50px]">
            <div>Rise</div>
            <div>:</div>
          </div>
          <span class="w-[10px]"></span>
          <div>&nbsp;{{ sunRise }}</div>
        </div>
        <div class="flex justify-start max-w-[175px]">
          <div class="flex justify-between w-[50px]">
            <div>Set</div>
            <div>:</div>
          </div>
          <span class="w-[10px]"></span>
          <div>&nbsp;{{ sunSet }}</div>
        </div>
        <div class="flex justify-start max-w-[175px]">
          <div class="flex justify-between w-[50px]">
            <div>Peaks</div>
            <div>:</div>
          </div>
          <span class="w-[10px]"></span>
          <div>&nbsp;{{ transitAltitude }}&deg;</div>
        </div>
        <br>
        <div v-if="!store.units">
          <div class="flex justify-between max-w-[275px]">
            <div class="flex justify-start w-[135px] mb-[5%]">
              <div class="flex justify-between w-[30px]">
                <div>RA</div>
                <div>:</div>
              </div>
              <span class="w-[10px]"></span>
              <div class="float-right">{{ EQ.RA.degree }}&deg;</div>
            </div>
            <div class="flex justify-start w-[135px]">
              <div class="flex justify-between w-[35px]">
                <div>Dec</div>
                <div>:</div>
              </div>
              <span class="w-[10px]"></span>
              <div class="float-right">{{ EQ.DEC.degree }}&deg;</div>
            </div>
          </div>
          <div class="flex justify-between max-w-[275px]">
            <div class="flex justify-start w-[135px]">
              <div class="flex justify-between w-[30px]">
                <div>Alt</div>
                <div>:</div>
              </div>
              <span class="w-[10px]"></span>
              <div class="float-right">{{ HOR.Alt.degree }}&deg;</div>
            </div>
            <div class="flex justify-start w-[135px]">
              <div class="flex justify-between w-[35px]">
                <div>Az</div>
                <div>:</div>
              </div>
              <span class="w-[10px]"></span>
              <div class="float-right">{{ HOR.Az.degree }}&deg;</div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="flex justify-between max-w-[285px]">
            <div class="flex justify-start w-[135px] mb-[5%]">
              <div class="flex justify-between w-[30px]">
                <div>RA</div>
                <div>:</div>
              </div>
              <span class="w-[4px]"></span>
              <div class="float-right">{{ EQ.RA.hour }}<sub>h</sub> {{ EQ.RA.min }}<sub>m</sub> {{ EQ.RA.sec }}<sub>s</sub></div>
            </div>
            <div class="flex justify-start w-[135px]">
              <div class="flex justify-between w-[35px]">
                <div>Dec</div>
                <div>:</div>
              </div>
              <span class="w-[4px]"></span>
              <div class="float-right">{{ EQ.DEC.arc }}&deg; {{ EQ.DEC.min }}' {{ EQ.DEC.sec }}"</div>
            </div>
          </div>
          <div class="flex justify-between max-w-[285px]">
            <div class="flex justify-start w-[135px]">
              <div class="flex justify-between w-[30px]">
                <div>Alt</div>
                <div>:</div>
              </div>
              <span class="w-[4px]"></span>
              <div class="float-right">{{ HOR.Alt.arc }}&deg; {{ HOR.Alt.min }}' {{ HOR.Alt.sec }}"</div>
            </div>
            <div class="flex justify-start w-[135px]">
              <div class="flex justify-between w-[35px]">
                <div>Az</div>
                <div>:</div>
              </div>
              <span class="w-[4px]"></span>
              <div class="float-right">{{ HOR.Az.arc }}&deg; {{ HOR.Az.min }}' {{ HOR.Az.sec }}"</div>
            </div>
          </div>
        </div>
      </ion-card-content>
      <div class="flex justify-center my-[10px]"
        :class="{
          'mx-[20px]': isDesktop
        }"
      >
        <Chart :key="chartKey" :config="graphConfig" />
      </div>
    </ion-card-header>
  </ion-card>
</template>