import request, { type ResponseBody } from '@/utils/request'

export const getDefaultAPI = async (data: any) => {
  const res = await request.get<ResponseBody>('/get_default', data)
  return res.data
}

export const postDefaultAPI = async (data: any) => {
  const res = await request.post<ResponseBody>('/post_default', data)
  return res.data
}

export const deleteDefaultAPI = async (data: any) => {
  const res = await request.delete<ResponseBody>('/delete_default', data)
  return res.data
}
