import { z } from 'zod'
import { OrderBy, SortBy } from '~/constants/other.constant'
import { HTTPMethod } from '~/constants/role.constant'

export const PermissionSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(500),
  path: z.string().min(1).max(1000),
  module: z.string().min(1).max(500),
  method: z.enum([
    HTTPMethod.GET,
    HTTPMethod.POST,
    HTTPMethod.PUT,
    HTTPMethod.DELETE,
    HTTPMethod.PATCH,
    HTTPMethod.OPTIONS,
    HTTPMethod.HEAD
  ]),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const GetPermissionsResSchema = z.object({
  permissions: z.array(PermissionSchema),
  totalItems: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
})

export const GetPermissionsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().default(10).optional(),
    getAll: z
      .preprocess((value: any) => {
        if (typeof value === 'string') {
          return value.toLowerCase() === 'true'
        }
        return false
      }, z.boolean())
      .optional(),
    module: z.string().optional(),
    method: z
      .enum([
        HTTPMethod.GET,
        HTTPMethod.POST,
        HTTPMethod.PUT,
        HTTPMethod.DELETE,
        HTTPMethod.PATCH,
        HTTPMethod.OPTIONS,
        HTTPMethod.HEAD
      ])
      .optional(),
    path: z.string().optional(),
    name: z.string().optional(),
    orderBy: z.enum([OrderBy.Asc, OrderBy.Desc]).default(OrderBy.Desc).optional(),
    sortBy: z.enum([SortBy.CreatedAt, SortBy.Name]).default(SortBy.CreatedAt).optional()
  })
  .strict()

export const GetPermissionParamsSchema = z
  .object({
    permissionId: z.coerce.number()
  })
  .strict()

export const CreatePermissionBodySchema = PermissionSchema.pick({
  name: true,
  path: true,
  method: true,
  module: true
}).strict()

export const GetModulesResSchema = z.object({
  modules: z.array(
    z.object({
      module: z.string()
    })
  )
})

export const UpdatePermissionBodySchema = CreatePermissionBodySchema
export const GetPermissionDetailResSchema = PermissionSchema
export type PermissionType = z.infer<typeof PermissionSchema>
export type GetPermissionsResType = z.infer<typeof GetPermissionsResSchema>
export type GetPermissionsQueryType = z.infer<typeof GetPermissionsQuerySchema>
export type GetPermissionParamsType = z.infer<typeof GetPermissionParamsSchema>
export type CreatePermissionBodyType = z.infer<typeof CreatePermissionBodySchema>
export type UpdatePermissionBodyType = z.infer<typeof UpdatePermissionBodySchema>
export type GetPermissionDetailResType = z.infer<typeof GetPermissionDetailResSchema>
export type GetModulesResType = z.infer<typeof GetModulesResSchema>
export type PermissionsStoreType = {
  [key: string]: {
    [key: string]: {
      method: string
      path: string
      module: string
    }
  }
}
