import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import envConfig from '~/lib/config'
import { handleError } from '~/lib/utils'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: envConfig.VITE_API_URL,
      timeout: envConfig.VITE_TIMEOUT,
      withCredentials: true
    })
    this.instance.interceptors.request.use(
      (config: any) => {
        const isFormData = config.data instanceof FormData
        if (!isFormData) {
          config.headers = {
            ...config.headers,
            'Content-Type': config.headers?.['Content-Type'] ?? 'application/json'
          }
        } else {
          if (config.headers) delete config.headers['Content-Type']
        }
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
          handleError({ error })
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
