// service统一出口
import Request from "./request"
import localCache from "@/utils/cache"
import { BASE_URL, TIME_OUT } from "./request/config"
export default new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 实例拦截器
  Interceptors: {
    requestInterceptor(config) {
      // 携带token
      const token = localCache.getCache("token")
      if (token) {
        if (config.headers) config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})
