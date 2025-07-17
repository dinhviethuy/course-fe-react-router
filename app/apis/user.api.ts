import http from '~/lib/http'
import type {
  ChangePasswordBodyType,
  GetProfileResType,
  UpdateProfileBodyType,
  UpdateProfileResType
} from '~/types/profile.type'
import type { SuccessResponse } from '~/types/success.type'

const userApi = {
  getProfile: () => http.get<SuccessResponse<GetProfileResType>>('/profile'),
  updateProfile: (body: UpdateProfileBodyType) => http.put<SuccessResponse<UpdateProfileResType>>('/profile', body),
  changePassword: (body: ChangePasswordBodyType) => http.put<SuccessResponse<boolean>>('/profile/change-password', body)
}

export default userApi
