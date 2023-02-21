import { Module } from "vuex"
import { IDashboardState } from "./types"
import { IRootState } from "@/store/types"
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from "@/service/request/analysis/dashboard"
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    getDashboardDataAction({ commit }) {
      getCategoryGoodsCount().then((res: any) => {
        commit("changeCategoryGoodsCount", res.data)
      })

      getCategoryGoodsSale().then((res: any) => {
        commit("changeCategoryGoodsSale", res.data)
      })

      getCategoryGoodsFavor().then((res: any) => {
        commit("changeCategoryGoodsFavor", res.data)
      })

      getAddressGoodsSale().then((res: any) => {
        commit("changeAddressGoodsSale", res.data)
      })
    }
  }
}

export default dashboardModule
