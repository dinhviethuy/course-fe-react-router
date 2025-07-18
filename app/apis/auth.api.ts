import http from '~/lib/http'
import type {
  ForgotPasswordBodyType,
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SendOTPBodyType
} from '~/types/auth.type'
import type { EmptyBodyType } from '~/types/reques.type'
import type { SuccessResponse } from '~/types/success.type'

const authApi = {
  login: (body: LoginBodyType) => http.post<SuccessResponse<LoginResType>>('/auth/login', body),
  register: (body: RegisterBodyType) => http.post<SuccessResponse<RegisterResType>>('/auth/register', body),
  logout: (body: EmptyBodyType) => http.post<SuccessResponse<boolean>>('/auth/logout', body),
  sendOTP: (body: SendOTPBodyType) => http.post<SuccessResponse<boolean>>('/auth/otp', body),
  forgotPassword: (body: ForgotPasswordBodyType) => http.post<SuccessResponse<boolean>>('/auth/forgot-password', body)
}

export default authApi
