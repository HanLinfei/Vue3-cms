import { createRouter, createWebHashHistory } from "vue-router"
import localCache from "@/utils/cache"
// 导入类型
import type { RouteRecordRaw } from "vue-router"
import { firstMenu } from "@/utils/map-menus"
// 使用vue-router自己本身的路由类型
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/Main.vue")
  },
  // 当路径错的时候 来到该组件进行提示
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue")
  }
]
console.log("router执行了")
const router = createRouter({
  routes: routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  // 这个to是即将要跳转到的路由对象 如果你不返回路径的话 那么他最终就是跳转到这个页面里
  // 判断 如果不是在登录页的情况下 那么我们要判断它是否登录了
  if (to.path !== "/login") {
    const token = localCache.getCache("token")
    if (!token) {
      return "/login"
    }
  }

  // 如果是main的话就来到这个路径
  if (to.path === "/main") {
    return firstMenu.url
  }
})

export default router
