<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 这里需要控制侧边栏的宽度，如果是折叠状态，那么宽度就需要进行改变 -->
      <el-aside :width="!isFlodState ? '200px' : '65px'" class="el-aside">
        <NavMenu :isFlod="isFlodState" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @changeFoldState="isFlodHandler" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <!-- 路由跳转内容区 -->
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import NavMenu from "@/components/nav-menu"
import NavHeader from "@/components/nav-header"
const isFlodState = ref(false)
const isFlodHandler = (isFold: boolean) => {
  isFlodState.value = isFold
}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      background-color: #2a598a;
      transition: 0.3s linear;
    }
    .page-content {
      background-color: #e5eaf3;
      .page-info {
        background-color: #fff;
      }
    }
  }
}
</style>
