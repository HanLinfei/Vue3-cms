<template>
  <div class="user">
    <pageSearch :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="user"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import pageSearch from "@/components/page-search"
import pageContent from "@/components/page-content"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
</script>

<style scoped lang="less"></style>
