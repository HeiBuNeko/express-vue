<template>
  <el-col :span="12">
    <el-card shadow="hover" class="card-layout">
      <template #header> 延迟传输 </template>
      <el-button type="primary" plain @click="sendRequeset">发送请求</el-button>
      <el-button type="danger" plain @click="stopRequeset">终止请求</el-button>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
import request from '@/utils/request'

let controller: AbortController // 终止控制器
const sendRequeset = () => {
  controller = new AbortController() // 创建终止控制器
  request.get('/delay_3s_data', {
    signal: controller.signal, // 添加请求中止标识
  })
}

const stopRequeset = () => {
  // 中止网络请求
  controller.abort()
}
</script>

<style scoped lang="scss"></style>
