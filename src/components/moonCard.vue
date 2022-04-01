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
  <ion-card>
    <ion-card-header>
      <ion-card-title>Luna {{ phaseEmoji }}</ion-card-title>
      <ion-card-subtitle>{{ phase }} ( {{ lunaPercent }}% )</ion-card-subtitle>
      <ion-card-subtitle>Next Full Moon : {{ fullMoon.day }}/{{ fullMoon.month }}/{{ fullMoon.year }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div class="flex justify-start max-w-[175px]">
        <div class="flex justify-between w-[50px]">
          <div>Rise</div>
          <div>:</div>
        </div>
        <span class="w-[10px]"></span>
        <div>&nbsp;{{ lunaRise }}</div>
      </div>
      <div class="flex justify-start max-w-[175px]">
        <div class="flex justify-between w-[50px]">
          <div>Set</div>
          <div>:</div>
        </div>
        <span class="w-[10px]"></span>
        <div>&nbsp;{{ lunaSet }}</div>
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
        <div class="flex justify-between max-w-[270px]">
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
        <div class="flex justify-between max-w-[270px]">
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
    <div class="flex justify-center my-[10px] mx-[20px]">
      <Chart :key="chartKey" :config="graphConfig" />
    </div>
  </ion-card>
</template>