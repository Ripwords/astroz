<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";

// Variables
const loading = "..."
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-header>
        <ion-card-title>Sol 🔆</ion-card-title>
        <ion-card-subtitle>Shining as always</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div style="display: flex; justify-content: flex-start; max-width: 175px;">
          <div style="display: flex; justify-content: space-between; width: 40px">
            <div>Rise</div>
            <div>:</div>
          </div>
          <span style="width: 10px;"></span>
          <div>&nbsp;{{ loading }}</div>
        </div>
        <div style="display: flex; justify-content: flex-start; max-width: 175px;">
          <div style="display: flex; justify-content: space-between; width: 40px">
            <div>Set</div>
            <div>:</div>
          </div>
          <span style="width: 10px;"></span>
          <div>&nbsp;{{ loading }}</div>
        </div>
        <br>
        <div>
          <div style="display: flex; justify-content: space-between; max-width: 275px;">
            <div style="display: flex; justify-content: flex-start; width: 135px; margin-bottom: 5%;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>RA</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div>{{ loading }}</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Dec</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div>{{ loading }}</div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; max-width: 275px;">
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 30px;">
                <div>Alt</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div>{{ loading }}</div>
            </div>
            <div style="display: flex; justify-content: flex-start; width: 135px;">
              <div style="display: flex; justify-content: space-between; width: 35px">
                <div>Az</div>
                <div>:</div>
              </div>
              <span style="width: 10px;"></span>
              <div>{{ loading }}</div>
            </div>
          </div>
        </div>
      </ion-card-content>
    </ion-card-header>
  </ion-card>
</template>