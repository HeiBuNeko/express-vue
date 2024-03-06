<template>
  <el-col :span="12">
    <el-card shadow="hover" class="card-layout">
      <template #header> 身份认证 </template>
      <el-button type="primary" plain @click="SELogin">Session 登录</el-button>
      <el-button type="warning" plain @click="SEStatus">Session 状态</el-button>
      <el-button type="danger" plain @click="SELogout">Session 退出</el-button>
      <el-button type="primary" plain @click="JWTLogin">JWT 登录</el-button>
      <el-button type="warning" plain @click="JWTStatus">JWT 状态</el-button>
      <el-button type="danger" plain @click="JWTLogout">JWT 退出</el-button>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
import { sessionLogin, sessionLogout, sessionStatus } from '@/api/login'

// 身份认证 Session
const SELogin = async () => {
  const res = await sessionLogin({ name: 'heibuneko', password: 'heibuneko' })
  console.log(res)
}
const SEStatus = async () => {
  const res = await sessionStatus()
  console.log(res)
}
const SELogout = async () => {
  const res = await sessionLogout()
  console.log(res)
}

// 身份认证 JWT
const JWTLogin = async () => {
  const res = await sessionLogin({ name: 'heibuneko', password: 'heibuneko' })
  console.log(res)
}
const JWTStatus = async () => {
  const res = await sessionStatus()
  console.log(res)
}
const JWTLogout = async () => {
  const res = await sessionLogout()
  console.log(res)
}
</script>

<style scoped lang="scss"></style>
