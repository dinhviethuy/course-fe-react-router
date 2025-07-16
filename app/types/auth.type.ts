
import { z } from 'zod'
import { OTPType } from '~/constants/auth.constant'
import { PermissionSchema } from '~/types/permission.type'
import { RoleSchema } from '~/types/role.type'
import { UserSchema } from '~/types/user.type'

export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true
}).strict()

export const LoginResSchema = UserSchema.pick({
  id: true,
  email: true,
  fullName: true,
  status: true,
  roleId: true
}).extend({
  role: RoleSchema.pick({
    id: true,
    name: true
  }).extend({
    permissions: z.array(
      PermissionSchema.pick({
        id: true,
        name: true,
        method: true,
        path: true,
        module: true
      })
    )
  })
})

export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
  fullName: true
})
  .extend({
    otp: z.string().min(6).max(6),
    confirmPassword: z.string().min(6)
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu và mật khẩu xác nhận không khớp  ',
    path: ['confirmPassword']
  })

export const RegisterResSchema = LoginResSchema

export const SessionTokenResSchema = LoginResSchema

export const SendOTPBodySchema = z.object({
  email: z.string().email(),
  type: z.enum([OTPType.REGISTER, OTPType.FORGOT_PASSWORD])
})

export const ForgotPasswordBodySchema = z
  .object({
    email: z.string().email(),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
    otp: z.string().min(6).max(6)
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Mật khẩu mới và mật khẩu mới xác nhận không khớp',
    path: ['confirmNewPassword']
  })

export type LoginBodyType = z.infer<typeof LoginBodySchema>
export type LoginResType = z.infer<typeof LoginResSchema>
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
export type RegisterResType = z.infer<typeof RegisterResSchema>
export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordBodySchema>
export type SessionTokenResType = z.infer<typeof SessionTokenResSchema>
