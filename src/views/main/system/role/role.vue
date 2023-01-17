<template>
  <div>
    <pageSearch :searchFormConfig="searchFormConfig"></pageSearch>
    <pageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></pageContent>
  </div>
</template>

<script setup lang="ts">
import pageContent from "@/components/page-content"
import pageSearch from "@/components/page-search"
import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
</script>

<style scoped></style>
