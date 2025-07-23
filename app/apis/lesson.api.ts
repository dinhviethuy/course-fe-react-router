import http from '~/lib/http'
import type {
  CreateLessonBodyType,
  CreateLessonResType,
  GetLessonDetailResType,
  GetLessonParamsType,
  UpdateLessonBodyType,
  UpdateLessonResType
} from '~/types/lesson.type'
import type { SuccessResponse } from '~/types/success.type'

const lessonApi = {
  getLessonDetail: (param: GetLessonParamsType) =>
    http.get<SuccessResponse<GetLessonDetailResType>>(`/lessons/${param.lessonId}`),

  getLessonDetailAdmin: (param: GetLessonParamsType) =>
    http.get<SuccessResponse<GetLessonDetailResType>>(`/manage-lessons/${param.lessonId}`),

  createLesson: (body: CreateLessonBodyType) =>
    http.post<SuccessResponse<CreateLessonResType>>(`/manage-lessons`, body),

  updateLesson: (param: GetLessonParamsType, body: UpdateLessonBodyType) =>
    http.put<SuccessResponse<UpdateLessonResType>>(`/manage-lessons/${param.lessonId}`, body),

  deleteLesson: (param: GetLessonParamsType) =>
    http.delete<SuccessResponse<boolean>>(`/manage-lessons/${param.lessonId}`)
}

export default lessonApi
