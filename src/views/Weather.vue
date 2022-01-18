<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonInput, IonList, IonItem, IonLabel } from "@ionic/vue";
import { computed, ref } from "vue";
import Header from "../components/Header.vue";
import { usePagesStore, useMainStore } from "../store/pinia";

const store = useMainStore()
const page = usePagesStore().pages[1]
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      
    </ion-content>
  </ion-page>
</template>