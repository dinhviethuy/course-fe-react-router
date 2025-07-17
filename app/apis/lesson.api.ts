import http from '~/lib/http'
import type { GetLessonDetailResType, GetLessonParamsType } from '~/types/lesson.type'
import type { SuccessResponse } from '~/types/success.type'

const lessonApi = {
  getLessonDetail: (param: GetLessonParamsType) =>
    http.get<SuccessResponse<GetLessonDetailResType>>(`/lessons/${param.lessonId}`)
}

export default lessonApi
