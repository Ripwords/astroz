<script lang="ts" setup>
const loading = ref('...')
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Luna</ion-card-title>
        <ion-card-subtitle>Moon phase is ...</ion-card-subtitle>
        <ion-card-subtitle>Next Full Moon : ...</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div class="flex justify-start max-w-[175px]">
          <div class="flex justify-between w-[40px]">
            <div>Rise</div>
            <div>:</div>
          </div>
          <span class="w-[10px]"></span>
          <div>&nbsp;{{ loading }}</div>
        </div>
        <div class="flex justify-start max-w-[175px]">
          <div class="flex justify-between w-[40px]">
            <div>Set</div>
            <div>:</div>
          </div>
          <span class="w-[10px]"></span>
          <div>&nbsp;{{ loading }}</div>
        </div>
        <br>
        <div class="flex justify-between max-w-[270px]">
          <div class="flex justify-start w-[135px] mb-[5%]">
            <div class="flex justify-between w-[30px]">
              <div>RA</div>
              <div>:</div>
            </div>
            <span class="w-[10px]"></span>
            <div class="float-right">{{ loading }}</div>
          </div>
          <div class="flex justify-start w-[135px]">
            <div class="flex justify-between w-[35px]">
              <div>Dec</div>
              <div>:</div>
            </div>
            <span class="w-[10px]"></span>
            <div class="float-right">{{ loading }}</div>
          </div>
        </div>
        <div class="flex justify-between max-w-[270px]">
          <div class="flex justify-start w-[135px]">
            <div class="flex justify-between w-[30px]">
              <div>Alt</div>
              <div>:</div>
            </div>
            <span class="w-[10px]"></span>
            <div class="float-right">{{ loading }}</div>
          </div>
          <div class="flex justify-start w-[135px]">
            <div class="flex justify-between w-[35px]">
              <div>Az</div>
              <div>:</div>
            </div>
            <span class="w-[10px]"></span>
            <div class="float-right">{{ loading }}</div>
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>