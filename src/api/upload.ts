import request, { type ResponseBody } from '@/utils/request'

// 合并切片
export const mergeFileAPI = async (
  fileName: string,
  fileHash: string,
  size: number,
) => {
  const res = await request.post<ResponseBody>('/upload/merge_file', {
    fileName,
    fileHash,
    size,
  })
  return res.data
}

export interface VerifyFile {
  shouldUpload: boolean
  uploadedList: string[]
}

// 通过Hash验证文件已上传
export const verifyFileAPI = async (fileName: string, fileHash: string) => {
  const res = await request.post<ResponseBody<VerifyFile>>(
    '/upload/verify_file',
    {
      fileName,
      fileHash,
    },
  )
  return res.data
}
