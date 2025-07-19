import { io } from 'socket.io-client'

export const paymentSocket = io('http://localhost:3000/payment', {
  withCredentials: true,
  transports: ['websocket']
})
