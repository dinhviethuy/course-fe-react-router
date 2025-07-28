import { useMutation, useQuery } from '@tanstack/react-query'
import roleApi from '~/apis/role.api'
import type { CreateRoleBodyType, GetRoleParamsType, GetRolesQueryType, UpdateRoleBodyType } from '~/types/role.type'

export const useListRoleQuery = (query: GetRolesQueryType) => {
  return useQuery({
    queryKey: ['roles', query],
    queryFn: () => roleApi.listRole(query)
  })
}

export const useGetRoleDetailQuery = (params: GetRoleParamsType) => {
  return useQuery({
    queryKey: ['role', params],
    queryFn: () => roleApi.detail(params)
  })
}

export const useCreateRoleMutation = () => {
  return useMutation({
    mutationFn: (body: CreateRoleBodyType) => roleApi.create(body)
  })
}

export const useUpdateRoleMutation = () => {
  return useMutation({
    mutationFn: ({ params, body }: { params: GetRoleParamsType; body: UpdateRoleBodyType }) =>
      roleApi.update(params, body)
  })
}

export const useDeleteRoleMutation = () => {
  return useMutation({
    mutationFn: (params: GetRoleParamsType) => roleApi.delete(params)
  })
}
