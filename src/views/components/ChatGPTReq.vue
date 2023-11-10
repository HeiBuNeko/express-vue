<template>
  <el-card shadow="hover" class="card-layout">
    <template #header> ChatGPT传输 </template>
    <div>{{ ChatGPTRes }}</div>
    <el-button type="primary" plain>发送请求</el-button>
    <el-button type="danger" plain>终止请求</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ChatGPTRes = ref('')
</script>

<style scoped lang="scss"></style>
