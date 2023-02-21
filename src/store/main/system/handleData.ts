import { Module } from "vuex"
import type { IRootState } from "@/store/types"
import type { ISystemState } from "./types"
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/request/main/system/system"
import { initialCapital } from "@/utils/string-format"
const mapPageNameUrl: {
  [key: string]: any
} = {
  user: "/users/list",
  role: "/role/list",
  goods: "/goods/list",
  menu: "/menu/list"
}

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List` as keyof typeof state]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count` as keyof typeof state]
      }
    }
  },
  mutations: {
    changeUserList(state, userList: object[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList: object[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: object[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menusList: object[]) {
      state.menuList = menusList
    },
    changeMenuCount(state, menusCount: number) {
      state.menuCount = menusCount
    }
  },
  actions: {
    // 获取页面数据
    async getPageListAction({ commit }, payload: any) {
      // 1. 对页面发送请求
      const pageResult = await getPageListData(
        mapPageNameUrl[payload.pageName],
        payload.queryInfo
      )
      const { list, totalCount } = pageResult.data
      commit(`change${initialCapital(payload.pageName)}List`, list)
      commit(`change${initialCapital(payload.pageName)}Count`, totalCount)
    },
    // 删除指定id的数据
    async deletePageDataAction(context, payload: any) {
      const pageUrl = `/${payload.pageName}/${payload.id}`
      // 删除数据
      await deletePageData(pageUrl)
      // 重新请求最新的数据
      context.dispatch("getPageListAction", {
        pageName: payload.pageName === "users" ? "user" : payload.pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 新建数据
    async createPageDataAction({ dispatch }, payload: any) {
      // 创建数据
      await createPageData(`/${payload.pageName}`, payload.pageData)

      // 请求最新数据
      dispatch("getPageListAction", {
        pageName: payload.pageName === "users" ? "user" : payload.pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    //  编辑数据
    async editPageDataAction({ dispatch }, payload: any) {
      const pageUrl = `/${payload.pageName}/${payload.id}`
      await editPageData(pageUrl, payload.pageData)
      dispatch("getPageListAction", {
        pageName: payload.pageName === "users" ? "user" : payload.pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
