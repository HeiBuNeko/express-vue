<template>
  <el-col :span="12">
    <el-card
      shadow="hover"
      class="card-layout"
    >
      <template #header>
        默认后端
      </template>
      <el-button
        type="primary"
        plain
        @click="getDefault"
      >
        GET
      </el-button>
      <el-button
        type="warning"
        plain
        @click="postDefault"
      >
        POST
      </el-button>
      <el-button
        type="danger"
        plain
        @click="deleteDefault"
      >
        DELETE
      </el-button>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
import { getDefaultAPI, postDefaultAPI, deleteDefaultAPI } from '@/api/default'

const getDefault = async () => {
  const res = await getDefaultAPI({ params: { name: 'HeiBuNeko' } })
  console.log(res)
}
const postDefault = async () => {
  const res = await postDefaultAPI({ name: 'HeiBuNeko' })
  console.log(res)
}
const deleteDefault = async () => {
  const res = await deleteDefaultAPI({ params: { name: 'HeiBuNeko' } })
  console.log(res)
}
</script>

<style scoped lang="scss">
.card-layout {
  height: 100%;
}
</style>
