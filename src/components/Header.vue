<script lang="ts" setup>
defineProps<{ title: string }>()
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button>
          <i-ion:menu class="menuIcon" />
        </ion-menu-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>
.menuIcon {
  color: var(--ion-color-primary);
}
</style>