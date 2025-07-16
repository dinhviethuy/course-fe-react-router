import { z } from 'zod'
import { OrderBy, SortBy } from '~/constants/other.constant'
import { PermissionSchema } from '~/types/permission.type'

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string().max(500),
  description: z.string().default(''),
  isActive: z.boolean().default(true),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const RolePermissionsSchema = RoleSchema.extend({
  permissions: z.array(PermissionSchema)
})

export const RoleWithPermissionsSchema = RoleSchema.extend({
  permissions: z.array(PermissionSchema)
})

export const GetRolesResSchema = z.object({
  roles: z.array(RoleSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
})

export const GetRolesQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    getAll: z.preprocess((value: any) => {
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true'
      }
      return false
    }, z.boolean()).optional(),
    isActive: z.preprocess((value) => {
      if (typeof value === 'string') {
        const lowered = value.trim().toLowerCase()
        if (lowered === 'true') return true
        if (lowered === 'false') return false
        return undefined
      }
      if (typeof value === 'boolean') return value
      return undefined
    }, z.boolean().optional()),
    orderBy: z.enum([OrderBy.Asc, OrderBy.Desc]).default(OrderBy.Desc),
    sortBy: z.enum([SortBy.CreatedAt, SortBy.Name]).default(SortBy.CreatedAt),
    search: z.string().optional()
  })
  .strict()

export const GetRoleParamsSchema = z
  .object({
    roleId: z.coerce.number()
  })
  .strict()

export const CreateRoleBodySchema = RoleSchema.pick({
  name: true,
  description: true,
  isActive: true
}).strict()

export const CreateRoleResSchema = RoleSchema

export const UpdateRoleBodySchema = RoleSchema.pick({
  name: true,
  description: true,
  isActive: true
})
  .extend({
    permissionIds: z.array(z.number())
  })
  .strict()

export const GetRoleDetailResSchema = RoleWithPermissionsSchema

export type RoleWithPermissionsType = z.infer<typeof RoleWithPermissionsSchema>
export type GetRolesResType = z.infer<typeof GetRolesResSchema>
export type GetRolesQueryType = z.infer<typeof GetRolesQuerySchema>
export type GetRoleParamsType = z.infer<typeof GetRoleParamsSchema>
export type CreateRoleBodyType = z.infer<typeof CreateRoleBodySchema>
export type CreateRoleResType = z.infer<typeof CreateRoleResSchema>
export type UpdateRoleBodyType = z.infer<typeof UpdateRoleBodySchema>
export type GetRoleDetailResType = z.infer<typeof GetRoleDetailResSchema>

export type RoleType = z.infer<typeof RoleSchema>
export type RolePermissionsType = z.infer<typeof RolePermissionsSchema>
