<script lang="ts" setup>
import { IonPage, IonContent } from "@ionic/vue";
import Header from "../components/Header.vue";
import MoonCard from "../components/moonCard.vue";
import SunCard from "../components/sunCard.vue";
import { usePagesStore } from "../store/pinia";

const page = usePagesStore().pages[0]
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <!-- ion-cards -->
      <MoonCard />
      <SunCard />
    </ion-content>
  </ion-page>
</template>