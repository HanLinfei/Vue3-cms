import { Module } from "vuex"
import type { IRootState } from "@/store/types"
import type { ISystemState } from "./types"
import { getPageListData } from "@/service/request/main/system/system"
import { initialCapital } from "@/utils/string-format"
const mapPageNameUrl: {
  [key: string]: any
} = {
  user: "/users/list",
  role: "/role/list"
}

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List` as keyof typeof state]
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
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1. 对页面发送请求
      const pageResult = await getPageListData(
        mapPageNameUrl[payload.pageName],
        payload.queryInfo
      )
      const { list, totalCount } = pageResult.data
      commit(`change${initialCapital(payload.pageName)}List`, list)
      commit(`change${initialCapital(payload.pageName)}Count`, totalCount)
    }
  }
}

export default systemModule
