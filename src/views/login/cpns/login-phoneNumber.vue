<template>
  <div>
    <el-form :model="form" size="large" :rules="rules" label-width="auto">
      <el-form-item label="手机:" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="验证码:" prop="code">
        <div class="verify-code">
          <el-input v-model="form.code" />
          <el-button type="primary" class="code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { rules } from "../config/phoneNumber.config"
import { ElMessage } from "element-plus"
const form = reactive({
  name: "",
  code: ""
})
const loginAction = () => {
  ElMessage({
    showClose: true,
    message: "手机号登录暂无接口实现.",
    type: "error"
  })
}
defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.verify-code {
  display: flex;
  .code {
    margin-left: 8px;
  }
}
</style>
