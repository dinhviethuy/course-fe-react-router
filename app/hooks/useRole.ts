import { useQuery } from '@tanstack/react-query'
import roleApi from '~/apis/role.api'
import type { GetRolesQueryType } from '~/types/role.type'

export const useListRoleQuery = (query: GetRolesQueryType) => {
  return useQuery({
    queryKey: ['roles', query],
    queryFn: () => roleApi.listRole(query)
  })
}
