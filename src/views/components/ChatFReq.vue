<template>
  <el-card shadow="hover" class="card-layout">
    <template #header> Chat Fetch 传输 </template>
    <div class="chat-res">{{ ChatRes }}</div>
    <el-button type="primary" plain @click="connectSSE">建立SSE连接</el-button>
    <el-button type="danger" plain @click="closeSSE">关闭SSE连接</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ChatRes = ref('')

const isConnect = ref(false)

// 请求终止控制器
let controller: AbortController

// 建立SSE连接
const connectSSE = async () => {
  isConnect.value = true
  controller = new AbortController()
  // 发送POST请求至服务器
  const res = await fetch('http://localhost:3000/chat/chat_typing_fetch', {
    // 请求中止标识
    signal: controller.signal,
    // 使用POST请求
    method: 'POST',
    headers: {
      Accpet: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // 传输数据
      data: 'Hello World'
    })
  })
  // 获取响内容的ReadableStream
  const reader = res.body?.getReader()
  // 创建一个解码器，用来解码文本
  const decoder = new TextDecoder()
  while (reader) {
    // 读取响应内容
    const { done, value } = await reader.read()
    if (done) {
      // 如果读取完毕，则跳出循环
      closeSSE()
      break
    }
    // 解码文本
    ChatRes.value += decoder.decode(value)
  }
}

// 关闭 SSE 连接
const closeSSE = () => {
  // 将 isConnect 设置为 false，表示已经关闭 SSE 连接
  isConnect.value = false
  // 中止请求
  controller.abort()
}
</script>

<style scoped lang="scss">
.chat-res {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
