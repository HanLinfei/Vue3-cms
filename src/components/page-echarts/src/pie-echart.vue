<template>
  <div class="pie-echart">
    <baseEchart :options="options"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from "@/base-ui/echart"
import { defineProps, computed } from "vue"
import type { IDataType } from "./types"
const props = defineProps<{
  pieData: IDataType[]
}>()
const options = computed(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
