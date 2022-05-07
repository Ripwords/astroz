<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady">App ready to work offline</span>
      <span v-else>New content available, click on reload button to update.</span>
    </div>
    <ion-button size="small" v-if="needRefresh" @click="updateServiceWorker()">Reload</ion-button>
    <ion-button size="small" @click="close">Close</ion-button>
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  .pwa-toast {
    background-color: #1e1e1e;
  }
}
@media (prefers-color-scheme: light) {
  .pwa-toast {
    background-color: rgb(255, 255, 255);
  }
}
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
}
.pwa-toast .message {
  margin: 8px;
  margin-top: 4px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>