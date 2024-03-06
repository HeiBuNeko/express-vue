import request, { type ResponsBody } from '@/utils/request'

// session 登录
export const sessionLoginAPI = async (data: any) => {
  const res = await request.post<ResponsBody>('/session/login', data)
  return res.data
}

// session 状态
export const sessionStatusAPI = async () => {
  const res = await request.get<ResponsBody>('/session/status')
  return res.data
}

// session 登出
export const sessionLogoutAPI = async () => {
  const res = await request.get<ResponsBody>('/session/logout')
  return res.data
}

// JWT 登录
export const JWTLoginAPI = async (data: any) => {
  const res = await request.post<ResponsBody>('/jwt/login', data)
  return res.data
}

// JWT 状态
export const JWTStatusAPI = async () => {
  const res = await request.get<ResponsBody>('/jwt/status')
  return res.data
}

// JWT 登出
export const JWTLogoutAPI = async () => {
  const res = await request.get<ResponsBody>('/jwt/logout')
  return res.data
}
