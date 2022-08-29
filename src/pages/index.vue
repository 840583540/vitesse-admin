<script setup lang="ts">
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
</script>

<template>
  <div class="relative w-full h-full">
    首页
  </div>
</template>

<style>
.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

<route lang="yaml">
meta:
  layout: home
</route>
