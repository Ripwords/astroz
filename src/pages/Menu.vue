<script lang="ts" setup>
import { pagesStore } from '../store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pages: any = []
Object.entries(pagesStore()).map(page => {
  if (!page[0].startsWith('$') && !page[0].startsWith('_')) {
    pages.push(page[1])
  }
})

const ver = __APP_VERSION__

const isActive = (path: string) => path === route.fullPath
const redirectToGithub = () => window.open("https://github.com/Ripwords/astroz")
</script>

<template>
  <ion-split-pane content-id="menu-items">
    <ion-menu content-id="menu-items">
      <ion-header color="primary">
        <ion-toolbar>
          <ion-title>
            Astroz 🌌
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle auto-hide="false" v-for="page in pages" :key="page">
            <ion-item
              v-if="page.title == 'Settings'"
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <i-ion:cog-outline></i-ion:cog-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else-if="page.title == 'Home'"
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <i-ion:home-outline></i-ion:home-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else-if="page.title == 'Solar System'"
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <i-ion:planet-outline></i-ion:planet-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else-if="page.title == 'Weather'"
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <i-ion:cloud-outline></i-ion:cloud-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else-if="page.title == 'CCD Calculations'"
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
            <i-ion:camera-outline></i-ion:camera-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else-if="page.title == 'Optics'"
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <i-ion:aperture-outline></i-ion:aperture-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else-if="page.title == 'Filter'"
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <i-ion:color-filter-outline></i-ion:color-filter-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else-if="page.title == 'Magnification'"
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <i-ion:search-outline></i-ion:search-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
            <ion-item
              v-else
              class="noSelect"
              @click="router.replace(page.path)"
              :class="{ active: isActive(page.path) }"
            >
              <i-ion:telescope-outline></i-ion:telescope-outline>
              &nbsp;&nbsp;{{ page.title }}
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
      <ion-footer mode="md">
        <ion-toolbar>
          <ion-item class="ml-1" slot="start">
            <div class="text-dark-50">
              v{{ ver }}
            </div>
          </ion-item>
          <ion-item slot="end">
            <i-ion:logo-github @click="redirectToGithub()"></i-ion:logo-github>
          </ion-item>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>
    <ion-router-outlet id="menu-items"></ion-router-outlet>
  </ion-split-pane>
</template>

<style scoped>
.active {
  color: var(--ion-color-primary);
}

.active-link {
  --ion-text-color: var(--ion-color-primary);
}
</style>