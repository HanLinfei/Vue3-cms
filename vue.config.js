const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置方式一 : CLI提供的方式
  outputDir: "./build",
  publicPath: "./",
  // 配置方式二 ： 和webpack的属性完全一样，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components"
      }
    },
    plugins: [
      // 自动引入element-plus样式的组件
      require("unplugin-element-plus/webpack")({
        UseSource: false
      })
    ]
  }
  // 配置方式三： 提供一个函数 然后完全修改配置
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     components: "@/components"
  //   }
  // }
  // 配置方式三：链式配置
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("components", "@/components")
  // }
})
