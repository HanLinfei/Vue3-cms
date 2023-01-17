<template>
  <div class="login">
    <loginPanelVue />
  </div>
</template>

<script lang="ts" setup>
import loginPanelVue from "./cpns/login-panel.vue"
</script>

<style scoped lang="less">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
