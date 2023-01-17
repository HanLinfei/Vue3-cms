import type { App } from "vue"
import registerElement from "./registerElement"
import registerProperties from "./registerProperties"
import ElementPlus from "element-plus"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
// 注册全局组件
export function globalRegister(app: App): void {
  registerElement(app)
  // 方法二：
  // app.use函数也可以传入一个函数进去，这个被传入的函数最终会被执行，并且执行的时候会传入一个app参数。
  // app.use(registerElement)

  // 注册全局函数
  registerProperties(app)

  // 使用中文包
  app.use(ElementPlus, {
    locale: zhCn
  })
}
