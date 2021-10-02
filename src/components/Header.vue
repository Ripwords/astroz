<script lang="ts" setup>
import { IonToolbar, IonHeader, IonTitle, IonMenuButton, IonButtons, IonIcon } from "@ionic/vue";
import { menu } from "ionicons/icons";
import { defineProps } from "vue";
defineProps<{ title: string }>()
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button>
          <ion-icon :icon="menu" color="primary"></ion-icon>
        </ion-menu-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>