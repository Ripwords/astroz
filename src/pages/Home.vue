<script lang="ts" setup>
import { pagesStore } from '../store'
import MoonCardSkeleton from '../components/MoonCardSkeleton.vue'

const page = pagesStore().home
</script>

<template>
  <ion-page>
    <ion-content>
      <Header :title="page.title" />
      <!-- <Suspense>
        <template #default>
          <SunCard />
        </template>
        <template #fallback>
          <SunCardSkeleton />
        </template>
      </Suspense>
      <Suspense>
        <template #default>
          <MoonCard />
        </template>
        <template #fallback>
          <MoonCardSkeleton />
        </template>
      </Suspense> -->
      <WeatherCard />
      <CoordCard />
      <Suspense>
        <template #default>
          <PlanetsCard />
        </template>
        <template #fallback>
          <div>...</div>
        </template>
      </Suspense>
    </ion-content>
  </ion-page>
</template>