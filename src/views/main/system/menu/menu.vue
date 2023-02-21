<template>
  <div>
    <pageContent
      :content-table-config="contentTableConfig"
      page-name="menu"
    ></pageContent>
  </div>
</template>

<script setup lang="ts">
import pageContent from "@/components/page-content"
import { contentTableConfig } from "./config/content.config"
</script>

<style scoped></style>
