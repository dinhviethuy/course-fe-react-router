import http from '~/lib/http'
import type { GetPermissionsQueryType, GetPermissionsResType } from '~/types/permission.type'
import type { SuccessResponse } from '~/types/success.type'

const permissionApi = {
  list: (query?: GetPermissionsQueryType) => {
    const searchParams = new URLSearchParams()
    if (query?.getAll) searchParams.set('getAll', query.getAll.toString())
    if (query?.limit) searchParams.set('limit', query.limit.toString())
    if (query?.page) searchParams.set('page', query.page.toString())
    return http.get<SuccessResponse<GetPermissionsResType>>(`/permissions?${searchParams.toString()}`)
  }
}

export default permissionApi
