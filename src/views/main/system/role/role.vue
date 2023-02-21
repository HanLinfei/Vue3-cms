<template>
  <div>
    <pageSearch :searchFormConfig="searchFormConfig"></pageSearch>
    <pageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @openPageModal="openPageModalHandler"
      @updateHandler="updateHandle"
    ></pageContent>
    <pageModal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :modalTitle="dialogTitle + '角色'"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        :data="menusComputedRef"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
        ref="elTreeRef"
      />
    </pageModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from "vue"
import pageContent from "@/components/page-content"
import pageSearch from "@/components/page-search"
import { ElTree } from "element-plus"
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"
import { usePageModal } from "@/hooks/usePageModal"
import { mapLeafNodeByMenus } from "@/utils/map-menus"
import pageModal from "@/components/page-modal"
import { useStore } from "vuex"

const [
  pageModalRef,
  defaultInfo,
  dialogTitle,
  openPageModalHandler,
  updateHandle
] = usePageModal(undefined, getMenuOptionsCb)

const store = useStore()
const menusComputedRef = computed(() => store.state.entireMenu)

const elTreeRef = ref<InstanceType<typeof ElTree>>()
const otherInfo = ref({})
function handleCheckChange(data1: any, data2: any) {
  // 选中和半选 => 做合并
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
// 传入回调到hooks => 当前选中项
function getMenuOptionsCb(item: any) {
  const leafKeys = mapLeafNodeByMenus(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

onMounted(() => {
  console.log("role挂载完毕")
})
</script>

<style scoped></style>
