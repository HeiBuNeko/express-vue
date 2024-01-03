<template>
  <el-col :span="12">
    <el-card shadow="hover" class="card-layout">
      <template #header> 视频传输 </template>
      <el-button type="primary" plain @click="fetchVideo">下载视频</el-button>
      <el-button type="danger" plain @click="abortDownload">终止下载</el-button>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/utils/request'
// NProgress
import NProgress from 'NProgress'
import 'nprogress/nprogress.css'

const progress = ref(0)
let controller: AbortController // 终止控制器

const fetchVideo = () => {
  NProgress.start()
  controller = new AbortController() // 创建终止控制器
  axios
    .get('/video', {
      // 将中止控制器传递给 axios 的 get 方法
      signal: controller.signal, // 将终止控制器传入请求配置中
      responseType: 'arraybuffer', // 指定响应数据类型为 arraybuffer
      onDownloadProgress: (progressEvent) => {
        progress.value = progressEvent.loaded / progressEvent.total!
        NProgress.set(progress.value)
      }
    })
    .then((res) => {
      // 保存下载的文件
      const { buffer } = new Uint8Array(res.data)
      const blob = new Blob([buffer], { type: 'application/octet-stream' })
      // 模拟点击下载
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'video.mp4'
      link.click()
    })
    .catch((err) => {
      if (err.name === 'CanceledError') {
        console.log('下载被取消', err.message)
      } else if (err.name === 'AbortError') {
        console.log('下载被终止', err.message)
      } else {
        console.error(`下载错误：${err.message}`)
      }
    })
    .finally(() => {
      NProgress.done()
      progress.value = 0
    })
}
const abortDownload = () => {
  controller.abort() // 使用abort方法终止下载
}
</script>

<style scoped lang="scss"></style>
