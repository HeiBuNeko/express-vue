<template>
  <el-card shadow="hover" class="card-layout">
    <template #header> Chat EventSource 传输 </template>
    <div class="chat-res">{{ ChatRes }}</div>
    <el-button type="primary" plain @click="connectSSE">建立SSE连接</el-button>
    <el-button type="danger" plain @click="closeSSE">关闭SSE连接</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ChatRes = ref('')

const isConnect = ref(false)
// EventSource
let source: EventSource
// 建立SSE连接
const connectSSE = () => {
  isConnect.value = true
  // 创建实例
  source = new EventSource('http://localhost:3000/chat/chat_typing')
  // 接受信息
  source.addEventListener('message', (e) => {
    console.log(e)
    // 判断end，关闭连接
    if (e.data === 'end') {
      closeSSE()
    }
    ChatRes.value += e.data
  })
}

const closeSSE = () => {
  isConnect.value = false
  source.close()
}
</script>

<style scoped lang="scss">
.chat-res {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
