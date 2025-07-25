import http from '~/lib/http'
import type {
  ChangePasswordBodyType,
  GetProfileResType,
  UpdateProfileBodyType,
  UpdateProfileResType
} from '~/types/profile.type'
import type { SuccessResponse } from '~/types/success.type'
import type {
  CreateUserBodyType,
  GetUserParamsType,
  GetUserProfileResType,
  GetUsersQueryType,
  GetUsersResType,
  UpdateUserBodyType
} from '~/types/user.type'

const userApi = {
  getProfile: () => http.get<SuccessResponse<GetProfileResType>>('/profile'),
  updateProfile: (body: UpdateProfileBodyType) => http.put<SuccessResponse<UpdateProfileResType>>('/profile', body),
  changePassword: (body: ChangePasswordBodyType) =>
    http.put<SuccessResponse<boolean>>('/profile/change-password', body),
  listUser: (query: GetUsersQueryType) => {
    const queryString = new URLSearchParams()
    if (query.page) queryString.set('page', query.page.toString())
    if (query.limit) queryString.set('limit', query.limit.toString())
    if (query.sortBy) queryString.set('sortBy', query.sortBy)
    if (query.orderBy) queryString.set('orderBy', query.orderBy)
    if (query.search) queryString.set('search', query.search)
    if (query.roleId) queryString.set('roleId', query.roleId.toString())
    if (query.status) queryString.set('status', query.status.toString())
    if (query.getAll) queryString.set('getAll', query.getAll.toString())
    return http.get<SuccessResponse<GetUsersResType>>(`/users?${queryString.toString()}`)
  },
  getUserDetail: (params: GetUserParamsType) =>
    http.get<SuccessResponse<GetUserProfileResType>>(`/users/${params.userId}`),
  createUser: (body: CreateUserBodyType) => http.post<SuccessResponse<UpdateProfileResType>>('/users', body),
  udpateUser: (param: GetUserParamsType, body: UpdateUserBodyType) =>
    http.put<SuccessResponse<UpdateProfileResType>>(`/users/${param.userId}`, body),
  deleteUser: (param: GetUserParamsType) => http.delete<SuccessResponse<boolean>>(`/users/${param.userId}`)
}

export default userApi
