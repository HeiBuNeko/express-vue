import request, { type ResponseBody } from '@/utils/request'

// session 登录
export const sessionLoginAPI = async (data: any) => {
  const res = await request.post<ResponseBody>('/session/login', data)
  return res.data
}

// session 状态
export const sessionStatusAPI = async () => {
  const res = await request.get<ResponseBody>('/session/status')
  return res.data
}

// session 登出
export const sessionLogoutAPI = async () => {
  const res = await request.get<ResponseBody>('/session/logout')
  return res.data
}

// JWT 登录
export const JWTLoginAPI = async (data: any) => {
  const res = await request.post<ResponseBody>('/jwt/login', data)
  return res.data
}

// JWT 状态
export const JWTStatusAPI = async () => {
  const res = await request.get<ResponseBody>('/jwt/status')
  return res.data
}

// JWT 登出
export const JWTLogoutAPI = async () => {
  const res = await request.get<ResponseBody>('/jwt/logout')
  return res.data
}
