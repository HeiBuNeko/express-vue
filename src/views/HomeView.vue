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
        <el-row :gutter="20">
          <!-- Drag 底层原理 -->
          <DragOrigin />
          <!-- Drag Vue插件 -->
          <DragPlugin />
        </el-row>
        <!-- Drag 拖拽编组 -->
        <DragGroup />
        <!-- Drag ElementUI 低代码 -->
        <DragElement />
        <!-- Map 高德地图 -->
        <MapContainer />
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Sunny from '~icons/ep/Sunny'
import IconEpMoon from '~icons/ep/Moon'
import { useDark, useToggle } from '@vueuse/core'

// Req
import VideoReq from './components/Req/VideoReq.vue'
import DelayReq from './components/Req/DelayReq.vue'
import ChatESReq from './components/Req/ChatESReq.vue'
import ChatFReq from './components/Req/ChatFReq.vue'
// File
import FileIframe from './components/File/FileIframe.vue'
import FileRender from './components/File/FileRender.vue'
import FilePlugin from './components/File/FilePlugin.vue'
// Drag
import DragOrigin from './components/Drag/DragOrigin.vue'
import DragPlugin from './components/Drag/DragPlugin.vue'
import DragGroup from './components/Drag/DragGroup.vue'
import DragElement from './components/Drag/DragElement.vue'
//Map
import MapContainer from './components/Map/MapContainer.vue'

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
