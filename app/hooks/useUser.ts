import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '~/apis/user.api'
import type { ChangePasswordBodyType, UpdateProfileBodyType } from '~/types/profile.type'

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
