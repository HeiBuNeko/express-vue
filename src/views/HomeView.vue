<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside"></el-aside>
      <el-container class="container">
        <el-header></el-header>
        <el-main>
          <el-button @click="fetchVideo">下载视频</el-button>
          <el-button @click="abortDownload">终止下载</el-button>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import NProgress from 'NProgress'
import 'nprogress/nprogress.css'
import { ref } from 'vue'

const progress = ref(0)
let controller: AbortController // 终止控制器

const fetchVideo = () => {
  NProgress.start()
  controller = new AbortController() // 创建终止控制器
  axios({
    // 将中止控制器传递给 axios 的 get 方法
    method: 'GET',
    url: 'http://localhost:3000/video',
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
      if (axios.isCancel(err)) {
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
  if (controller) {
    controller.abort() // 使用abort方法终止下载
  }
}
</script>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;
  .aside {
    background-color: skyblue;
  }
  .container {
    background-color: lightskyblue;
  }
}
</style>
