/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue"
  import type { Store } from "@/store"
  declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $store: Store
      $filters: any
    }
  }
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "element-plus/dist/locale/zh-cn.mjs"
declare module "*.json"
