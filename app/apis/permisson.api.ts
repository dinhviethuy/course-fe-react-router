import http from '~/lib/http'
import type {
  CreatePermissionBodyType,
  GetModulesResType,
  GetPermissionDetailResType,
  GetPermissionParamsType,
  GetPermissionsQueryType,
  GetPermissionsResType,
  UpdatePermissionBodyType
} from '~/types/permission.type'
import type { SuccessResponse } from '~/types/success.type'

const permissionApi = {
  list: (query?: GetPermissionsQueryType) => {
    const searchParams = new URLSearchParams()
    if (query?.getAll) searchParams.set('getAll', query.getAll.toString())
    if (query?.limit) searchParams.set('limit', query.limit.toString())
    if (query?.page) searchParams.set('page', query.page.toString())
    if (query?.method) searchParams.set('method', query.method.toString())
    if (query?.module) searchParams.set('module', query.module.toString())
    if (query?.path) searchParams.set('path', query.path.toString())
    if (query?.name) searchParams.set('name', query.name.toString())
    if (query?.sortBy) searchParams.set('sortBy', query.sortBy)
    if (query?.orderBy) searchParams.set('orderBy', query.orderBy)
    return http.get<SuccessResponse<GetPermissionsResType>>(`/permissions?${searchParams.toString()}`)
  },
  modules: () => {
    return http.get<SuccessResponse<GetModulesResType>>(`/permissions/modules`)
  },
  detail: (param: GetPermissionParamsType) =>
    http.get<SuccessResponse<GetPermissionDetailResType>>(`/permissions/${param.permissionId}`),
  create: (body: CreatePermissionBodyType) =>
    http.post<SuccessResponse<GetPermissionDetailResType>>('/permissions', body),
  update: (param: GetPermissionParamsType, body: UpdatePermissionBodyType) =>
    http.put<SuccessResponse<GetPermissionDetailResType>>(`/permissions/${param.permissionId}`, body),
  delete: (param: GetPermissionParamsType) =>
    http.delete<SuccessResponse<boolean>>(`/permissions/${param.permissionId}`)
}

export default permissionApi
