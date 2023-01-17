<template>
  <div class="hlf-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              class="form-item"
              :style="itemStyle"
              size="large"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="copyFormData[item.field]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="copyFormData[item.field]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="copyFormData[item.field]"
                  type="daterange"
                  start-placeholder="Start Date"
                  end-placeholder="End Date"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, watch, defineEmits, reactive, ref } from "vue"
import type { IFormItem } from "../index"
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: "100px"
  },
  itemStyle: {
    type: Object
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
})

// 实现双向绑定

// 不要违反单向数据流：子组件不要直接修改父组件：
// 1. 浅拷贝一份 子组件内部绑定拷贝的这一份
// 2. 子组件触发更改(拷贝的) 然后发送事件出去 修改父组件状态
const copyFormData = reactive({ ...props.formData })
// console.log(copyFormData === props.formData.value)
// const copyFromData = computed(() => ({ ...props.formData }))
const emit = defineEmits(["update:formData"])

// 子组件出发更改 => 发送事件出去进行修改状态
watch(
  copyFormData,
  (newValue) => {
    console.log("监听到了copyFromData的改变", newValue)
    emit("update:formData", newValue)
  },
  {
    deep: true
  }
)
</script>

<style scoped lang="less">
.el-form {
  padding-top: 22px;
  .el-form-item {
    padding: 5px 10px;
  }
}
.el-select {
  width: 100%;
}
</style>
