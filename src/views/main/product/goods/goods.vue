<template>
  <div>
    <pageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #img="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          preview-teleported
        />
      </template>
      <template #oldPrice="scope">
        {{ "￥" + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ "￥" + scope.row.newPrice }}
      </template>
    </pageContent>
  </div>
</template>

<script setup lang="ts">
import pageContent from "@/components/page-content"
import { contentTableConfig } from "./config/content.config"
</script>

<style scoped></style>
