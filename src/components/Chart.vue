<script lang="ts" setup>
import Chart from "chart.js/auto"
import { Ref } from "vue";

const props = defineProps<{ config: any }>();
const canvas = ref<any>(null)
const chart = ref()
const update = (chart: Ref<any>) => chart.value.update()

defineExpose({ update })

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  chart.value = new Chart(ctx, props.config)
})


</script>

<template>
  <canvas class="m-[50px]" ref="canvas"></canvas>
</template>