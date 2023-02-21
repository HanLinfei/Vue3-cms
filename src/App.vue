<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
// defineComponent函数实际上其实只是为了做类型推导以及编写代码的提示的
// 因为这边定义了这个函数，然后这个函数需要传的对象 这个对象是有做事先的类型声明的
// 那么当我们在这个对象里编写的时候 就会有各种推导以及代码提示了
// export default defineComponent({
//   name: "App",
//   components: {}
// })
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
