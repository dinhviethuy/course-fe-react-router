import { useMutation, useQuery } from '@tanstack/react-query'
import permissionApi from '~/apis/permisson.api'
import type {
  CreatePermissionBodyType,
  GetPermissionParamsType,
  GetPermissionsQueryType,
  UpdatePermissionBodyType
} from '~/types/permission.type'

export const useGetListPermissionQuery = (query?: GetPermissionsQueryType) => {
  return useQuery({
    queryKey: ['permissions', query],
    queryFn: () => permissionApi.list(query)
  })
}

export const useGetModulesQuery = () => {
  return useQuery({
    queryKey: ['modules'],
    queryFn: () => permissionApi.modules()
  })
}

export const useGetPermissionDetailQuery = (param: GetPermissionParamsType) => {
  return useQuery({
    queryKey: ['permission', param],
    queryFn: () => permissionApi.detail(param)
  })
}

export const useCreatePermissionMutation = () => {
  return useMutation({
    mutationFn: (body: CreatePermissionBodyType) => permissionApi.create(body)
  })
}

export const useUpdatePermissionMutation = () => {
  return useMutation({
    mutationFn: ({ param, body }: { param: GetPermissionParamsType; body: UpdatePermissionBodyType }) =>
      permissionApi.update(param, body)
  })
}

export const useDeletePermissionMutation = () => {
  return useMutation({
    mutationFn: (param: GetPermissionParamsType) => permissionApi.delete(param)
  })
}
