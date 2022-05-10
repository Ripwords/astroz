<script lang="ts" setup>
import { refreshPage } from '../functions/utility'
</script>

<template>
  <ion-refresher slot="fixed" id="refresher" @ionRefresh="refreshPage">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
</template>