<template>
  <div class="page-content">
    <HlfTable :listData="dataList" v-bind="contentTableConfig">
      <!-- 单独对列做处理的插槽 -->
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          size="small"
          plain
        >
          {{ scope.row.enable ? "可用" : "不可用" }}
        </el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <!-- 控制列插槽 -->
      <template #handler>
        <div class="handler-btns">
          <el-button link type="success" icon="Edit">编辑</el-button>
          <el-button link type="danger" icon="Delete">删除</el-button>
        </div>
      </template>
      <!-- header插槽 -->
      <template #header> </template>
      <template #header-handler> </template>
    </HlfTable>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"
import HlfTable from "@/base-ui/table"
import { useStore } from "@/store"
const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    require: true
  }
})

const store = useStore()
store.dispatch("system/getPageListAction", {
  pageName: props.pageName,
  queryInfo: {
    offset: 0,
    size: 10
  }
})

const dataList = computed(() =>
  store.getters["system/pageListData"](props.pageName)
)
// const userCount = computed(() => store.state.system.userCount)
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #e5eaf3;
}
.handler-btns {
  display: flex;
  justify-content: center;
}
</style>
