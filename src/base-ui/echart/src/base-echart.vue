<template>
  <div>
    <div ref="chartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts"
import { ref, onMounted, defineProps, withDefaults, watchEffect } from "vue"
import useEchart from "../hooks/useEchart"
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: "100%",
    height: "280px"
  }
)
const chartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(chartDivRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
