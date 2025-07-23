import http from '~/lib/http'
import type {
  CanAccessCourseBodyType,
  CreateCourseBodyType,
  CreateCourseResType,
  GetCourseDetailResType,
  GetCourseDetailResTypeForAdmin,
  GetCourseParamsIdType,
  GetCourseParamsSlugType,
  GetCoursesQueryType,
  GetManageCoursesQueryType,
  ListCoursesResType,
  ReorderChaptersAndLessonsBodyType,
  UpdateCourseBodyType,
  UpdateCourseResType,
  ValidateSlugBodyType
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
  },
  listCourseAdmin: (query?: GetManageCoursesQueryType) => {
    const { page, limit, orderBy, sortBy, maxPrice, minPrice, search, createdById, isDraft } = query || {}
    const params = new URLSearchParams()
    if (page) params.append('page', page.toString())
    if (limit) params.append('limit', limit.toString())
    if (orderBy) params.append('orderBy', orderBy.toString())
    if (sortBy) params.append('sortBy', sortBy.toString())
    if (maxPrice) params.append('maxPrice', maxPrice.toString())
    if (minPrice) params.append('minPrice', minPrice.toString())
    if (search) params.append('search', search)
    if (createdById) params.append('createdById', createdById.toString())
    if (isDraft) params.append('isDraft', isDraft.toString())
    return http.get<SuccessResponse<ListCoursesResType>>(`/manage-courses?${params.toString()}`)
  },
  getCourseDetailForAdmin: (params: GetCourseParamsIdType) =>
    http.get<SuccessResponse<GetCourseDetailResTypeForAdmin>>(`/manage-courses/${params.courseId}`),
  createCourse: (body: CreateCourseBodyType) => http.post<SuccessResponse<CreateCourseResType>>('manage-courses', body),
  updateCourse: (params: GetCourseParamsIdType, body: UpdateCourseBodyType) =>
    http.put<SuccessResponse<UpdateCourseResType>>(`/manage-courses/${params.courseId}`, body),
  deleteCourse: (params: GetCourseParamsIdType) =>
    http.delete<SuccessResponse<boolean>>(`/manage-courses/${params.courseId}`),
  reorderChaptersAndLessons: (param: GetCourseParamsIdType, body: ReorderChaptersAndLessonsBodyType) =>
    http.patch<SuccessResponse<boolean>>(`/manage-courses/${param.courseId}/reorder-full`, body),
  validateSlug: (body: ValidateSlugBodyType) =>
    http.post<SuccessResponse<boolean>>('manage-courses/validate-slug', body)
}

export default courseApi
