<template>
  <div class="card">
    <el-card>
      <template #header>
        <slot name="header"></slot>
      </template>
      <div class="footer">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
