import { useMutation } from "@tanstack/react-query";
import authApi from "~/apis/auth.api";
import type { ForgotPasswordBodyType, LoginBodyType, RegisterBodyType, SendOTPBodyType } from "~/types/auth.type";
import type { EmptyBodyType } from "~/types/reques.type";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: LoginBodyType) => authApi.login(body),
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (body: RegisterBodyType) => authApi.register(body),
  })
}

export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: (body: SendOTPBodyType) => authApi.sendOTP(body),
  })
}

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (body: ForgotPasswordBodyType) => authApi.forgotPassword(body),
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: (body: EmptyBodyType) => authApi.logout(body),
  })
}