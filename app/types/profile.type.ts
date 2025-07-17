import z from 'zod'
import { PermissionSchema } from '~/types/permission.type'
import { RoleSchema } from '~/types/role.type'
import { UserSchema } from '~/types/user.type'

export const GetProfileResSchema = UserSchema.pick({
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

export const UpdateProfileBodySchema = UserSchema.pick({
  fullName: true
}).strict()

export const UpdateProfileResSchema = GetProfileResSchema

export const ChangePasswordBodySchema = z
  .object({
    password: z.string().min(6, { message: 'Mật khẩu cũ phải có ít nhất 6 ký tự' }),
    newPassword: z.string().min(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' }),
    confirmNewPassword: z.string().min(6, { message: 'Mật khẩu xác nhận phải có ít nhất 6 ký tự' })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Mật khẩu mới và mật khẩu xác nhận không khớp',
    path: ['confirmNewPassword']
  })
  .refine((data) => data.password !== data.newPassword, {
    message: 'Mật khẩu mới và mật khẩu cũ không được giống nhau',
    path: ['newPassword']
  })

export type GetProfileResType = z.infer<typeof GetProfileResSchema>
export type UpdateProfileBodyType = z.infer<typeof UpdateProfileBodySchema>
export type UpdateProfileResType = z.infer<typeof UpdateProfileResSchema>
export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBodySchema>
