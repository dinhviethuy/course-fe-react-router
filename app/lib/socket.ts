import { io } from 'socket.io-client'
import envConfig from './config'

export const paymentSocket = io(`${envConfig.VITE_API_URL}/payment`, {
  withCredentials: true,
  transports: ['websocket']
})

export const videoSocket = io(`${envConfig.VITE_API_URL}/video`, {
  withCredentials: true,
  transports: ['websocket']
})
