import { useMutation, useQuery } from '@tanstack/react-query'
import courseApi from '~/apis/course.api'
import type {
  CanAccessCourseBodyType,
  CreateCourseBodyType,
  GetCourseParamsIdType,
  GetCourseParamsSlugType,
  GetCoursesQueryType,
  GetManageCoursesQueryType,
  ReorderChaptersAndLessonsBodyType,
  UpdateCourseBodyType,
  ValidateSlugBodyType
} from '~/types/course.type'

export const useCanAccessCourseMutation = () => {
  return useMutation({
    mutationFn: (body: CanAccessCourseBodyType) => courseApi.canAccessCourse(body)
  })
}

export const useGetCourseDetailBySlugQuery = (param: GetCourseParamsSlugType) => {
  return useQuery({
    queryKey: ['course-detail', param.slug],
    queryFn: () => courseApi.getCourseDetailBySlug(param)
  })
}

export const useGetCourseDetailByIdQuery = (param: GetCourseParamsIdType) => {
  return useQuery({
    queryKey: ['course-detail', param.courseId],
    queryFn: () => courseApi.getCourseDetailById(param)
  })
}

export const useListCourseQuery = (query?: GetCoursesQueryType, enabled = true) => {
  return useQuery({
    queryKey: ['list-course', query],
    queryFn: () => courseApi.listCourse(query),
    enabled: enabled
  })
}

export const useBoughtCoursesQuery = (query?: GetCoursesQueryType, enabled = true) => {
  return useQuery({
    queryKey: ['bought-courses', query],
    queryFn: () => courseApi.listCourse(query, true),
    enabled: enabled
  })
}

export const useListCourseAdminQuery = (query?: GetManageCoursesQueryType) => {
  return useQuery({
    queryKey: ['list-course-admin', query],
    queryFn: () => courseApi.listCourseAdmin(query)
  })
}

export const useCourseDetailForAdminQuery = (param: GetCourseParamsIdType) => {
  return useQuery({
    queryKey: ['course-detail-admin', param.courseId],
    queryFn: () => courseApi.getCourseDetailForAdmin(param)
  })
}

export const useCreateCourseMutation = () => {
  return useMutation({
    mutationFn: (body: CreateCourseBodyType) => courseApi.createCourse(body)
  })
}

export const useUpdateCourseMutaion = () => {
  return useMutation({
    mutationFn: ({ params, body }: { params: GetCourseParamsIdType; body: UpdateCourseBodyType }) =>
      courseApi.updateCourse(params, body)
  })
}

export const useDeleteCourseMutation = () => {
  return useMutation({
    mutationFn: (params: GetCourseParamsIdType) => courseApi.deleteCourse(params)
  })
}

export const useReorderChaptersAndLessonsMutation = () => {
  return useMutation({
    mutationFn: ({ params, body }: { params: GetCourseParamsIdType; body: ReorderChaptersAndLessonsBodyType }) =>
      courseApi.reorderChaptersAndLessons(params, body)
  })
}

export const useValidateSlugMutation = () => {
  return useMutation({
    mutationFn: (body: ValidateSlugBodyType) => courseApi.validateSlug(body)
  })
}
