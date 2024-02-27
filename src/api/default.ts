import request, { type ResponsBody } from '@/utils/request'

export const getDefault = async (data: any) => {
  const res = await request.get<ResponsBody>('/get_default', data)
  return res.data
}

export const postDefault = async (data: any) => {
  const res = await request.post<ResponsBody>('/post_default', data)
  return res.data
}

export const deleteDefault = async (data: any) => {
  const res = await request.delete<ResponsBody>('/delete_default', data)
  return res.data
}
