<template>
  <el-row>
    <el-col :span="24">
      <el-card
        shadow="hover"
        class="card-layout"
      >
        <template #header>
          Iframe 文件浏览
        </template>
        <!-- 微软 Office Web Viewer 服务 -->
        <el-button
          type="primary"
          plain
          @click="iframeUrl = officeUrl + docx"
        >
          浏览DOCX
        </el-button>
        <el-button
          type="primary"
          plain
          @click="iframeUrl = officeUrl + xlsx"
        >
          浏览XLSX
        </el-button>
        <el-button
          type="primary"
          plain
          @click="iframeUrl = officeUrl + pptx"
        >
          浏览PPTX
        </el-button>
        <!-- pdf 直接预览 -->
        <el-button
          type="primary"
          plain
          @click="iframeUrl = pdf"
        >
          浏览PDF
        </el-button>
        <!-- 复制分享地址 -->
        <el-button
          type="primary"
          plain
          @click="copyToClipboard"
        >
          复制地址
        </el-button>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <iframe
        height="600px"
        width="100%"
        :src="iframeUrl"
        frameborder="0"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 资源地址
const docx = 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.docx'
const xlsx = 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.xlsx'
const pptx = 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.pptx'
const pdf = 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.pdf'

// 微软 Office Web Viewer 服务
const officeUrl = 'https://view.officeapps.live.com/op/view.aspx?src='
// 使用微软 Office Web Viewer 服务预览 office 文件
const iframeUrl = ref('')
// 复制分享地址
const copyToClipboard = async () => {
  await navigator.clipboard.writeText(iframeUrl.value)
  alert('复制成功')
}
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;
}
</style>
