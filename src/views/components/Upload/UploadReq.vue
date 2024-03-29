<template>
  <el-row>
    <el-col :span="24">
      <el-card shadow="hover" class="card-layout">
        <template #header>Upload 大文件上传 分片 续传 秒传</template>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-upload
              v-model:file-list="fileListFull"
              class="upload-demo"
              drag
              :limit="1"
              :http-request="(option: UploadRequestOptions) => handleHttpRequest(option, 'full')"
            >
              分片上传（完整Hash）
            </el-upload>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="percentageFull" />
            <el-button class="merge-button" @click="mergeFile('full')">合并文件</el-button>
          </el-col>
          <el-col :span="8">
            <el-upload
              v-model:file-list="fileListPart"
              class="upload-demo"
              drag
              :limit="1"
              :http-request="(option: UploadRequestOptions) => handleHttpRequest(option, 'part')"
            >
              分片上传（部分Hash）
            </el-upload>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="percentagePart" />
            <el-button class="merge-button" @click="mergeFile('part')">合并文件</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type UploadRequestOptions, type UploadUserFile } from 'element-plus'
import sparkMD5 from 'spark-md5'
// api
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import { mergeFileAPI, verifyFileAPI } from '@/api/upload'

// 分片（10MB）
const CHUNK_SIZE = 10 * 1024 * 1024
// 文件分片
const createFileChunks = (file: File) => {
  const fileChunkList = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({
      file: file.slice(cur, cur + CHUNK_SIZE)
    })
    cur += CHUNK_SIZE // CHUNK_SIZE为分片大小
  }
  return fileChunkList
}

// 计算文件的Hash值（完整）
const calculateAllHash = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const spark = new sparkMD5.ArrayBuffer()
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      resolve(spark.end())
    }
    reader.onerror = () => {
      console.warn('计算文件的Hash值（完整）错误')
    }
  })
}

// 计算文件的Hash值（部分）
const calculatePartHash = async (fileChunks: Array<{ file: Blob }>): Promise<string> => {
  return new Promise((resolve) => {
    const spark = new sparkMD5.ArrayBuffer()
    const chunks: Blob[] = []
    fileChunks.forEach((chunk, index) => {
      if (index === 0 || index === fileChunks.length - 1) {
        // 1. 第一个和最后一个切片的内容全部参与计算
        chunks.push(chunk.file)
      } else {
        // 2. 中间剩余的切片我们分别在前面、后面和中间取2个字节参与计算
        // 前面的2字节
        chunks.push(chunk.file.slice(0, 2))
        // 中间的2字节
        chunks.push(chunk.file.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2))
        // 后面的2字节
        chunks.push(chunk.file.slice(CHUNK_SIZE - 2, CHUNK_SIZE))
      }
    })
    const reader = new FileReader()
    reader.readAsArrayBuffer(new Blob(chunks))
    reader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      resolve(spark.end())
    }
    reader.onerror = () => {
      console.warn('计算文件的Hash值（部分）错误')
    }
  })
}

// 上传进度
const percentageFull = ref(0)
const percentagePart = ref(0)

// 文件上传
const uploadChunks = async (
  uploadedList: string[],
  fileChunks: Array<{ file: Blob }>,
  fileHash: string,
  fileName: string,
  type: string
) => {
  const formDatas = fileChunks
    .filter((chunk, index) => !uploadedList.includes(`${fileHash}-${index}`))
    .map((chunk, index) => {
      const formData = new FormData()
      formData.append('fileName', fileName)
      formData.append('fileHash', fileHash)
      formData.append('chunk', chunk.file)
      formData.append('chunkHash', `${fileHash}-${index + uploadedList.length}`)
      formData.append('chunkSize', CHUNK_SIZE.toString())
      return formData
    })

  let index = 0
  const max = 6 // 并发请求数量
  const taskPool: Promise<AxiosResponse>[] = [] // 请求队列

  while (index < formDatas.length) {
    const task = request.post('/upload/chunk_file', formDatas[index])
    taskPool.push(task)
    task.then(() => {
      // 请求完成则删除请求
      const taskIndex = taskPool.findIndex((item) => item === task)
      taskPool.splice(taskIndex, 1)
      // 进度条
      if (type === 'full') {
        percentageFull.value = Math.floor((index / formDatas.length) * 100)
      } else {
        percentagePart.value = Math.floor((index / formDatas.length) * 100)
      }
    })
    if (taskPool.length === max) {
      await Promise.race(taskPool)
    }
    index++
  }
}

// 文件列表（完整Hash）
const fileListFull = ref<UploadUserFile[]>([])
const fileHashFull = ref('')

// 文件列表（部分Hash）
const fileListPart = ref<UploadUserFile[]>([])
const fileHashPart = ref('')

type UploadRequestHandler = (
  options: UploadRequestOptions,
  type: string
) => XMLHttpRequest | Promise<unknown>

// 覆盖默认的 Xhr 行为
const handleHttpRequest: UploadRequestHandler = async ({ file }, type: string) => {
  // 文件切片
  const fileChunkList = createFileChunks(file)
  console.log('文件分片 fileChunkList', fileChunkList)

  if (type === 'full') {
    // 计算Hash（完整Hash）
    fileHashFull.value = await calculateAllHash(file)
    console.log('计算Hash（完整Hash）fileHash', fileHashFull.value)
    // 通过Hash验证文件已上传（秒传功能）
    const { data } = await verifyFileAPI(file.name, fileHashFull.value)
    console.log('通过Hash验证文件已上传（秒传功能）', data)

    if (data.shouldUpload) {
      await uploadChunks(data.uploadedList, fileChunkList, fileHashFull.value, file.name, type)
    } else {
      ElMessage.success('秒传成功')
      percentageFull.value = 100
    }
  } else {
    // 计算Hash（部分Hash）
    fileHashPart.value = await calculatePartHash(fileChunkList)
    console.log('计算Hash（部分Hash）fileHash', fileHashPart.value)
    // 通过Hash验证文件已上传（秒传功能）
    const { data } = await verifyFileAPI(file.name, fileHashPart.value)
    console.log('通过Hash验证文件已上传（秒传功能）', data)
    if (data.shouldUpload) {
      await uploadChunks(data.uploadedList, fileChunkList, fileHashPart.value, file.name, type)
    } else {
      ElMessage.success('秒传成功')
      percentagePart.value = 100
    }
  }
}

// 合并切片
const mergeFile = async (type: string) => {
  if (type === 'full') {
    await mergeFileAPI(fileListFull.value[0].name, fileHashFull.value, CHUNK_SIZE)
  } else {
    await mergeFileAPI(fileListPart.value[0].name, fileHashPart.value, CHUNK_SIZE)
  }
}
</script>

<style scoped lang="scss">
.merge-button {
  width: 100%;
  margin-top: 10px;
}
</style>
