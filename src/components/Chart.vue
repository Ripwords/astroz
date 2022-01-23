<script lang="ts" setup>
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";

const props = defineProps<{ config: any }>();
const chart = ref<any>(null)

onMounted(() => {
  const ctx = chart.value.getContext('2d')
  new Chart(ctx, props.config)
})
</script>

<template>
  <canvas class="charts" ref="chart"></canvas>
</template>

<style scoped>
.charts {
  margin: 50px;
}
</style>