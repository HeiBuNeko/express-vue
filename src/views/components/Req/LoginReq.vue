<template>
  <el-col :span="12">
    <el-card shadow="hover" class="card-layout">
      <template #header> 身份认证 </template>
      <el-row>
        <el-button type="primary" plain @click="SELogin">
          Session 登录
        </el-button>
        <el-button type="warning" plain @click="SEStatus">
          Session 状态
        </el-button>
        <el-button type="danger" plain @click="SELogout">
          Session 退出
        </el-button>
      </el-row>
      <el-row>
        <el-button type="primary" plain @click="JWTLogin"> JWT 登录 </el-button>
        <el-button type="warning" plain @click="JWTStatus">
          JWT 状态
        </el-button>
        <el-button type="danger" plain @click="JWTLogout"> JWT 退出 </el-button>
      </el-row>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
// api
import {
  sessionLoginAPI,
  sessionStatusAPI,
  sessionLogoutAPI,
  JWTLoginAPI,
  JWTStatusAPI,
  JWTLogoutAPI,
} from '@/api/login'
// store
import { useLoginStore } from '@/stores/login'
const loginStore = useLoginStore()

// 身份认证 Session
const SELogin = async () => {
  const res = await sessionLoginAPI({
    name: 'heibuneko',
    password: 'heibuneko',
  })
  console.log(res)
}
const SEStatus = async () => {
  const res = await sessionStatusAPI()
  console.log(res)
}
const SELogout = async () => {
  const res = await sessionLogoutAPI()
  console.log(res)
}

// 身份认证 JWT
const JWTLogin = async () => {
  const res = await JWTLoginAPI({ name: 'heibuneko', password: 'heibuneko' })
  console.log(res)
  loginStore.setToken(res.data.token)
}
const JWTStatus = async () => {
  const res = await JWTStatusAPI()
  console.log(res)
}
const JWTLogout = async () => {
  const res = await JWTLogoutAPI()
  console.log(res)
}
</script>

<style scoped lang="scss">
.el-row:nth-child(n + 2) {
  margin-top: 10px;
}
</style>
