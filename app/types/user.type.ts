import z from 'zod'
import { OrderBy, SortBy } from '~/constants/other.constant'
import { UserStatus } from '~/constants/user.constant'
import { PermissionSchema } from '~/types/permission.type'
import { RoleSchema } from '~/types/role.type'

export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
  roleId: z.number().int().positive(),
  status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED]).default(UserStatus.ACTIVE).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable()
})

export const GetUserProfileResSchema = UserSchema.omit({
  password: true
}).extend({
  role: RoleSchema.pick({
    id: true,
    name: true
  }).extend({
    permissions: z.array(
      PermissionSchema.pick({
        id: true,
        name: true,
        module: true,
        path: true,
        method: true
      })
    )
  })
})

export const UpdateProfileResSchema = UserSchema.omit({
  password: true
})

export const GetUsersResSchema = z.object({
  users: z.array(
    UserSchema.omit({
      password: true
    }).extend({
      role: RoleSchema.pick({
        id: true,
        name: true
      })
    })
  ),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
})

export const GetUsersQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().default(10).optional(),
    search: z.string().optional(),
    status: z.preprocess(
      (value) => {
        if (typeof value === 'string') {
          const lowered = value.trim().toLowerCase()
          if (lowered === UserStatus.ACTIVE.toLowerCase()) return UserStatus.ACTIVE
          if (lowered === UserStatus.BLOCKED.toLowerCase()) return UserStatus.BLOCKED
          return undefined
        }
        return undefined
      },
      z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED]).optional()
    ),
    roleId: z.preprocess((value) => {
      if (typeof value === 'string') {
        const number = Number(value.trim())
        if (isNaN(number) || number <= 0) return undefined
        return number
      }
      return undefined
    }, z.coerce.number().int().positive().optional()),
    orderBy: z.enum([OrderBy.Asc, OrderBy.Desc]).default(OrderBy.Desc).optional(),
    sortBy: z.enum([SortBy.FullName, SortBy.Email, SortBy.CreatedAt]).default(SortBy.CreatedAt).optional(),
    getAll: z
      .preprocess((value: any) => {
        if (typeof value === 'string') {
          return value.toLowerCase().trim() === 'true'
        }
        return false
      }, z.boolean())
      .optional()
  })
  .strict()

export const GetUserParamsSchema = z
  .object({
    userId: z.coerce.number().int().positive()
  })
  .strict()

export const CreateUserBodySchema = UserSchema.pick({
  email: true,
  fullName: true,
  password: true,
  roleId: true,
  status: true
}).strict()

export const UpdateUserBodySchema = CreateUserBodySchema.extend({
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    })
})

export type GetUsersResType = z.infer<typeof GetUsersResSchema>
export type GetUsersQueryType = z.infer<typeof GetUsersQuerySchema>
export type CreateUserBodyType = z.infer<typeof CreateUserBodySchema>
export type UpdateUserBodyType = z.infer<typeof UpdateUserBodySchema>
export type GetUserParamsType = z.infer<typeof GetUserParamsSchema>

export type UserType = z.infer<typeof UserSchema>
export type GetUserProfileResType = z.infer<typeof GetUserProfileResSchema>
export type UpdateProfileResType = z.infer<typeof UpdateProfileResSchema>
