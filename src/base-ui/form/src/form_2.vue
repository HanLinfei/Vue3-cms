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
import { defineProps, PropType, watch, defineEmits, reactive } from "vue"
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

// ??????????????????

// ?????????????????????????????????????????????????????????????????????
// 1. ??????????????? ???????????????????????????????????????
// 2. ?????????????????????(?????????) ???????????????????????? ?????????????????????
const copyFormData = reactive({ ...props.formData })
// const copyFromData = computed(() => ({ ...props.formData }))
const emit = defineEmits(["update:formData"])

// ????????????????????? => ????????????????????????????????????
watch(
  copyFormData,
  (newValue) => {
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
