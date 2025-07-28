import { useQuery } from '@tanstack/react-query'
import permissionApi from '~/apis/permisson.api'
import type { GetPermissionsQueryType } from '~/types/permission.type'

export const useGetListPermissionQuery = (query?: GetPermissionsQueryType) => {
  return useQuery({
    queryKey: ['permissions', query],
    queryFn: () => permissionApi.list(query)
  })
}
