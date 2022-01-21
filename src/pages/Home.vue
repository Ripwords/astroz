<script lang="ts" setup>
import { pagesStore } from '../store'

const page = pagesStore().pages.home
</script>

<template>
  <ion-page>
    <ion-content>
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
    </ion-content>
  </ion-page>
</template>