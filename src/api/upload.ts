import request, { type ResponsBody } from '@/utils/request'

export const getDefault = async (data: any) => {
  const res = await request.post<ResponsBody>('/upload/chunk_file', data)
  return res.data
}

export const postDefault = async (data: any) => {
  const res = await request.post<ResponsBody>('/upload/merge_file', data)
  return res.data
}
