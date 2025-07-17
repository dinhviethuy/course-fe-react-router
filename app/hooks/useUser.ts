import { useMutation, useQuery } from "@tanstack/react-query";
import userApi from "~/apis/user.api";
import type { UpdateProfileBodyType } from "~/types/profile.type";

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => userApi.getProfile(),
  })
}

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (body: UpdateProfileBodyType) => userApi.updateProfile(body),
  })
}