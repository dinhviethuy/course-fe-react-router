import http from "~/lib/http";
import type { GetProfileResType, UpdateProfileBodyType, UpdateProfileResType } from "~/types/profile.type";
import type { SuccessResponse } from "~/types/success.type";

const userApi = {
  getProfile: () => http.get<SuccessResponse<GetProfileResType>>("/profile"),
  updateProfile: (body: UpdateProfileBodyType) => http.put<SuccessResponse<UpdateProfileResType>>("/profile", body),
}

export default userApi;