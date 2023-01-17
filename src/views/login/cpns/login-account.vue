<template>
  <div>
    <el-form
      :model="form"
      size="large"
      :rules="rules"
      label-width="auto"
      ref="formRef"
    >
      <el-form-item label="账号:" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useStore } from "vuex"
import { rules } from "../config/account.config"
import { ElForm } from "element-plus"
import localCache from "@/utils/cache"

const store = useStore()

// 表单内容
const form = reactive({
  name: localCache.getCache("name") ?? "",
  password: localCache.getCache("password") ?? ""
})
// ElForm组件
const formRef = ref<InstanceType<typeof ElForm>>()

// 登录事件：被父组件来执行
const loginAction = (isKeepPassword: boolean) => {
  // ElForm组件下面有一个validate方法：
  // 该方法需要传入一个回调 然后会给该回调传来一个参数
  // 该参数是布尔类型：校验通过为true，不符合为false
  formRef.value?.validate((valid) => {
    // 校验通过
    if (valid) {
      // 1.判断是否记住密码
      if (isKeepPassword) {
        // 本地缓存
        localCache.setCache("name", form.name)
        localCache.setCache("password", form.password)
        localCache.setCache("isKeepPassword", true)
      } else {
        // 如果本次没有选中记住密码，则需要清空缓存的密码
        localCache.clearCache()
      }
      // 2.开始进行登录验证
      store.dispatch("login/accountLoginAction", { ...form })
    }
  })
}

// 因为使用了setup在script标签里的形式 这种方式会导致属性无法向外暴露 所以需要使用该方法向外显示的暴露
defineExpose({
  loginAction
})
</script>

<style scoped></style>
