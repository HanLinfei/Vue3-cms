import axios from "axios"
import type { AxiosInstance } from "axios"
import type { AxiosRequestConfigAll, ReqeustInterceptorHook } from "./types"

import { ElLoading } from "element-plus"
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading"
class Request {
  // axios实例
  instance: AxiosInstance
  // axios拦截器对象
  Interceptors?: ReqeustInterceptorHook
  // 是否显示loading
  showLoading: boolean
  // loading对象
  loading?: LoadingInstance
  constructor(config: AxiosRequestConfigAll) {
    // 创建axios请求实例：根据请求配置来创建
    this.instance = axios.create(config)
    // 获取拦截器：拦截器可传可不传
    this.Interceptors = config.Interceptors
    // 是否显示loading：如果不传 则默认显示
    this.showLoading = config.showLoading ?? true
    // 添加实例拦截器
    this.instance.interceptors.request.use(
      this.Interceptors?.requestInterceptor,
      this.Interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.Interceptors?.responseInterceptor,
      this.Interceptors?.responseInterceptorCatch
    )

    // 添加类拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 是否展示loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0,0,0,0.5)"
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  // 实例请求方法
  request<T>(config: AxiosRequestConfigAll<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断本次请求是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = false
      }
      // 判断是否需要对配置做处理：它其实本质上也是一个拦截器 是一个请求拦截器
      if (config.Interceptors?.requestInterceptor) {
        config = config.Interceptors.requestInterceptor(config)
      }
      // 发送实例网络请求
      this.instance
        .request<any, T>(config) //第二个泛型是来确定Promise响应之后拿到的结果的类型
        .then((res) => {
          // 判断是否需要对数据做处理：他其实也相当于是一个拦截器 是一个response拦截器
          if (config.Interceptors?.responseInterceptor) {
            res = config.Interceptors.responseInterceptor(res)
          }
          // 将最终结果返回出去
          resolve(res)
          // loading状态恢复：不然会影响下一次请求 因为上一次请求修改了loading为true
          this.showLoading = true
        })
        .catch((err) => {
          reject(err)
          this.showLoading = true
        })
    })
  }

  get<T>(config: AxiosRequestConfigAll<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: AxiosRequestConfigAll<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T>(config: AxiosRequestConfigAll<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T>(config: AxiosRequestConfigAll<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default Request
