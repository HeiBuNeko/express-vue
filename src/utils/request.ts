import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import { useLoginStore } from '@/stores/login'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  retries: 3, // 设置重试次数为3次
  retryDelay: 1000 // 设置重试的间隔时间
} as AxiosRequestConfig)

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const loginStore = useLoginStore()
    config.headers.Authorization = 'Bearer ' + loginStore.token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response: AxiosResponse<ResponseBody>) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === 0) {
      ElMessage.success(`${response.data.msg}`)
    } else if (response.data.code === 1) {
      ElMessage.error(response.data.msg)
    }
    return response
  },
  function (error: AxiosError) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

axiosRetry(axios, {
  retries: 3, // 设置重试次数
  retryDelay: () => 500, // 设置重试延迟时间
  shouldResetTimeout: true, // 重置请求超时时间
  retryCondition: (error) => ['ECONNABORTED', 'ERR_NETWORK'].includes(error.code!) // 重试条件
})

export interface ResponseBody<T = any> {
  code: number
  msg: string
  data: T
}

export default request
