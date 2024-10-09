<template>
  <el-row>
    <el-col :span="24">
      <el-card
        shadow="hover"
        class="card-layout"
      >
        <template #header>
          Plugin 文件浏览
        </template>
        <!-- Vue Office 组件 -->
        <el-button
          type="primary"
          plain
          @click="previewDOCX"
        >
          浏览DOCX
        </el-button>
        <el-button
          type="primary"
          plain
          @click="previewXLSX"
        >
          浏览XLSX
        </el-button>
        <el-button
          type="primary"
          plain
          @click="previewPDF"
        >
          浏览PDF
        </el-button>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <vue-office-docx
      v-if="showDOCX"
      src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.docx"
      style="width: 100vw; height: 100vh"
    />
    <vue-office-xlsx
      v-if="showXLSX"
      src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.xlsx"
      style="width: 100vw; height: 100vh"
    />
    <vue-office-pdf
      v-if="showPDF"
      src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/solution/demo.pdf"
      style="width: 100vw; height: 100vh"
    />
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//引入VueOffice组件
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeXlsx from '@vue-office/excel'
import VueOfficePdf from '@vue-office/pdf'
//引入相关样式
import '@vue-office/docx/lib/index.css'
import '@vue-office/excel/lib/index.css'

const showDOCX = ref(false)
const showXLSX = ref(false)
const showPDF = ref(false)

const previewDOCX = () => {
  showDOCX.value = true
  showXLSX.value = false
  showPDF.value = false
}
const previewXLSX = () => {
  showDOCX.value = false
  showXLSX.value = true
  showPDF.value = false
}
const previewPDF = () => {
  showDOCX.value = false
  showXLSX.value = false
  showPDF.value = true
}
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;
}
</style>
