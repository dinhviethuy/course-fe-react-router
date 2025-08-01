import { io } from 'socket.io-client'
import envConfig from './config'

export const paymentSocket = io(`${envConfig.VITE_API_URL}/payment`, {
  withCredentials: true,
  transports: ['websocket']
})
