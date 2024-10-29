<template>
  <el-row>
    <el-col :span="24">
      <el-card shadow="hover" class="card-layout">
        <template #header> Render 文件浏览 </template>
        <!-- Render 文件浏览 -->
        <el-button type="primary" plain @click="previewDOCX"
          >浏览DOCX</el-button
        >
        <el-button type="primary" plain @click="previewXLSX"
          >浏览XLSX</el-button
        >
        <el-button type="primary" plain @click="previewPDF">浏览PDF</el-button>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <canvas v-if="showCanvas" ref="canvasRef"></canvas>
    <div v-if="showDiv" ref="divRef"></div>
    <el-table v-if="showTable" :data="tableData">
      <el-table-column prop="Name" label="Name" />
      <el-table-column prop="Index" label="Index" />
    </el-table>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import * as pdfjsLib from 'pdfjs-dist'
import { renderAsync } from 'docx-preview'
import { read, utils } from 'xlsx'

// 绑定 canvas和div
const canvasRef = ref<HTMLCanvasElement>()
const divRef = ref<HTMLElement>()
const tableData = ref<{ Name: string; Index: string }[]>([])
const showCanvas = ref(false)
const showDiv = ref(false)
const showTable = ref(false)
// 请求文件
const file = ref()
const getFile = async (url: string) => {
  const res = await axios.get(url, { responseType: 'arraybuffer' })
  file.value = res.data
}

// PDF预览
// 设置workerSrc的值，cdn远程加载
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`
const previewPDF = async () => {
  showCanvas.value = true
  showDiv.value = false
  showTable.value = false
  // 获取文件
  await getFile(
    'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.pdf',
  )
  // 获取 canvas
  const canvas = canvasRef.value
  if (file.value && canvas) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const data = new Uint8Array(file.value)
    pdfjsLib.getDocument({ data }).promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1.5 })
        canvas.width = viewport.width
        canvas.height = viewport.height
        page.render({
          canvasContext: ctx,
          viewport,
        })
      })
    })
  }
}

// DOCX预览
const previewDOCX = async () => {
  showCanvas.value = false
  showDiv.value = true
  showTable.value = false
  await getFile(
    'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.docx',
  )
  if (file.value && divRef.value) {
    // defaultOptions 为默认配置，可不传
    await renderAsync(file.value, divRef.value)
  }
}

// XLSX预览
const previewXLSX = async () => {
  showCanvas.value = false
  showDiv.value = false
  showTable.value = true
  await getFile(
    'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.xlsx',
  )
  if (file.value) {
    const sheet = read(file.value).Sheets
    tableData.value = utils.sheet_to_json(sheet['Data'])
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;
}
</style>
