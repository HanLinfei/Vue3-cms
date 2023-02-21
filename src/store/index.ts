import { createStore, Store, useStore as useVuexStore } from "vuex"
import type { IRootState, IStoreType } from "./types"
import login from "./login"
import system from "./main/system/handleData"
import dashboardModule from "./main/analysis/dashboard"
import { getPageListData } from "@/service/request/main/system/system"
const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门和角色数据
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 100
      })
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 100
      })
      const menuResult = await getPageListData("/menu/list", {})

      // 保存数据
      commit("changeEntireDepartment", departmentResult.data.list)
      commit("changeEntirerole", roleResult.data.list)
      commit("changeEntireMenu", menuResult.data.list)
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntirerole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  modules: {
    login,
    system,
    dashboardModule
  }
})

export function setupStore() {
  store.dispatch("login/loadLocalLogin")
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
