import type { AxiosRequestConfig, AxiosResponse } from "axios"

// 定义拦截器接口：其中包括四个拦截器，并且是可传可不传
export interface ReqeustInterceptorHook<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 定义请求配置接口：继承自axios接口规范
export interface AxiosRequestConfigAll<T = AxiosResponse>
  extends AxiosRequestConfig {
  Interceptors?: ReqeustInterceptorHook<T>
  showLoading?: boolean
}
