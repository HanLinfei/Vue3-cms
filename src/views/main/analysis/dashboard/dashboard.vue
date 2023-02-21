<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card>
          <template #header> 分类商品数量(饼图) </template>
          <template #default>
            <pieEchart :pie-data="categoryGoodsCount"></pieEchart>
          </template>
        </card>
      </el-col>
      <el-col :span="10">
        <card>
          <template #header>不同城市销量</template>
          <template #default>
            <chinaMapEchart
              :map-data="addressCategorySallCount"
            ></chinaMapEchart>
          </template>
        </card>
      </el-col>
      <el-col :span="7">
        <card>
          <template #header>分类商品数量(玫瑰图)</template>
          <template #default
            ><roseEchart :rose-data="categoryGoodsCount"></roseEchart>
          </template>
        </card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <card>
          <template #header> 分类商品的销量 </template>
          <template #default>
            <lineEchart v-bind="categoryGoodsSale"></lineEchart>
          </template>
        </card>
      </el-col>
      <el-col :span="12">
        <card>
          <template #header> 分类商品的收藏 </template>
          <template #default>
            <barEchart v-bind="categoryGoodsFavor"></barEchart>
          </template>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import card from "@/base-ui/card"
import {
  pieEchart,
  roseEchart,
  lineEchart,
  barEchart,
  chinaMapEchart
} from "@/components/page-echarts"
import { computed } from "vue"
import { useStore } from "@/store"
const store = useStore()
store.dispatch("dashboardModule/getDashboardDataAction")
const categoryGoodsCount = computed(() => {
  return store.state.dashboardModule.categoryGoodsCount.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const categoryGoodsSale = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsSaleData = store.state.dashboardModule.categoryGoodsSale
  for (const item of categoryGoodsSaleData) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return {
    xLabels,
    values
  }
})

const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = []
  const values: any[] = []
  const categoryGoodsFavorData = store.state.dashboardModule.categoryGoodsFavor
  for (const item of categoryGoodsFavorData) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }
  return {
    xLabels,
    values
  }
})

const addressCategorySallCount = computed(() => {
  return store.state.dashboardModule.addressGoodsSale.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.dashboard {
  padding: 10px;
}
.el-row {
  margin-bottom: 10px;
}
</style>
