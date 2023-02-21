<template>
  <div class="user">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="user"
      @openPageModal="openPageModalHandler"
      @updateHandler="updateHandle"
    ></page-content>
    <pageModal
      :modalConfig="modalConfigComputedRef"
      :modalTitle="dialogTitle + '用户'"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></pageModal>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
import pageSearch from "@/components/page-search"
import pageContent from "@/components/page-content"
import pageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/usePageSearch"
import { usePageModal } from "@/hooks/usePageModal"

import { useStore } from "vuex"
const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
const [
  pageModalRef,
  defaultInfo,
  dialogTitle,
  openPageModalHandler,
  updateHandle
] = usePageModal(createCallback, updateCallback)
const modalConfigRef = reactive(modalConfig)

// 页面单独的逻辑
function createCallback() {
  const passwordItem = modalConfigRef.formItems.find(
    (item) => item.field === "password"
  )
  if (passwordItem) {
    passwordItem.isHidden = false
  }
}
function updateCallback() {
  const passwordItem = modalConfigRef.formItems.find(
    (item) => item.field === "password"
  )

  if (passwordItem) {
    passwordItem.isHidden = true
  }
}

// 动态添加部门和角色列表
const store = useStore()
// 这里使用computed是因为 如果我们直接来到user这个组件来刷新 那么说明该组件会直接被渲染，但是由于我们vuex中请求数据是异步的
// 所以可能导致数据此时还没有到 那么此时组件渲染时候用到的数据可能是空的 所以我们需要等到数据到了之后 产生一个副作用（重新更新模板状态）
// 副作用的方式 ：
// 模板中用到了一个响应式对象 此时这个响应式对象发生变化了 模板会随之一起更新
// computed中对一些对象有所依赖 当这个对象发生了变化之后 这个computed会重新执行
const modalConfigComputedRef = computed(() => {
  const departmentItem = modalConfigRef.formItems.find(
    (item) => item.field === "departmentId"
  )
  if (departmentItem?.options) {
    departmentItem.options = store.state.entireDepartment.map((item: any) => {
      return { title: item.name, value: item.id }
    })
  }

  const roleItem = modalConfigRef.formItems.find(
    (item) => item.field === "roleId"
  )
  if (roleItem?.options) {
    roleItem.options = store.state.entireRole.map((item: any) => {
      return { title: item.name, value: item.id }
    })
  }
  return modalConfigRef
})
</script>

<style scoped lang="less"></style>
