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
      <slot></slot>
    </div>
  </div>
  
</template>