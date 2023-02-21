import { Module } from "vuex"
import localCache from "@/utils/cache"
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus"
import router from "@/router"
import type { ILoginState } from "./types"
import type { IRootState } from "../types"
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from "@/service/request/login"
import { ElMessage } from "element-plus"
import { IAccount } from "@/service/request/login/types"
// store的模块要求传入泛型 第一个类型对应的是模块的state的类型 第二个类型对应的是根store的state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  // 修改state最好是通过mutations来修改 这是一个基本原则
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // userMenus => routes
      const routes = mapMenusToRoutes(state.userMenus)
      // 将routes 添加到 router.main.children中
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 获取角色的按钮权限
      state.permissions = mapMenusToPermissions(userMenus)
    }
  },
  actions: {
    // 点击登录按钮之后
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.登录逻辑:请求token
      const loginResult = await accountLoginRequest(payload)
      if (!loginResult) {
        ElMessage({
          showClose: true,
          message: "账号或密码错误.",
          type: "error"
        })
        return false
      }
      // 请求部门数据和角色数据
      dispatch("getInitialDataAction", null, { root: true })
      const { id, token } = loginResult.data
      localCache.setCache("token", token)
      commit("changeToken", token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      localCache.setCache("userInfo", userInfoResult.data)
      commit("changeUserInfo", userInfoResult.data)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusById(id)
      console.log(userMenusResult)
      localCache.setCache("userMenus", userMenusResult.data)
      commit("changeUserMenus", userMenusResult.data)

      // 4.跳到首页
      router.replace("/main")
    },

    // 给vuex更新状态：因为当每次别人刷新页面之后 或者是没有经过登录来到页面 那么vuex里的数据实际上是没有的
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache("token")
      if (token) commit("changeToken", token)

      const userInfo = localCache.getCache("userInfo")
      if (userInfo) commit("changeUserInfo", userInfo)

      const userMenus = localCache.getCache("userMenus")
      if (userMenus) commit("changeUserMenus", userMenus)

      dispatch("getInitialDataAction", null, { root: true })
    }
  },
  getters: {}
}

export default loginModule
