import request, { type ResponsBody } from '@/utils/request'

export const getDefaultAPI = async (data: any) => {
  const res = await request.get<ResponsBody>('/get_default', data)
  return res.data
}

export const postDefaultAPI = async (data: any) => {
  const res = await request.post<ResponsBody>('/post_default', data)
  return res.data
}

export const deleteDefaultAPI = async (data: any) => {
  const res = await request.delete<ResponsBody>('/delete_default', data)
  return res.data
}
