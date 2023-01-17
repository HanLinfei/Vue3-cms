<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div>
      <el-tabs
        type="border-card"
        class="demo-tabs"
        stretch
        v-model="currentTab"
      >
        <el-tab-pane class="el-tab" name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登陆</span>
            </span>
          </template>
          <loginAccountVue ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane class="el-tab" name="phoneNumber">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Cellphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <loginPhoneNumberVue ref="phoneNumberRef" />
        </el-tab-pane>
      </el-tabs>
      <div class="login-other">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button
        type="primary"
        class="login"
        size="large"
        @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { ElTabs, ElTabPane } from "element-plus"
import loginAccountVue from "./login-account.vue"
import loginPhoneNumberVue from "./login-phoneNumber.vue"
import localCache from "@/utils/cache"
// 保存记住密码的状态
const isKeepPassword = localCache.getCache("isKeepPassword")
  ? ref(true)
  : ref(false)
/**
 * 先通过typeof拿到这个loginAccountVue组件的类型
 * 之后再通过InstanceType来拿到这个类型的实例
 * 其实可以理解为 loginAccountVue 是一个构造函数 也就是一个类
 * 然后通过这个类可以创建很多组件实例
 */
const accountRef = ref<InstanceType<typeof loginAccountVue>>()
const phoneNumberRef = ref<InstanceType<typeof loginPhoneNumberVue>>()
const currentTab = ref<string>("account")
// 登录事件
const handleLoginClick = () => {
  // 账号登陆
  if (currentTab.value === "account") {
    accountRef.value?.loginAction(isKeepPassword.value)
  } else {
    // 手机登录
    phoneNumberRef.value?.loginAction()
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 370px;
  margin-bottom: 300px;
  h1 {
    text-align: center;
  }
  .custom-tabs-label {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .login-other {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
