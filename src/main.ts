import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "normalize.css"
import "./assets/css/index.less"
import { globalRegister } from "./global"
import { setupStore } from "@/store"
// 传入根节点 生成APP实例对象
const app = createApp(App)
// 重新从localStorage中加载数据
setupStore()
app.use(router)
app.use(store)
globalRegister(app) // 注册全局组件
console.log("挂载app根组件之前")
app.mount("#app") // 将根节点对象(AppDom节点对象)挂载到id为app的DOM节点上
console.log("挂载app根组件之后")
