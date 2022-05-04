<script lang="ts" setup>
import { pagesStore } from '../store'

const page = pagesStore().solarSystem
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <Suspense>
        <template #default>
          <SolarSystemCharts />
        </template>
        <template #fallback>
          <SolarSystemChartsSkeleton />
        </template>
      </Suspense>
    </ion-content>
  </ion-page>
</template>