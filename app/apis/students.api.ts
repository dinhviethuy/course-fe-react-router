import http from '~/lib/http'
import type {
  CreateCourseEnrollmentBodyType,
  CreateCourseEnrollmentResType,
  GetCourseEnrollmentDetailResType,
  GetCourseEnrollmentListResType,
  GetCourseEnrollmentParamsType,
  GetCourseEnrollmentQueryType,
  UpdateCourseEnrollmentBodyType,
  UpdateCourseEnrollmentResType
} from '~/types/student.type'
import type { SuccessResponse } from '~/types/success.type'

const studentApi = {
  createStudent: (body: CreateCourseEnrollmentBodyType) =>
    http.post<SuccessResponse<CreateCourseEnrollmentResType>>('/students', body),
  detailStudent: (params: GetCourseEnrollmentParamsType) =>
    http.get<SuccessResponse<GetCourseEnrollmentDetailResType>>(`/students/${params.courseEnrollmentId}`),
  updateStudent: (params: GetCourseEnrollmentParamsType, body: UpdateCourseEnrollmentBodyType) =>
    http.put<SuccessResponse<UpdateCourseEnrollmentResType>>(`/students/${params.courseEnrollmentId}`, body),
  deleteStudent: (params: GetCourseEnrollmentParamsType) =>
    http.delete<SuccessResponse<boolean>>(`/students/${params.courseEnrollmentId}`),
  listStudent: (query?: GetCourseEnrollmentQueryType) => {
    const params = new URLSearchParams()
    if (query?.page) params.append('page', query.page.toString())
    if (query?.limit) params.append('limit', query.limit.toString())
    if (query?.fullName) params.append('fullName', query.fullName)
    if (query?.email) params.append('email', query.email)
    if (query?.orderBy) params.append('orderBy', query.orderBy)
    if (query?.sortBy) params.append('sortBy', query.sortBy)
    if (query?.status) params.append('status', query.status)
    if (query?.courseId) params.append('courseId', query.courseId.toString())
    if (query?.titleCourse) params.append('titleCourse', query.titleCourse)
    if (query?.userId) params.append('userId', query.userId.toString())
    if (query?.getAll) params.append('getAll', query.getAll.toString())

    return http.get<SuccessResponse<GetCourseEnrollmentListResType>>(`/students?${params.toString()}`)
  }
}

export default studentApi
