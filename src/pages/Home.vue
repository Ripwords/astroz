<script lang="ts" setup>
import { pagesStore } from '../store'

const page = pagesStore().home
</script>

<template>
  <ion-page>
    <ion-content>
      <Refresher />
      <Header :title="page.title" />
      <Suspense>
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
      </Suspense>
      <WeatherCard />
      <CoordCard />
      <Suspense>
        <template #default>
          <PlanetsCard />
        </template>
        <template #fallback>
          <PlanetsCardSkeleton />
        </template>
      </Suspense>
    </ion-content>
  </ion-page>
</template>