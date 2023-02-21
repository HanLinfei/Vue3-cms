<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.webp" alt="" />
      <p class="title" v-if="!isFlod">Vue3Admin</p>
    </div>
    <div class="menu">
      <!-- collapse 外界传进来折叠的状态 -->
      <el-menu
        background-color="#2a598a"
        text-color="#fff"
        :unique-opened="true"
        active-text-color="#213d5b"
        :collapse="isFlod"
        :default-active="defaultValue"
      >
        <template v-for="(item1, index1) in userMenus" :key="item1.id">
          <template v-if="item1.children">
            <el-sub-menu :index="item1.id.toString()">
              <template #title>
                <el-icon>
                  <component :is="iconNames[index1]"></component>
                </el-icon>
                <span>{{ item1.name }}</span>
              </template>
              <template v-for="item2 in item1.children" :key="item2.id">
                <el-menu-item
                  :index="item2.id.toString()"
                  @click="handleMenuItemClick(item2)"
                >
                  <span>{{ item2.name }}</span>
                </el-menu-item>
                <!-- 该模板是全部子菜单 -->
                <!-- <template v-if="item2.children">
                  <el-sub-menu
                    :index="index1.toString() + '-' + index2.toString()"
                  >
                    <template #title>
                      <span>{{ item2.name }}</span>
                    </template>
                    <div
                      v-for="(item3, index3) in item2.children"
                      :key="item3.id"
                    >
                      <template v-if="item3.children"></template>
                      <template v-else>
                        <el-menu-item
                          :index="
                            index1.toString() +
                            '-' +
                            index2.toString() +
                            '-' +
                            index3.toString()
                          "
                        >
                          <span>{{ item3.name }}</span>
                        </el-menu-item>
                      </template>
                    </div>
                  </el-sub-menu>
                </template>
                <template v-else>
                  <el-menu-item
                    :index="index1.toString() + '-' + index2.toString()"
                  >
                    <span>{{ item2.name }}</span></el-menu-item
                  >
                </template> -->
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="index1.toString()">
              <span>{{ item1.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "@/store"
import { pathMapToMenu } from "@/utils/map-menus"
import { mapComponentNameByString } from "@/utils/map-ComponentName"
import type { iconItemType } from "../types"
const store = useStore()
const router = useRouter()
const route = useRoute()
// computed里的状态发生改变了之后 computed会重新进行计算
const userMenus = computed(() => store.state.login.userMenus)
// 根据组件名来映射组件
const iconNames = mapComponentNameByString<iconItemType>(
  userMenus.value,
  "icon"
)
// 当前路径
const currentPath = route.path
// 根据当前所处路径来映射默认加载的菜单
const menu = pathMapToMenu(userMenus.value, currentPath)
const defaultValue = menu.id + ""
const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? "/not-found"
  })
}

defineProps({
  isFlod: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  font-weight: bold;
  .logo {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    img {
      height: 40px;
    }

    p {
      flex: 0 0 50%;
      color: #fff;
      font-size: 22px;
      font-weight: bold;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-sub-menu {
    width: 100%;
  }
}
</style>
