import request, { type ResponsBody } from '@/utils/request'

// session 登录
export const sessionLogin = async (data: any) => {
  const res = await request.post<ResponsBody>('/session/login', data)
  return res.data
}

// session 状态
export const sessionStatus = async () => {
  const res = await request.get<ResponsBody>('/session/status')
  return res.data
}

// session 登出
export const sessionLogout = async () => {
  const res = await request.get<ResponsBody>('/session/logout')
  return res.data
}
