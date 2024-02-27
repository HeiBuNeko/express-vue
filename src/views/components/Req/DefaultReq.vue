<template>
  <el-col :span="12">
    <el-card shadow="hover" class="card-layout">
      <template #header> 默认后端 </template>
      <el-button type="primary" plain @click="getApi">GET</el-button>
      <el-button type="warning" plain @click="postApi">POST</el-button>
      <el-button type="danger" plain @click="deleteApi">DELETE</el-button>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
import { getDefault, postDefault, deleteDefault } from '@/api/default'

const getApi = async () => {
  const res = await getDefault({ params: { name: 'HeiBuNeko' } })
  console.log(res)
}
const postApi = async () => {
  const res = await postDefault({ name: 'HeiBuNeko' })
  console.log(res)
}
const deleteApi = async () => {
  const res = await deleteDefault({ params: { name: 'HeiBuNeko' } })
  console.log(res)
}
</script>

<style scoped lang="scss"></style>
