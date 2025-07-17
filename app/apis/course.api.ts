import http from '~/lib/http'
import type {
  CanAccessCourseBodyType,
  GetCourseDetailResType,
  GetCourseParamsIdType,
  GetCourseParamsSlugType
} from '~/types/course.type'
import type { SuccessResponse } from '~/types/success.type'

const courseApi = {
  canAccessCourse: (body: CanAccessCourseBodyType) => http.post(`/courses`, body),
  getCourseDetailBySlug: (param: GetCourseParamsSlugType) =>
    http.get<SuccessResponse<GetCourseDetailResType>>(`/courses/slugs/${param.slug}`),
  getCourseDetailById: (param: GetCourseParamsIdType) =>
    http.get<SuccessResponse<GetCourseDetailResType>>(`/courses/${param.courseId}`)
}

export default courseApi
