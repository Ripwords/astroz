<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";
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
        <div style="display: flex; justify-content: space-between; max-width: 270px;">
          <div style="display: flex; justify-content: flex-start; width: 135px; margin-bottom: 5%;">
            <div style="display: flex; justify-content: space-between; width: 30px;">
              <div>RA</div>
              <div>:</div>
            </div>
            <span style="width: 10px;"></span>
            <div class="noAlign">...</div>
          </div>
          <div style="display: flex; justify-content: flex-start; width: 135px;">
            <div style="display: flex; justify-content: space-between; width: 35px">
              <div>Dec</div>
              <div>:</div>
            </div>
            <span style="width: 10px;"></span>
            <div class="noAlign">...</div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; max-width: 270px;">
          <div style="display: flex; justify-content: flex-start; width: 135px;">
            <div style="display: flex; justify-content: space-between; width: 30px;">
              <div>Alt</div>
              <div>:</div>
            </div>
            <span style="width: 10px;"></span>
            <div class="noAlign">...</div>
          </div>
          <div style="display: flex; justify-content: flex-start; width: 135px;">
            <div style="display: flex; justify-content: space-between; width: 35px">
              <div>Az</div>
              <div>:</div>
            </div>
            <span style="width: 10px;"></span>
            <div class="noAlign">...</div>
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>