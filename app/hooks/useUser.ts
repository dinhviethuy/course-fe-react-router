import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'
import type { ChangePasswordBodyType, UpdateProfileBodyType } from '~/types/profile.type'
import type { CreateUserBodyType, GetUserParamsType, GetUsersQueryType, UpdateUserBodyType } from '~/types/user.type'

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile(),
    staleTime: 0
  })
}

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (body: UpdateProfileBodyType) => userApi.updateProfile(body)
  })
}

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (body: ChangePasswordBodyType) => userApi.changePassword(body)
  })
}

export const useListUserQuery = (query: GetUsersQueryType) => {
  return useQuery({
    queryKey: ['list-user', query],
    queryFn: () => userApi.listUser(query)
  })
}

export const useUserDetailQuery = (params: GetUserParamsType) => {
  return useQuery({
    queryKey: ['user-detail', params.userId],
    queryFn: () => userApi.getUserDetail(params)
  })
}

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (body: CreateUserBodyType) => userApi.createUser(body)
  })
}

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: ({ params, body }: { params: GetUserParamsType; body: UpdateUserBodyType }) =>
      userApi.udpateUser(params, body)
  })
}

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: (params: GetUserParamsType) => userApi.deleteUser(params)
  })
}
