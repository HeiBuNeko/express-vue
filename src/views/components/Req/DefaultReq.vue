<template>
  <el-col :span="12">
    <el-card shadow="hover" class="card-layout">
      <template #header> 默认后端 </template>
      <el-button type="primary" plain @click="get">GET</el-button>
      <el-button type="danger" plain @click="post">POST</el-button>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
import { getDefault, postDefault } from '@/api/default'

const get = async () => {
  const res = await getDefault({ params: { name: 'HeiBuNeko' } })
  console.log(res)
}
const post = async () => {
  const res = await postDefault({ name: 'HeiBuNeko' })
  console.log(res)
}
</script>

<style scoped lang="scss"></style>
