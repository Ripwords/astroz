<script lang="ts" setup>
const props = defineProps<{ title: string }>()
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ props.title }}</ion-card-title>
    </ion-card-header>
  </ion-card>
  <div class="flex justify-center">
    <div class="w-[95%]">
      <ion-grid class="ion-no-padding ion-align-items-center">

        <slot></slot>
      </ion-grid>
    </div>
  </div>

</template>