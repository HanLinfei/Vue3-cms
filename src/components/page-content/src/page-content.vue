<template>
  <div class="page-content">
    <HlfTable
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo"
      v-bind="contentTableConfig"
    >
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
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            link
            type="success"
            v-if="isUpdate"
            icon="Edit"
            @click="handleUpdateClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            v-if="isDelete"
            icon="Delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- header插槽 -->
      <template #header> </template>
      <template #header-handler="scope">
        <el-button
          type="success"
          size="large"
          v-if="isCreate"
          @click="showPageModalHandler"
        >
          {{ scope.btnName }}
        </el-button>
      </template>
      <!-- 跨组件插槽 -->
      <!-- 在组件里使用插槽 然后在插槽中继续插入插槽 注意名字需要对应 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 判断是否有插槽 如果有的话 则在此插槽中继续创建插槽 名字需要对应 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot
        ></template>
      </template>
    </HlfTable>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  defineExpose,
  ref,
  watch,
  defineEmits,
  onMounted
} from "vue"
import { usePermission } from "@/hooks/usePermission"
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

// 从vuex中获取数据
const dataList = computed(() =>
  store.getters["system/pageListData"](props.pageName)
)
const dataCount = computed(() =>
  store.getters["system/pageListCount"](props.pageName)
)

// 获取角色的权限
const isCreate = usePermission(props.pageName as string, "create")
const isUpdate = usePermission(props.pageName as string, "update")
const isDelete = usePermission(props.pageName as string, "delete")
const isQuery = usePermission(props.pageName as string, "query")
// 双向绑定pagenation组件
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch("system/getPageListAction", {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()
watch(pageInfo, () => {
  getPageData()
})

// 获取其他的动态插槽名称
// 除去固定的一些插槽
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === "status") return false
    if (item.slotName === "createAt") return false
    if (item.slotName === "updateAt") return false
    if (item.slotName === "handler") return false
    return true
  }
)

// 删除 编辑 新建操作
// 删除操作
function handleDeleteClick(item: any) {
  store.dispatch("system/deletePageDataAction", {
    id: item.id,
    pageName: props.pageName === "user" ? "users" : props.pageName
  })
}

// 新建操作
const emit = defineEmits<{
  (e: "openPageModal"): void
  (e: "updateHandler", item: any): void
}>()

function showPageModalHandler() {
  emit("openPageModal")
}

// 编辑操作
function handleUpdateClick(item: any) {
  emit("updateHandler", item)
}

onMounted(() => {
  console.log("pageContent挂载完毕")
})

defineExpose({
  getPageData
})
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
