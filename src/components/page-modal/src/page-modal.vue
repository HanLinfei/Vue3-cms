<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="modalTitle"
      width="30%"
      align-center
    >
      <HlfForm v-bind="modalConfig" v-model:formData="formData"></HlfForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose, watch } from "vue"
import { useStore } from "vuex"
import HlfForm from "@/base-ui/form"

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  modalTitle: {
    type: String,
    default: ""
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  }
})

watch(
  () => props.modalConfig,
  (newValue) => {
    console.log("更新了", newValue)
  }
)

const centerDialogVisible = ref(false)
// 绑定modal中的数据
const formData = ref<any>({})

// 默认绑定一次 将原有的数据默认绑定到modal表单中(回显)
watch(
  () => props.defaultInfo,
  (newValue) => {
    // 遍历表单中的字段 然后这个newValue是点击之后传来的值 然后将这个值依次绑定到表单的字段中
    // field是表单中的值属性 给这个field属性绑定值就可以了
    for (const item of props.modalConfig.formItems) {
      formData.value[item.field] = newValue[item.field]
    }
  }
)

// 确定按钮逻辑
const store = useStore()
function handleConfirmClick() {
  // 关闭窗口
  centerDialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch("system/editPageDataAction", {
      pageName: props.pageName,
      pageData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch("system/createPageDataAction", {
      pageName: props.pageName,
      pageData: { ...formData.value, ...props.otherInfo }
    })
  }
}

defineExpose({
  centerDialogVisible
})
</script>

<style scoped></style>
