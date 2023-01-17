<template>
  <div class="page-search">
    <HlfForm v-bind="searchFormConfig" v-model:formData="formData">
      <template #footer>
        <div class="footer">
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button type="danger" :icon="RefreshRight" @click="handlerReset">
            重置
          </el-button>
        </div>
      </template>
    </HlfForm>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"
import HlfForm from "@/base-ui/form"
import { Search, RefreshRight } from "@element-plus/icons-vue"

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

// 双向绑定的数据是由配置中的field来决定
const originFormDataField: { [key: string]: any } = {}
for (const item of props.searchFormConfig.formItems) {
  originFormDataField[item.field] = ""
}
// 表单状态
const formData = ref(originFormDataField)
// 重置按钮：清空表单状态
const handlerReset = () => {
  for (const key in originFormDataField) {
    formData.value[key] = ""
  }
}
</script>

<style scoped lang="less">
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px 22px 0;
}
</style>
