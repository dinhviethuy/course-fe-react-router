import http from '~/lib/http'
import type {
  CanAccessCourseBodyType,
  GetCourseDetailResType,
  GetCourseParamsIdType,
  GetCourseParamsSlugType,
  GetCoursesQueryType,
  ListCoursesResType
} from '~/types/course.type'
import type { SuccessResponse } from '~/types/success.type'

const courseApi = {
  canAccessCourse: (body: CanAccessCourseBodyType) => http.post(`/courses`, body),
  getCourseDetailBySlug: (param: GetCourseParamsSlugType) =>
    http.get<SuccessResponse<GetCourseDetailResType>>(`/courses/slugs/${param.slug}`),
  getCourseDetailById: (param: GetCourseParamsIdType) =>
    http.get<SuccessResponse<GetCourseDetailResType>>(`/courses/${param.courseId}`),
  listCourse: (query?: GetCoursesQueryType, isBought?: boolean) => {
    const { page, limit, orderBy, sortBy, maxPrice, minPrice, search } = query || {}
    const params = new URLSearchParams()
    if (page) params.append('page', page.toString())
    if (limit) params.append('limit', limit.toString())
    if (orderBy) params.append('orderBy', orderBy)
    if (sortBy) params.append('sortBy', sortBy)
    if (maxPrice) params.append('maxPrice', maxPrice.toString())
    if (minPrice) params.append('minPrice', minPrice.toString())
    if (search) params.append('search', search)
    if (isBought) return http.get<SuccessResponse<ListCoursesResType>>(`/courses/bought?${params.toString()}`)
    return http.get<SuccessResponse<ListCoursesResType>>(`/courses?${params.toString()}`)
  }
}

export default courseApi
