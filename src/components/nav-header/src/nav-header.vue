<template>
  <div class="nav-header">
    <div class="left">
      <el-icon size="30px" v-if="isFold" @click="changeFold">
        <Expand />
      </el-icon>
      <el-icon size="30px" v-else>
        <Fold @click="changeFold" />
      </el-icon>
      <!-- eslint-disable-next-line -->
      <hlfBreadcrumb
        class="bread-crumb"
        :breadcrumbs="breadcrumb"
      ></hlfBreadcrumb>
    </div>
    <div class="right">
      <el-icon size="20px">
        <ChatDotSquare />
      </el-icon>
      <el-icon size="20px">
        <Discount />
      </el-icon>
      <el-badge is-dot class="item">
        <el-icon size="20px">
          <Bell />
        </el-icon>
      </el-badge>
      <el-popover>
        <p>您要退出登录吗？</p>
        <div class="popover">
          <el-button size="small">取消</el-button>
          <el-button size="small" type="primary" @click="exitLogin">
            确认
          </el-button>
        </div>
        <template #reference>
          <div class="user">
            <!-- eslint-disable-next-line -->
            <el-avatar
              :size="30"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <!-- <p>{{ userName }}</p> -->
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from "vue"
import hlfBreadcrumb from "@/base-ui/breadcrumb"
import { pathMapToBreadcrumb } from "@/utils/map-menus"
import { useStore } from "@/store"
import { useRouter, useRoute } from "vue-router"
import localCatch from "@/utils/cache"
const store = useStore()
const router = useRouter()
const route = useRoute()
// const userName = ref(store.state.login.userInfo.name)
const isFold = ref(false)
const emit = defineEmits(["changeFoldState"])
const changeFold = () => {
  isFold.value = !isFold.value
  emit("changeFoldState", isFold.value)
}

// 面包屑数据
// 计算属性里如果对某个变量有依赖 这个变量如果有更新的话 计算属性会重新进行计算
const breadcrumb = computed(() => {
  const userMenus = store.state.login.userMenus
  const currentPath = route.path
  return pathMapToBreadcrumb(userMenus, currentPath)
})

const exitLogin = () => {
  router.replace("/login")
  localCatch.clearCache()
}
</script>

<style scoped lang="less">
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .bread-crumb {
    margin-left: 10px;
  }

  .el-icon {
    cursor: pointer;
  }

  .left {
    display: flex;
    align-items: center;

    .el-breadcrumb {
      margin-left: 12px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .popover {
      display: flex;
    }

    .el-icon {
      margin-left: 12px;
    }

    .el-badge {
      display: flex;
      align-items: center;
    }

    .el-avatar {
      margin-left: 12px;
    }

    p {
      margin-left: 8px;
      font-size: 14px;
    }

    .user {
      display: flex;
      align-items: center;
    }
  }
}
</style>
