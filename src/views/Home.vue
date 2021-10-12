<script lang="ts" setup>
import { IonPage, IonContent } from "@ionic/vue";
import Header from "../components/Header.vue";
import MoonCard from "../components/moonCard.vue";
import CoordCard from "../components/coordCard.vue";
import SunCard from "../components/sunCard.vue";
import { usePagesStore } from "../store/pinia";
import SunCardLoading from "../components/sunCardLoading.vue";

const page = usePagesStore().pages[0]
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <keep-alive>
        <Suspense>
          <template #default>
            <SunCard />
          </template>
          <template #fallback>
            <SunCardLoading />
          </template>
        </Suspense>
      </keep-alive>
      <MoonCard />
      <CoordCard />
    </ion-content>
  </ion-page>
</template>