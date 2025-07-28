import http from '~/lib/http'
import type {
  CreateRoleBodyType,
  CreateRoleResType,
  GetRoleDetailResType,
  GetRoleParamsType,
  GetRolesQueryType,
  GetRolesResType,
  UpdateRoleBodyType
} from '~/types/role.type'
import type { SuccessResponse } from '~/types/success.type'

const roleApi = {
  listRole: (query: GetRolesQueryType) => {
    const searchParams = new URLSearchParams()
    if (query.search) searchParams.set('search', query.search)
    if (query.sortBy) searchParams.set('sortBy', query.sortBy)
    if (query.orderBy) searchParams.set('orderBy', query.orderBy)
    if (query.page) searchParams.set('page', query.page.toString())
    if (query.limit) searchParams.set('limit', query.limit.toString())
    if (query.getAll) searchParams.set('getAll', query.getAll.toString())
    if (query.isActive) searchParams.set('isActive', query.isActive.toString())
    return http.get<SuccessResponse<GetRolesResType>>(`/roles?${searchParams.toString()}`)
  },
  detail: (param: GetRoleParamsType) => http.get<SuccessResponse<GetRoleDetailResType>>(`/roles/${param.roleId}`),
  create: (body: CreateRoleBodyType) => http.post<SuccessResponse<CreateRoleResType>>('/roles', body),
  update: (param: GetRoleParamsType, body: UpdateRoleBodyType) =>
    http.put<SuccessResponse<GetRoleDetailResType>>(`/roles/${param.roleId}`, body),
  delete: (param: GetRoleParamsType) => http.delete<SuccessResponse<boolean>>(`/roles/${param.roleId}`)
}

export default roleApi
