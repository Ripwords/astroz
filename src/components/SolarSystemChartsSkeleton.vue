<script lang="ts" setup>
import { phaseEmoji } from '../functions/luna'

</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Sol 🔆</ion-card-title>
      <ion-card-subtitle>Shining as always</ion-card-subtitle>
    </ion-card-header>
    <div class="flex justify-center my-[10px] mx-[20px]">
      <ion-spinner class="mb-5" name="crescent" />
    </div>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Luna {{ phaseEmoji }}</ion-card-title>
    </ion-card-header>
    <div class="flex justify-center my-[10px] mx-[20px]">
      <ion-spinner class="mb-5" name="crescent" />
    </div>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Planets 🪐</ion-card-title>
    </ion-card-header>
    <div class="flex justify-center my-[10px] mx-[20px]">
      <ion-spinner class="mb-5" name="crescent" />
    </div>
  </ion-card>
</template>