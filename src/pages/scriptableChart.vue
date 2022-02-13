<template>
  <ion-page>
    <ion-content>
      <Suspense>
        <template #default>
          <scriptableSun />
        </template>
        <template #fallback>
          <scriptableSkeleton />
        </template>
      </Suspense>
      <Suspense>
        <template #default>
          <scriptableMoon />
        </template>
        <template #fallback>
          <scriptableSkeleton />
        </template>
      </Suspense>
    </ion-content>
  </ion-page>
</template>