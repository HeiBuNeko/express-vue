<template>
  <el-row>
    <el-col :span="24">
      <el-card shadow="hover" class="card-layout">
        <template #header> Canvas 文件浏览 </template>
        <!-- 微软 Office Web Viewer 服务 -->
        <el-button type="primary" plain>浏览DOCX</el-button>
        <el-button type="primary" plain>浏览XLSX</el-button>
        <el-button type="primary" plain>浏览PPTX</el-button>
        <!-- pdf 直接预览 -->
        <el-button type="primary" plain>浏览PDF</el-button>
        <!-- 复制分享地址 -->
        <el-button type="primary" plain>复制地址</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
