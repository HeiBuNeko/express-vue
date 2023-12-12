<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-layout">
        <h1>Express Vue</h1>
        <el-switch
          v-model="isDark"
          size="large"
          :active-action-icon="IconEpMoon"
          :inactive-action-icon="Sunny"
          @change="toggleDark"
        />
      </el-header>
      <el-main class="main-layout">
        <el-row :gutter="20">
          <!-- 视频传输 -->
          <VideoReq />
          <!-- 延迟传输 -->
          <DelayReq />
        </el-row>
        <el-row :gutter="20">
          <!-- Chat EventSource 传输 -->
          <ChatESReq />
          <!-- Chat Fetch 传输 -->
          <ChatFReq />
        </el-row>
        <!-- Iframe 文件浏览 -->
        <FileIframe />
        <!-- Render 文件浏览 -->
        <FileRender />
        <!-- Plugin 文件浏览 -->
        <FilePlugin />
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Sunny from '~icons/ep/Sunny'
import IconEpMoon from '~icons/ep/Moon'
import { useDark, useToggle } from '@vueuse/core'

import VideoReq from './components/VideoReq.vue'
import DelayReq from './components/DelayReq.vue'
import ChatESReq from './components/ChatESReq.vue'
import ChatFReq from './components/ChatFReq.vue'
import FileIframe from './components/FileIframe.vue'
import FileRender from './components/FileRender.vue'
import FilePlugin from './components/FilePlugin.vue'

// 暗黑模式
const isDark = useDark()
const toggleDark = () => useToggle(isDark)
</script>

<style scoped lang="scss">
.common-layout {
  .header-layout {
    height: 10vh;
    border: 1px solid skyblue;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-layout {
    .el-row {
      margin-top: 20px;
    }
  }
}
</style>
