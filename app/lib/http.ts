import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    this.instance.interceptors.request.use(
      (config: any) => {
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        if (![422, 401].includes(error.response?.status || 0)) {
          const data = error.response?.data
          let message = 'Đã xảy ra lỗi'
          if (data && typeof data === 'object' && 'message' in data) {
            message = (data as { message: string }).message
          }
          console.log(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
