<script lang="ts" setup>
import { IonSplitPane, IonMenu, IonHeader, IonToolbar, IonContent, IonRouterOutlet, IonTitle, IonItem, IonList, IonMenuToggle, IonIcon } from "@ionic/vue";
import { telescopeOutline, cogOutline } from "ionicons/icons";
import { useMainStore } from "../store/pinia";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const store = useMainStore()
const pages = store.pages
const isActive = (path: string) => path === route.fullPath
</script>

<template>
  <ion-split-pane content-id="main-content">
    <ion-menu content-id="main-content">
      <ion-header color="primary">
        <ion-toolbar>
          <ion-title>Astro Calc 🌌</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle auto-hide="false" v-for="page in pages" :key="page.title">
            <ion-item
              v-if="page.title == 'Settings'"
              class="noselect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <ion-icon :icon="cogOutline"></ion-icon>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else
              class="noselect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <ion-icon :icon="telescopeOutline"></ion-icon>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-split-pane>
</template>

<style scoped>
.active-link {
  --ion-text-color: var(--ion-color-primary);
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.noselect:hover {
  color: var(--ion-color-primary);
}

.active {
  color: var(--ion-color-primary);
}
</style>